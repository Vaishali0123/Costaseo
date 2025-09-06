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
export async function getpostdetails(postid) {
  // Validate input
  if (!postid || (typeof postid !== "number" && typeof postid !== "string")) {
    console.error("Invalid postid provided:", postid);
    return null;
  }

  const numericPostId =
    typeof postid === "string" ? parseInt(postid, 10) : postid;
  if (isNaN(numericPostId) || numericPostId <= 0) {
    console.error("Invalid numeric postid:", postid);
    return null;
  }

  try {
    console.log(`🔍 Fetching post details for ID: ${numericPostId}`);

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const res = await fetch(
      `https://admin.costaricaninsurance.com/wp-json/wp/v2/posts/${numericPostId}`,
      {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          "Cache-Control": "public, max-age=300", // 5 minutes cache
        },
      }
    );

    clearTimeout(timeoutId);

    // Handle different HTTP status codes
    if (!res.ok) {
      if (res.status === 404) {
        console.error(`❌ Post not found: ${numericPostId}`);
        return null;
      }
      if (res.status === 403) {
        console.error(`🚫 Access forbidden for post: ${numericPostId}`);
        return null;
      }
      if (res.status >= 500) {
        console.error(
          `💥 Server error (${res.status}) for post: ${numericPostId}`
        );
        return null;
      }
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const post = await res.json();

    // Validate the response structure
    if (!post || typeof post !== "object") {
      console.error("❌ Invalid post data structure received");
      return null;
    }

    // Log what we received for debugging
    console.log(`✅ Post ${numericPostId} data:`, {
      id: post.id,
      title: post.title?.rendered ? "Present" : "Missing",
      titleValue: post.title?.rendered || "N/A",
      excerpt: post.excerpt?.rendered ? "Present" : "Missing",
      content: post.content?.rendered ? "Present" : "Missing",
      slug: post.slug || "Missing",
      status: post.status,
      date: post.date,
      modified: post.modified,
    });

    // Additional validation for required fields
    if (!post.title?.rendered) {
      console.warn(`⚠️ Post ${numericPostId} has no title`);
    }

    if (!post.content?.rendered && !post.excerpt?.rendered) {
      console.warn(`⚠️ Post ${numericPostId} has no content or excerpt`);
    }

    return post;
  } catch (error) {
    if (error.name === "AbortError") {
      console.error(`⏰ Request timeout for post ${numericPostId}`);
    } else if (error.name === "TypeError" && error.message.includes("fetch")) {
      console.error(
        `🌐 Network error fetching post ${numericPostId}:`,
        error.message
      );
    } else {
      console.error(`💥 Error fetching post ${numericPostId}:`, error.message);
    }
    return null;
  }
}

// Optional: Add a function to fetch multiple posts or with additional parameters
export async function getpostdetailsWithParams(postid, params = {}) {
  if (!postid) return null;

  const numericPostId =
    typeof postid === "string" ? parseInt(postid, 10) : postid;
  if (isNaN(numericPostId)) return null;

  const queryParams = new URLSearchParams({
    _embed: "true", // This will include featured media and other related data
    ...params,
  });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(
      `https://admin.costaricaninsurance.com/wp-json/wp/v2/posts/${numericPostId}?${queryParams}`,
      {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error(`❌ Failed to fetch post with params: ${res.status}`);
      return null;
    }

    const post = await res.json();

    // With _embed=true, you'll get featured media details
    if (post._embedded?.["wp:featuredmedia"]?.[0]) {
      post.featured_media_details = post._embedded["wp:featuredmedia"][0];
      console.log(`🖼️ Featured media found for post ${numericPostId}:`, {
        id: post.featured_media_details.id,
        source_url: post.featured_media_details.source_url,
        alt_text: post.featured_media_details.alt_text,
      });
    }

    return post;
  } catch (error) {
    console.error(
      `💥 Error fetching post ${numericPostId} with params:`,
      error.message
    );
    return null;
  }
}

// Helper function to get featured image URL
export function getFeaturedImageUrl(post, size = "large") {
  if (!post) return null;

  // If we have embedded media details
  if (post.featured_media_details) {
    return (
      post.featured_media_details.media_details?.sizes?.[size]?.source_url ||
      post.featured_media_details.source_url
    );
  }

  // Fallback: construct URL based on media ID (you might need to adjust this)
  if (post.featured_media && post.featured_media > 0) {
    // This is a placeholder - you'd need to either:
    // 1. Make a separate API call to get media details
    // 2. Use the _embed parameter to get media details
    // 3. Have a known pattern for your image URLs
    return null; // Return null for now, indicating we need media details
  }

  return null;
}
