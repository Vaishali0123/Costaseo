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
// import { getpostdetails } from "../../../lib/text";
// import BlogClient from "../BlogClient";

// function decodePostId(postId) {
//   if (!postId) return null;
//   if (typeof postId === "number") return postId;

//   try {
//     const decoded = atob(postId); // base64 → "post:143"
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
//       alternates: { canonical: "https://costaseo.vercel.app" },
//     };
//   }

//   const title = post?.title?.rendered || "Costa Rican Insurance";
//   const description =
//     stripHtml(post?.excerpt?.rendered)?.slice(0, 160) ||
//     "Read the latest blog from Costa Rican Insurance.";
//   const url = `https://costaseo.vercel.app/blog/${post?.title?.rendered
//     ?.toLowerCase()
//     ?.replace(/[^a-z0-9\s-]/g, "")
//     ?.trim()
//     ?.replace(/\s+/g, "-")}/${params.postid}`;
//   const image =
//     post?.yoast_head_json?.og_image?.[0]?.url ||
//     post?.featured_media?.source_url ||
//     "";

//   return {
//     // ✅ ensures browser tab shows correct title
//     title,
//     description,

//     // Canonical link
//     alternates: { canonical: url },

//     // OpenGraph
//     openGraph: {
//       title,
//       description,
//       url,
//       images: image
//         ? [{ url: image, width: 1200, height: 630, alt: title }]
//         : [],
//       type: "article",
//     },

//     // Twitter
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: image ? [image] : [],
//     },

//     // Schema (JSON-LD)
//     other: {
//       "application/ld+json": JSON.stringify({
//         "@context": "https://schema.org",
//         "@type": "BlogPosting",
//         headline: title,
//         description,
//         image,
//         datePublished: post.date,
//         dateModified: post.modified,
//         author: {
//           "@type": "Organization",
//           name: "Costa Rican Insurance",
//           url: "https://costaricaninsurance.com",
//         },
//         publisher: {
//           "@type": "Organization",
//           name: "Costa Rican Insurance",
//           logo: {
//             "@type": "ImageObject",
//             url: "https://costaricaninsurance.com/logo.png",
//           },
//         },
//         mainEntityOfPage: { "@type": "WebPage", "@id": url },
//       }),
//     },
//   };
// }

// export default async function Page({ params }) {
//   return <BlogClient postid={params.postid} />;
// }
// import { getpostdetails } from "../../../lib/text";
// import BlogClient from "../BlogClient";

// function decodePostId(postId) {
//   if (!postId) return null;
//   if (/^\d+$/.test(postId)) {
//     return Number(postId);
//   }
//   // if (typeof postId === "number") return postId;

//   try {
//     const decoded = atob(postId); // base64 → "post:143"
//     const parts = decoded.split(":");
//     const numeric = Number(parts.pop());
//     return isNaN(numeric) ? null : numeric;
//   } catch {
//     return null;
//   }
// }

// function stripHtml(html) {
//   return html?.replace(/<[^>]*>?/gm, "") || "";
// }

// function createSlug(title) {
//   return title
//     .toLowerCase()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .trim()
//     .replace(/\s+/g, "-");
// }

// export async function generateMetadata(props) {
//   const params = await props.params;
//   const numericPostId = decodeURIComponent(params.postid);
//   const postid = decodePostId(numericPostId);

//   // Default metadata for when post is not found
//   const defaultMetadata = {
//     title: "Costa Rican Insurance - Blog",
//     description:
//       "Read the latest blog posts from Costa Rican Insurance about insurance solutions in Costa Rica.",
//     alternates: { canonical: "https://costaseo.vercel.app" },
//     robots: {
//       index: true,
//       follow: true,
//     },
//   };

//   const post = await getpostdetails(postid);
//   if (!post) {
//     return defaultMetadata;
//   }

//   // Extract data based on actual post structure
//   const rawTitle = post?.title?.rendered || "Costa Rican Insurance - Blog";
//   const title = stripHtml(rawTitle);
//   const description =
//     stripHtml(post?.excerpt?.rendered || "")
//       .replace(/\[&hellip;\]/g, "...")
//       .slice(0, 160) ||
//     "Read the latest blog from Costa Rican Insurance about insurance solutions in Costa Rica.";

//   // Use the existing slug from WordPress or create one
//   const slug = post?.slug || createSlug(title);
//   const url = `https://costaseo.vercel.app/blog/${post?.title?.rendered.replace(
//     /\s+/g,
//     "-"
//   )}/${params.postid}`;

//   // Handle featured media - it's just an ID, you might need to fetch the actual image
//   // For now, we'll use a default or construct the image URL if you have a pattern
//   const featuredMediaId = post?.featured_media;
//   const defaultImage = "https://costaseo.vercel.app/default-blog-image.jpg";

//   // You might need to fetch the actual media details separately
//   // const featuredImage = featuredMediaId ? `https://costaricaninsurance.com/wp-content/uploads/...` : defaultImage;
//   const featuredImage = defaultImage; // Update this when you have image URL logic

//   return {
//     //  FIXED: Proper title structure for Next.js
//     title: {
//       absolute: title, // This ensures the exact title is used without template
//     },
//     description,

//     // Essential meta tags
//     keywords: `${title}, Costa Rica, insurance, blog, mortgage, property`.slice(
//       0,
//       255
//     ),
//     authors: [{ name: "Costa Rican Insurance" }],

//     // Canonical link
//     alternates: { canonical: url },

//     // OpenGraph meta tags
//     openGraph: {
//       title,
//       description,
//       url,
//       siteName: "Costa Rican Insurance",
//       locale: "en_US",
//       type: "article",
//       publishedTime: post.date,
//       modifiedTime: post.modified,
//       authors: ["Costa Rican Insurance"],
//       section: "Insurance",
//       tags: post?.tags?.map((tag) => tag.name) || ["insurance", "Costa Rica"],
//       images: [
//         {
//           url: featuredImage,
//           width: 1200,
//           height: 630,
//           alt: title,
//           type: "image/jpeg",
//         },
//       ],
//     },

//     // Twitter Card
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       creator: "@costaricanins",
//       site: "@costaricanins",
//       images: [featuredImage],
//     },

//     // Robots meta
//     robots: {
//       index: true,
//       follow: true,
//       googleBot: {
//         index: true,
//         follow: true,
//         "max-video-preview": -1,
//         "max-image-preview": "large",
//         "max-snippet": -1,
//       },
//     },

//     // Additional meta tags
//     other: {
//       "article:published_time": post.date,
//       "article:modified_time": post.modified,
//       "article:author": "Costa Rican Insurance",
//       "article:section": "Insurance",
//       "og:updated_time": post.modified, // This helps with content freshness
//     },
//   };
// }

// export default async function Page({ params }) {
//   const numericPostId = decodeURIComponent(params.postid);
//   const postid = decodePostId(numericPostId);
//   const post = await getpostdetails(postid);

//   // Generate structured data for this specific post
//   const generateStructuredData = () => {
//     if (!post) return null;

//     const title = stripHtml(post.title?.rendered || "");
//     const description = stripHtml(post.excerpt?.rendered || "")
//       .replace(/\[&hellip;\]/g, "...")
//       .slice(0, 160);
//     const slug = post?.slug || createSlug(title);
//     const url = `https://costaseo.vercel.app/blog/${slug}/${params.postid}`;
//     const defaultImage = "https://costaseo.vercel.app/default-blog-image.jpg";

//     // Get word count from content
//     const contentText = stripHtml(post?.content?.rendered || "");
//     const wordCount = contentText
//       .split(/\s+/)
//       .filter((word) => word.length > 0).length;

//     return {
//       "@context": "https://schema.org",
//       "@type": "BlogPosting",
//       "@id": url,
//       headline: title,
//       description,
//       image: {
//         "@type": "ImageObject",
//         url: defaultImage,
//         width: 1200,
//         height: 630,
//       },
//       datePublished: post.date,
//       dateModified: post.modified,
//       author: {
//         "@type": "Organization",
//         name: "Costa Rican Insurance",
//         url: "https://costaricaninsurance.com",
//         logo: {
//           "@type": "ImageObject",
//           url: "https://costaricaninsurance.com/logo.png",
//           width: 200,
//           height: 60,
//         },
//       },
//       publisher: {
//         "@type": "Organization",
//         name: "Costa Rican Insurance",
//         url: "https://costaricaninsurance.com",
//         logo: {
//           "@type": "ImageObject",
//           url: "https://costaricaninsurance.com/logo.png",
//           width: 200,
//           height: 60,
//         },
//       },
//       mainEntityOfPage: {
//         "@type": "WebPage",
//         "@id": url,
//       },
//       articleSection: "Insurance",
//       keywords: "insurance, Costa Rica, mortgage, property, qualify",
//       wordCount: wordCount,
//       articleBody:
//         contentText.slice(0, 500) + (contentText.length > 500 ? "..." : ""),
//       inLanguage: "en-US",
//       isAccessibleForFree: true,
//     };
//   };

//   const structuredData = generateStructuredData();

//   return (
//     <>
//       {/* Structured Data (JSON-LD) */}
//       {structuredData && (
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify(structuredData),
//           }}
//         />
//       )}

//       {/* Main Content */}
//       <BlogClient postid={params.postid} />
//     </>
//   );
// }
import {
  getpostdetails,
  getpostdetailsWithParams,
  getFeaturedImageUrl,
} from "../../../lib/text";
import BlogClient from "../BlogClient";

function decodePostId(postId) {
  console.log("🔍 Decoding postId:", postId);

  if (!postId) {
    console.log("❌ No postId provided");
    return null;
  }

  if (/^\d+$/.test(postId)) {
    const numericId = Number(postId);
    console.log("✅ Direct numeric ID:", numericId);
    return numericId;
  }

  try {
    const decoded = atob(postId);
    console.log("🔓 Base64 decoded:", decoded);

    const parts = decoded.split(":");
    console.log("📝 Split parts:", parts);

    const numeric = Number(parts.pop());
    const result = isNaN(numeric) ? null : numeric;
    console.log("🎯 Final numeric ID:", result);

    return result;
  } catch (error) {
    console.error("❌ Base64 decode error:", error);
    return null;
  }
}

function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
}

function createSlug(title) {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function generateMetadata(props) {
  console.log("🚀 generateMetadata started");

  const params = await props.params; // Await params properly
  console.log("📋 Route params:", params);

  const numericPostId = decodeURIComponent(params.postid);
  console.log("🔗 Decoded URL postid:", numericPostId);

  const postid = decodePostId(numericPostId);
  console.log("🆔 Final post ID:", postid);

  // Default metadata for when post is not found
  const defaultMetadata = {
    title: "Costa Rican Insurance - Blog",
    description:
      "Read the latest blog posts from Costa Rican Insurance about insurance solutions in Costa Rica.",
    alternates: { canonical: "https://costaseo.vercel.app" },
    robots: { index: true, follow: true },
  };

  if (!postid) {
    console.error("💥 Invalid post ID, using default metadata");
    return defaultMetadata;
  }

  try {
    console.log("📡 Fetching post data...");

    // Try with embedded data first for better featured images
    let post = await getpostdetailsWithParams(postid, { _embed: true });

    // Fallback to basic fetch if embedded fails
    if (!post) {
      console.log("🔄 Fallback to basic post fetch");
      post = await getpostdetails(postid);
    }

    if (!post) {
      console.error("📭 No post data received, using default metadata");
      return defaultMetadata;
    }

    console.log("🔬 Post data structure analysis:", {
      id: post.id,
      titleRendered: post.title?.rendered,
      excerptRendered: post.excerpt?.rendered ? "Present" : "Missing",
      slug: post.slug,
      status: post.status,
    });

    // Extract title with validation
    const rawTitle = post.title?.rendered;
    if (!rawTitle) {
      console.error("❌ No title found in post data, using default");
      return defaultMetadata;
    }

    const cleanTitle = stripHtml(rawTitle).trim();
    if (!cleanTitle) {
      console.error("❌ Title is empty after cleaning, using default");
      return defaultMetadata;
    }

    console.log("🏷️ Final clean title:", cleanTitle);

    // Extract description with multiple fallback strategies
    let description = "";

    if (post.excerpt?.rendered) {
      description = stripHtml(post.excerpt.rendered)
        .replace(/\[&hellip;\]/g, "...")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 160);
      console.log("📝 Description from excerpt");
    } else if (post.content?.rendered) {
      description = stripHtml(post.content.rendered)
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 160);
      console.log("📝 Description from content");
    }

    // Final fallback for description
    if (!description || description.length < 10) {
      description = `Learn about ${cleanTitle.toLowerCase()} - comprehensive insurance information from Costa Rican Insurance.`;
      console.log("📝 Using generated description");
    }

    console.log("📄 Final description:", description);

    // Use the existing slug from WordPress or create one
    const slug = post.slug || createSlug(cleanTitle);

    // Build canonical URL using the slug from the URL path if available
    const urlParts = params.postid.includes("/")
      ? params.postid.split("/")
      : [];
    const slugFromUrl = urlParts.length > 0 ? urlParts[0] : slug;
    const url = `https://costaseo.vercel.app/blog/${slugFromUrl}/${numericPostId}`;

    console.log("🔗 Generated canonical URL:", url);

    // Handle featured media with improved logic
    const featuredImageUrl =
      getFeaturedImageUrl(post) ||
      "https://costaseo.vercel.app/default-blog-image.jpg";

    const metadata = {
      title: {
        absolute: cleanTitle, // This ensures the exact title is used without template
      },
      description,

      // Essential meta tags
      keywords:
        `${cleanTitle}, Costa Rica, insurance, blog, mortgage, property`.slice(
          0,
          255
        ),
      authors: [{ name: "Costa Rican Insurance" }],

      // Canonical link
      alternates: { canonical: url },

      // OpenGraph meta tags
      openGraph: {
        title: cleanTitle,
        description,
        url,
        siteName: "Costa Rican Insurance",
        locale: "en_US",
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.modified,
        authors: ["Costa Rican Insurance"],
        section: "Insurance",
        tags: post?.tags?.map((tag) => tag.name) || ["insurance", "Costa Rica"],
        images: [
          {
            url: featuredImageUrl,
            width: 1200,
            height: 630,
            alt: cleanTitle,
            type: "image/jpeg",
          },
        ],
      },

      // Twitter Card
      twitter: {
        card: "summary_large_image",
        title: cleanTitle,
        description,
        creator: "@costaricanins",
        site: "@costaricanins",
        images: [featuredImageUrl],
      },

      // Robots meta
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },

      // Additional meta tags
      other: {
        "article:published_time": post.date,
        "article:modified_time": post.modified,
        "article:author": "Costa Rican Insurance",
        "article:section": "Insurance",
        "og:updated_time": post.modified,
      },
    };

    console.log("✅ Generated metadata successfully:", {
      title: metadata.title.absolute,
      descriptionLength: metadata.description.length,
      canonicalUrl: metadata.alternates.canonical,
    });

    return metadata;
  } catch (error) {
    console.error("💥 Error in generateMetadata:", error);
    return defaultMetadata;
  }
}

export default async function Page(props) {
  console.log("🎬 Page component started");

  const params = await props.params; // Await params properly
  const numericPostId = decodeURIComponent(params.postid);
  const postid = decodePostId(numericPostId);

  let post = null;

  try {
    post = await getpostdetails(postid);
  } catch (error) {
    console.error("💥 Error loading post in Page component:", error);
  }

  // Generate structured data for this specific post
  const generateStructuredData = () => {
    if (!post) return null;

    const title = stripHtml(post.title?.rendered || "");
    const description = stripHtml(post.excerpt?.rendered || "")
      .replace(/\[&hellip;\]/g, "...")
      .slice(0, 160);

    const slug = post?.slug || createSlug(title);
    const url = `https://costaseo.vercel.app/blog/${slug}/${params.postid}`;
    const defaultImage = "https://costaseo.vercel.app/default-blog-image.jpg";

    // Get word count from content
    const contentText = stripHtml(post?.content?.rendered || "");
    const wordCount = contentText
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": url,
      headline: title,
      description,
      image: {
        "@type": "ImageObject",
        url: defaultImage,
        width: 1200,
        height: 630,
      },
      datePublished: post.date,
      dateModified: post.modified,
      author: {
        "@type": "Organization",
        name: "Costa Rican Insurance",
        url: "https://costaricaninsurance.com",
        logo: {
          "@type": "ImageObject",
          url: "https://costaricaninsurance.com/logo.png",
          width: 200,
          height: 60,
        },
      },
      publisher: {
        "@type": "Organization",
        name: "Costa Rican Insurance",
        url: "https://costaricaninsurance.com",
        logo: {
          "@type": "ImageObject",
          url: "https://costaricaninsurance.com/logo.png",
          width: 200,
          height: 60,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
      articleSection: "Insurance",
      keywords: "insurance, Costa Rica, mortgage, property, qualify",
      wordCount: wordCount,
      articleBody:
        contentText.slice(0, 500) + (contentText.length > 500 ? "..." : ""),
      inLanguage: "en-US",
      isAccessibleForFree: true,
    };
  };

  const structuredData = generateStructuredData();

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* Main Content */}
      <BlogClient postid={params.postid} />
    </>
  );
}
