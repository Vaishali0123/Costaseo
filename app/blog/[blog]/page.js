// import { getpostdetails, getFeaturedImageUrl } from "../../../lib/text";
// import BlogClient from "../BlogClient";

// // Utilities
// function decodeBlogData(slug) {
//   try {
//     const json = atob(slug.replace(/-/g, "+").replace(/_/g, "/"));
//     return JSON.parse(json);
//   } catch (e) {
//     console.error("❌ Failed to decode blog data:", e);
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

// function decodeBlogData(code) {
//   try {
//     return JSON.parse(atob(code));
//   } catch {
//     return null;
//   }
// }

// // Generate Metadata using code param
// export async function generateMetadata({ params }) {
//   const code = params.code; // Encrypted code
//   const data = decodeBlogData(code);

//   const defaultTitle = "Costa Rican Insurance - Blog";
//   const defaultDescription =
//     "Read the latest blog posts from Costa Rican Insurance about insurance solutions in Costa Rica.";

//   const title = data?.t || defaultTitle;
//   const description = data?.d || defaultDescription;
//   const postid = data?.p || "0";

//   const slugFromUrl = createSlug(title);
//   const url = `https://costaseo.vercel.app/blog/${title.replace(
//     /\s+/g,
//     "-"
//   )}/${code}`;

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

// // Page component
// export default async function Page({ params }) {
//   const slug = params.postid; // The URL slug containing encoded blog data
//   const data = decodeBlogData(slug);
//   console.log(data, "data");
//   const postid = data?.p ? decodePostId(data.p) : null;

//   let post = null;
//   try {
//     if (postid) post = await getpostdetails(postid);
//   } catch (error) {
//     console.error("Error loading post:", error);
//   }

//   const generateStructuredData = () => {
//     if (!post) return null;

//     const title = stripHtml(post.title?.rendered || "");
//     const description = stripHtml(post.excerpt?.rendered || "")
//       .replace(/\[&hellip;\]/g, "...")
//       .slice(0, 160);
//     const slug = post?.slug || createSlug(title);
//     const url = `https://costaseo.vercel.app/blog/${slug}/${code}`;
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

//       <BlogClient postid={data?.p} />
//     </>
//   );
// }
import { getpostdetails } from "../../lib/text";
import BlogClient from "./BlogClient";

// --- Utilities ---
function decodeBlogData(slug) {
  try {
    const json = atob(slug.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch (e) {
    console.error("❌ Failed to decode blog data:", e);
    return null;
  }
}

function stripHtml(html) {
  return html ? html.replace(/<[^>]*>?/gm, "").trim() : "";
}

function createSlug(title) {
  return title
    ? title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
    : "";
}

// --- Generate Metadata (Server-only) ---
export async function generateMetadata({ params }) {
  const slug = params.blog; // encoded data in URL
  const data = decodeBlogData(slug);
  console.log(data, "data");
  const defaultTitle = "Costa Rican Insurance - Blog";
  const defaultDescription =
    "Read the latest blog posts from Costa Rican Insurance about insurance solutions in Costa Rica.";

  const title = data?.t || defaultTitle;
  const description = data?.d || defaultDescription;

  const url = `https://costaseo.vercel.app/blog/${slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Costa Rican Insurance",
      type: "article",
      locale: "en_US",
      images: [
        {
          url: "https://costaseo.vercel.app/default-blog-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://costaseo.vercel.app/default-blog-image.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

// --- Page Component ---
export default async function Page({ params }) {
  const slug = params.blog; // slug is encoded JSON
  const data = decodeBlogData(slug);

  const postid = data?.p || null;
  let post = null;

  try {
    if (postid) post = await getpostdetails(postid);
  } catch (error) {
    console.error("Error loading post:", error);
  }

  // --- Structured Data ---
  const generateStructuredData = () => {
    if (!post) return null;

    const title = stripHtml(post.title?.rendered || "");
    const description = stripHtml(post.excerpt?.rendered || "")
      .replace(/\[&hellip;\]/g, "...")
      .slice(0, 160);
    const url = `https://costaseo.vercel.app/blog/${slug}`;
    const defaultImage = "https://costaseo.vercel.app/default-blog-image.jpg";

    const contentText = stripHtml(post?.content?.rendered || "");
    const wordCount = contentText.split(/\s+/).filter(Boolean).length;

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
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      articleSection: "Insurance",
      keywords: "insurance, Costa Rica, mortgage, property, qualify",
      wordCount,
      articleBody:
        contentText.slice(0, 500) + (contentText.length > 500 ? "..." : ""),
      inLanguage: "en-US",
      isAccessibleForFree: true,
    };
  };

  const structuredData = generateStructuredData();

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      <BlogClient postid={postid} />
    </>
  );
}
