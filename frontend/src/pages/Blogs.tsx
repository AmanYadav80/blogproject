import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useBlogs } from "@/hooks/useBlogs";

export const Blogs = () => {
  const { data, error } = useBlogs();

  if (error) {
    return <p className="text-center mt-16">Error: {error}</p>;
  }

  if (!data || !Array.isArray(data)) {
    return <p className="text-center mt-16">Loading...</p>;
  }

  if (data.length === 0) {
    return <p className="text-center mt-16">No blogs found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {data.map((blog) => (
          <article key={blog.id} className="group">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{blog.author?.initials || "N/A"}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {blog.author?.name || "Unknown"}
                </span>
                <span>·</span>
                <span>{blog.date || "No date"}</span>
                {blog.isMemberOnly && (
                  <>
                    <span>✨</span>
                    <Badge variant="secondary" className="font-medium">
                      Member-only
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2 group-hover:text-black">
              <a href="#" className="block">
                {blog.title || "Untitled"}
              </a>
            </h2>

            <p className="text-lg text-muted-foreground mb-4">
              {blog.content || "No content available."}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Badge variant="secondary" className="rounded-full">
                  {blog.category || "Uncategorized"}
                </Badge>
                <span>{blog.readTime || "Unknown time"}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
