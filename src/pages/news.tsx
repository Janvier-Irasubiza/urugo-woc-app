import { useEffect, useState } from "react";
import App from "../layouts/app";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format, isValid } from "date-fns";

interface Post {
  id: number;
  title: string;
  image: string;
  created_at: string;
  published_by?: {
    first_name: string;
    last_name: string;
  };
  description: string;
}

function PostDetails() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams();

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/blog-posts/${slug}/`
      );
      console.log(response.data);
      setPost(response.data);
    } catch (err) {
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isValid(date) ? format(date, "MMMM dd, yyyy HH:mm") : "Invalid date";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <App>
      <div className="px-6 py-10 max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <img
            src={post.image}
            alt={post.title || "Post image"}
            className="w-full h-64 object-cover rounded-xl shadow-lg"
          />
          <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between text-gray-500 text-sm">
          <span>Published on: {formatDate(post.created_at)}</span>
          {post.published_by && (
            <span>
              By: {post.published_by.first_name} {post.published_by.last_name}
            </span>
          )}
        </div>

        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {post.description}
          </p>
        </div>
      </div>
    </App>
  );
}

export default PostDetails;
