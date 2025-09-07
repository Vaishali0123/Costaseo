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
import { getpostdetails } from "../../../lib/text";
import BlogClient from "../BlogClient";

function decodePostId(postId) {
  if (!postId) return null;
  if (/^\d+$/.test(postId)) {
    return Number(postId);
  }
  // if (typeof postId === "number") return postId;

  try {
    const decoded = atob(postId); // base64 → "post:143"
    const parts = decoded.split(":");
    const numeric = Number(parts.pop());
    return isNaN(numeric) ? null : numeric;
  } catch {
    return null;
  }
}

function stripHtml(html) {
  return html?.replace(/<[^>]*>?/gm, "") || "";
}

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
let postID = "";
export async function generateMetadata(props) {
  const params = await props.params;
  console.log(params, "params");
  const { blog } = params;
  const blogTitle = decodeURIComponent(blog.replace(/-/g, " "));
  console.log(blogTitle, "blogTitle");
  const numericPostId = decodeURIComponent(params.postid);
  const postid = decodePostId(numericPostId);

  postID = postid;
  // Default metadata for when post is not found
  const defaultMetadata = {
    title: { absolute: blogTitle || "Costa Rican Insurance - Blog" },
    description:
      "Read the latest blog posts from Costa Rican Insurance about insurance solutions in Costa Rica.",
    alternates: { canonical: "https://costaseo.vercel.app" },
    robots: {
      index: true,
      follow: true,
    },
  };

  const post = await getpostdetails(postid);
  if (!post) {
    return defaultMetadata;
  }
  // Extract data based on actual post structure
  const title = blogTitle;
  const description =
    stripHtml(post || "")
      .replace(/\[&hellip;\]/g, "...")
      .slice(0, 160) ||
    "Read the latest blog from Costa Rican Insurance about insurance solutions in Costa Rica.";

  const url = `https://costaseo.vercel.app/blog/${title.replace(/\s+/g, "-")}/${
    params.postid
  }`;

  const defaultImage = "https://costaseo.vercel.app/default-blog-image.jpg";

  // You might need to fetch the actual media details separately
  // const featuredImage = featuredMediaId ? `https://costaricaninsurance.com/wp-content/uploads/...` : defaultImage;
  const featuredImage = defaultImage; // Update this when you have image URL logic

  return {
    //  FIXED: Proper title structure for Next.js
    title: {
      absolute: blogTitle, // This ensures the exact title is used without template
    },
    description,

    // Essential meta tags
    keywords:
      `${blogTitle}, Costa Rica, insurance, blog, mortgage, property`.slice(
        0,
        255
      ),
    authors: [{ name: "Costa Rican Insurance" }],

    // Canonical link
    alternates: { canonical: url },

    // OpenGraph meta tags
    openGraph: {
      title,
      description,
      url,
      siteName: "Costa Rican Insurance",
      locale: "en_US",
      type: "article",
      // publishedTime: post.date,
      // modifiedTime: post.modified,
      authors: ["Costa Rican Insurance"],
      section: "Insurance",
      // tags: post?.tags?.map((tag) => tag.name) || ["insurance", "Costa Rica"],
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@costaricanins",
      site: "@costaricanins",
      images: [featuredImage],
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
    // other: {
    //   "article:published_time": post.date,
    //   "article:modified_time": post.modified,
    //   "article:author": "Costa Rican Insurance",
    //   "article:section": "Insurance",
    //   "og:updated_time": post.modified, // This helps with content freshness
    // },
  };
}

export default async function Page({ params }) {
  // const numericPostId = decodeURIComponent(params.postid);
  // const postid = decodePostId(numericPostId);
  // const post = await getpostdetails(postID);

  // // Generate structured data for this specific post
  // const generateStructuredData = () => {
  //   if (!post) return null;

  //   const title = stripHtml(post.title?.rendered || "");
  //   const description = stripHtml(post.excerpt?.rendered || "")
  //     .replace(/\[&hellip;\]/g, "...")
  //     .slice(0, 160);
  //   const slug = post?.slug || createSlug(title);
  //   const url = `https://costaseo.vercel.app/blog/${slug}/${params.postid}`;
  //   const defaultImage = "https://costaseo.vercel.app/default-blog-image.jpg";

  //   // Get word count from content
  //   const contentText = stripHtml(post?.content?.rendered || "");
  //   const wordCount = contentText
  //     .split(/\s+/)
  //     .filter((word) => word.length > 0).length;

  //   return {
  //     "@context": "https://schema.org",
  //     "@type": "BlogPosting",
  //     "@id": url,
  //     headline: title,
  //     description,
  //     image: {
  //       "@type": "ImageObject",
  //       url: defaultImage,
  //       width: 1200,
  //       height: 630,
  //     },
  //     datePublished: post.date,
  //     dateModified: post.modified,
  //     author: {
  //       "@type": "Organization",
  //       name: "Costa Rican Insurance",
  //       url: "https://costaricaninsurance.com",
  //       logo: {
  //         "@type": "ImageObject",
  //         url: "https://costaricaninsurance.com/logo.png",
  //         width: 200,
  //         height: 60,
  //       },
  //     },
  //     publisher: {
  //       "@type": "Organization",
  //       name: "Costa Rican Insurance",
  //       url: "https://costaricaninsurance.com",
  //       logo: {
  //         "@type": "ImageObject",
  //         url: "https://costaricaninsurance.com/logo.png",
  //         width: 200,
  //         height: 60,
  //       },
  //     },
  //     mainEntityOfPage: {
  //       "@type": "WebPage",
  //       "@id": url,
  //     },
  //     articleSection: "Insurance",
  //     keywords: "insurance, Costa Rica, mortgage, property, qualify",
  //     wordCount: wordCount,
  //     articleBody:
  //       contentText.slice(0, 500) + (contentText.length > 500 ? "..." : ""),
  //     inLanguage: "en-US",
  //     isAccessibleForFree: true,
  //   };
  // };

  // const structuredData = generateStructuredData();

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      {/* {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )} */}

      {/* Main Content */}
      <BlogClient postid={params.postid} />
    </>
  );
}
// import BlogClient from "../BlogClient";

// // --- Utilities ---
// import LZString from "lz-string";

// function decodeBlogData(code) {
//   try {
//     const str = LZString.decompressFromEncodedURIComponent(code);
//     return JSON.parse(str);
//   } catch {
//     return null;
//   }
// }

// function stripHtml(html) {
//   return html ? html.replace(/<[^>]*>?/gm, "").trim() : "";
// }

// function createSlug(title) {
//   return title
//     ? title
//         .toLowerCase()
//         .replace(/[^a-z0-9\s-]/g, "")
//         .trim()
//         .replace(/\s+/g, "-")
//     : "";
// }

// // --- Generate Metadata (Server-only) ---
// export async function generateMetadata({ params }) {
//   console.log(params, "params");
//   const { code } = params;

//   console.log(code, "code");
//   const decoded = decodeBlogData(code);
//   console.log(decoded, "decoded");
//   const data = decoded || {};
//   const defaultTitle = "Costa Rican Insurance - Blog";
//   const defaultDescription =
//     "Read the latest blog posts from Costa Rican Insurance about insurance solutions in Costa Rica.";

//   const title = data?.t || defaultTitle;
//   const description = data?.d || defaultDescription;

//   const url = `https://costaseo.vercel.app/blog/${code}`;

//   return {
//     title: { absolute: title },
//     description,
//     alternates: { canonical: url },
//     openGraph: {
//       title,
//       description,
//       url,
//       siteName: "Costa Rican Insurance",
//       type: "article",
//       locale: "en_US",
//       images: [
//         {
//           url: "https://costaseo.vercel.app/default-blog-image.jpg",
//           width: 1200,
//           height: 630,
//           alt: title,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: ["https://costaseo.vercel.app/default-blog-image.jpg"],
//     },
//     robots: { index: true, follow: true },
//   };
// }

// // --- Page Component ---
// export default async function Page({ params }) {
//   const slug = params.blog; // slug is encoded JSON
//   const data = decodeBlogData(slug);

//   const postid = data?.p || null;
//   let post = null;

//   // try {
//   //   if (postid) post = await getpostdetails(postid);
//   // } catch (error) {
//   //   console.error("Error loading post:", error);
//   // }

//   // --- Structured Data ---
//   const generateStructuredData = () => {
//     if (!post) return null;

//     const title = stripHtml(post.title?.rendered || "");
//     const description = stripHtml(post.excerpt?.rendered || "")
//       .replace(/\[&hellip;\]/g, "...")
//       .slice(0, 160);
//     const url = `https://costaseo.vercel.app/blog/${slug}`;
//     const defaultImage = "https://costaseo.vercel.app/default-blog-image.jpg";

//     const contentText = stripHtml(post?.content?.rendered || "");
//     const wordCount = contentText.split(/\s+/).filter(Boolean).length;

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
//       mainEntityOfPage: { "@type": "WebPage", "@id": url },
//       articleSection: "Insurance",
//       keywords: "insurance, Costa Rica, mortgage, property, qualify",
//       wordCount,
//       articleBody:
//         contentText.slice(0, 500) + (contentText.length > 500 ? "..." : ""),
//       inLanguage: "en-US",
//       isAccessibleForFree: true,
//     };
//   };

//   const structuredData = generateStructuredData();

//   return (
//     <>
//       {structuredData && (
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//         />
//       )}

//       <BlogClient postid={postid} />
//     </>
//   );
// }
