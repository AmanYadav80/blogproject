import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../constants";
import { Shimmer } from "./Shimmer";

interface Blog {
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export const BlogPost = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState("");
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (!token) {
        setError("No token found");
        return;
      }

      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/blog/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }

        const data = await response.json();
        setBlog(data.post);
      } catch (err) {
        let errorMessage = "Failed to do something exceptional";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
      }
    };

    fetchBlogDetail();
  }, [token, id]);

  if (error) return <div>Error: {error}</div>;
  if (!blog)
    return (
      <div>
        <Shimmer />
      </div>
    );

  return (
    <div className="container mx-auto max-w-4xl px-6 py-8">
      {/* Title Section */}
      <div className="flex gap-10">
        <div>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            {blog?.title}
          </h1>
        </div>
        <div>
          <div className="flex items-center mb-8 gap-4 pt-2">
            <div className="w-10 h-10 text-center pt-2 bg-gray-200 rounded-full">
              {blog?.author?.name[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold">Author</h2>
              <div className="flex flex-col">
                <span className="text-xl">{blog?.author?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <article className="prose prose-lg max-w-none">
        <p className="text-lg leading-relaxed text-gray-700">{blog?.content}</p>
      </article>
    </div>
  );
};

export default BlogPost;
