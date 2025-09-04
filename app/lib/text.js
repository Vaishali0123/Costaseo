import axios from "axios";

export async function translateText(text, targetLang) {
  if (!text || targetLang === "en") return text;
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLang }),
    });
    const data = await res.json();
    return data.translatedText || text;
  } catch (err) {
    console.error("Translation error:", err);
    return text;
  }
}

// export async function getpostdetails(postid) {
//   try {
//     const res = await fetch(
//       `https://admin.costaricaninsurance.com/wp-json/wp/v2/posts/${postid}`
//     );
//     if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
//     return await res.json();
//     // return response.data; // { id, title, content, excerpt, author, date, ... }
//   } catch (error) {
//     console.error(
//       "Error fetching post:",
//       error.response?.data || error.message
//     );
//     return null;
//   }
// }
// lib/text.js
export async function getpostdetails(postid) {
  try {
    console.log("Fetching post details for ID:", postid);

    if (!postid) {
      console.log("No postid provided");
      return null;
    }

    const url = `https://admin.costaricaninsurance.com/wp-json/wp/v2/posts/${postid}`;
    console.log("Fetching from URL:", url);

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      if (res.status === 404) {
        console.log("Post not found (404)");
        return null;
      }
      throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
    }

    const post = await res.json();
    console.log("Post fetched successfully:", post.title?.rendered);

    // Validate post structure
    if (!post.title || !post.title.rendered) {
      console.log("Warning: Post missing title");
    }

    return post;
  } catch (error) {
    console.error("Error fetching post details:", {
      postid,
      error: error.message,
      stack: error.stack,
    });
    return null;
  }
}
