// import { getpostdetails } from "../../../lib/text";
// import BlogClient from "../BlogClient";

// function decodePostId(postId) {
//   if (!postId) {
//     return null;
//   }

//   if (typeof postId === "number") return postId;

//   try {
//     // Decode base64 → "post:143"
//     const decoded = atob(postId);
//     const parts = decoded.split(":");
//     const numeric = Number(parts.pop());
//     if (isNaN(numeric)) throw new Error("Decoded value is not a number");
//     return numeric;
//   } catch (err) {
//     return null;
//   }
// }
// function stripHtml(html) {
//   return html?.replace(/<[^>]*>?/gm, "") || "";
// }
// export async function generateMetadata({ params }) {
//   const numericPostId = decodeURIComponent(params.postid);
//   const postid = decodePostId(numericPostId);

//   const post = await getpostdetails(postid);
//   if (!post) {
//     return {
//       title: "Costa Rican Insurance",
//       description: "Read the latest blog from Costa Rican Insurance.",
//     };
//   }
//   console.log(post, "post");
//   const title = post?.title?.rendered || "Costa Rican Insurance";
//   const description =
//     stripHtml(post?.excerpt?.rendered)?.slice(0, 160) ||
//     "Read the latest blog from Costa Rican Insurance.";
//   const url = `https://costaseo.vercel.app/blog/${post?.title?.rendered}/${postid}`;
//   const image =
//     post?.yoast_head_json?.og_image?.[0]?.url ||
//     post?.featured_media?.source_url ||
//     "";
//   return {
//     title: post?.title?.rendered || "Costa Rican Insurance",
//     description:
//       stripHtml(post?.excerpt?.rendered)?.slice(0, 160) ||
//       "Read the latest blog from Costa Rican Insurance.",
//     openGraph: {
//       title: post?.title?.rendered || "Costa Rican Insurance",
//       description:
//         stripHtml(post?.excerpt?.rendered)?.slice(0, 160) ||
//         "Read the latest blog from Costa Rican Insurance.",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: post?.title,
//       description:
//         stripHtml(post?.excerpt?.rendered)?.slice(0, 160) ||
//         "Read the latest blog from Costa Rican Insurance.",
//     },
//   };
// }

// export default async function Page({ params }) {
//   return <BlogClient postid={params.postid}></BlogClient>;
// }
import { getpostdetails } from "../../../lib/text";
import BlogClient from "../BlogClient";

function decodePostId(postId) {
  if (!postId) return null;
  if (typeof postId === "number") return postId;

  try {
    const decoded = atob(postId); // base64 → "post:143"
    const parts = decoded.split(":");
    const numeric = Number(parts.pop());
    if (isNaN(numeric)) throw new Error("Decoded value is not a number");
    return numeric;
  } catch (err) {
    return null;
  }
}

function stripHtml(html) {
  return html?.replace(/<[^>]*>?/gm, "") || "";
}

export async function generateMetadata({ params }) {
  const numericPostId = decodeURIComponent(params.postid);
  const postid = decodePostId(numericPostId);

  const post = await getpostdetails(postid);
  if (!post) {
    return {
      title: "Costa Rican Insurance",
      description: "Read the latest blog from Costa Rican Insurance.",
      alternates: { canonical: "https://costaseo.vercel.app" },
    };
  }

  const title = post?.title?.rendered || "Costa Rican Insurance";
  const description =
    stripHtml(post?.excerpt?.rendered)?.slice(0, 160) ||
    "Read the latest blog from Costa Rican Insurance.";
  const url = `https://costaseo.vercel.app/blog/${post?.title?.rendered
    ?.toLowerCase()
    ?.replace(/[^a-z0-9\s-]/g, "")
    ?.trim()
    ?.replace(/\s+/g, "-")}/${params.postid}`;
  const image =
    post?.yoast_head_json?.og_image?.[0]?.url ||
    post?.featured_media?.source_url ||
    "";

  return {
    // ✅ ensures browser tab shows correct title
    title,
    description,

    // Canonical link
    alternates: { canonical: url },

    // OpenGraph
    openGraph: {
      title,
      description,
      url,
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: title }]
        : [],
      type: "article",
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },

    // Schema (JSON-LD)
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        image,
        datePublished: post.date,
        dateModified: post.modified,
        author: {
          "@type": "Organization",
          name: "Costa Rican Insurance",
          url: "https://costaricaninsurance.com",
        },
        publisher: {
          "@type": "Organization",
          name: "Costa Rican Insurance",
          logo: {
            "@type": "ImageObject",
            url: "https://costaricaninsurance.com/logo.png",
          },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      }),
    },
  };
}

export default async function Page({ params }) {
  return <BlogClient postid={params.postid} />;
}
