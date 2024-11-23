import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useBlogs } from "@/hooks/useBlogs";
import { Shimmer } from "./Shimmer";
import { Link, useNavigate } from "react-router-dom";

export const Blogs = () => {
  const { data, error } = useBlogs();
  const navigate = useNavigate();
  if (error) {
    return <p className="text-center mt-16">Error: {error}</p>;
  }

  if (!data || !Array.isArray(data)) {
    return (
      <div>
        <Shimmer />
      </div>
    );
  }

  if (data.length === 0) {
    return <p className="text-center mt-16">No blogs found.</p>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-sm">
      <div className="space-y-8 divide-y divide-gray-100" >
        {data.map((blog) => (
          <article key={blog.id} className="pt-8 first:pt-0">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {blog.author?.name?.[0] || "Anon"}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {blog.author.name}
                </span>
                <span>·</span>
                <span>{blog.date}</span>
              </div>
            </div>

            <div className="flex gap-8">
              <div className="flex-1">
              <Link to={`/blog/${blog.id}`}>
                <h2 className="text-2xl font-bold mb-2 cursor-pointer">
                  {blog.title}
                </h2>
              </Link>
                <p className="text-lg text-muted-foreground mb-4 line-clamp-3">
                  {blog.content}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>
                      {Math.ceil(blog.content.length / 250) + " minute(s) read"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
