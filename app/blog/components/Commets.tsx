"use client";
import { useState, useEffect } from "react";
import axios from "axios";
function decodePostId(
  postId: string | number | undefined | null
): number | null {
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

export default function Comments({ postId }: { postId: number }) {
  const [formData, setFormData] = useState({
    comment: "",
    name: "",
    email: "",
    saveInfo: false,
  });
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  // Fetch comments from WordPress
  useEffect(() => {
    const fetchComments = async () => {
      const numericPostId = decodePostId(postId);
      if (!numericPostId) return;
      try {
        const res = await axios.get(
          `https://admin.costaricaninsurance.com/wp-json/wp/v2/comments?post=${numericPostId}`
        );

        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [postId]);
  // console.log(postId, "postId");

  // Handle input
  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit to WP
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.comment || !formData.name || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }
    console.log(
      postId,
      formData.name,
      formData.email,
      formData.comment,
      "data to submit"
    );
    setLoading(true);
    const numericPostId = decodePostId(postId);
    try {
      const res = await axios.post(
        `https://admin.costaricaninsurance.com/wp-json/wp/v2/comments`,
        {
          post: numericPostId,
          author_name: formData.name,
          author_email: formData.email,
          content: formData.comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Add new comment instantly (optimistic update)
      setComments((prev) => [res.data, ...prev]);
      setPopupMessage("Your comment has been submitted!");
      setFormData({
        comment: "",
        name: "",
        email: "",
        saveInfo: false,
      });
    } catch (err: any) {
      console.error("Error submitting comment:", err.response?.data || err);
      alert("Could not post comment. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto dark:text-[#fff] p-6">
      {popupMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-white/30 text-black dark:text-white p-6 rounded-2xl shadow-lg text-center">
            <p className="text-lg">{popupMessage}</p>
            <button
              onClick={() => setPopupMessage(null)}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              OK
            </button>
          </div>
          <div
            className="fixed inset-0 bg-black opacity-40"
            onClick={() => setPopupMessage(null)}
          />
        </div>
      )}
      {/* Comments List */}
      <h2 className="text-2xl font-[marcellus] font-bold w-fit  border-b border-orange-400 mb-4">
        Comments ({comments.length})
      </h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 border dark:border-gray-700 rounded-2xl"
            >
              <h4 className="font-semibold">{comment.author_name}</h4>
              <div
                className="text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
              />
              <p className="text-xs text-gray-500 dark:text-gray-300">
                {new Date(comment.date).toISOString().split("T")[0]}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Comment Form */}
      <div className="mt-8 ">
        <h3 className="text-xl font-bold font-[marcellus] mb-4">
          Leave a Reply
        </h3>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleInputChange}
          placeholder="Your Comment"
          rows={5}
          className="w-full p-3 border  dark:bg-white/10 dark:border-white/10 rounded-2xl mb-3"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="w-full p-3 border rounded-2xl dark:bg-white/10 dark:border-white/10 mb-3"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full p-3 border  dark:bg-white/10 dark:border-white/10 rounded-2xl mb-3"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </div>
  );
}
