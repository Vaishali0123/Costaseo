import { getpostdetails } from "../../../lib/text";
import BlogClient from "../BlogClient";

function decodePostId(postId) {
  if (!postId) {
    return null;
  }

  if (typeof postId === "number") return postId;

  try {
    // Decode base64 → "post:143"
    const decoded = atob(postId);
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
    };
  }
  console.log(post, "post");
  return {
    title: post?.title?.rendered || "Costa Rican Insurance",
    description:
      stripHtml(post?.excerpt?.rendered)?.slice(0, 160) ||
      "Read the latest blog from Costa Rican Insurance.",
    openGraph: {
      title: post?.title?.rendered || "Costa Rican Insurance",
      description:
        stripHtml(post?.excerpt?.rendered)?.slice(0, 160) ||
        "Read the latest blog from Costa Rican Insurance.",
    },
    twitter: {
      card: "summary_large_image",
      title: post?.title,
      description:
        stripHtml(post?.excerpt?.rendered)?.slice(0, 160) ||
        "Read the latest blog from Costa Rican Insurance.",
    },
  };
}

export default async function Page({ params }) {
  return <BlogClient postid={params.postid}></BlogClient>;
}
