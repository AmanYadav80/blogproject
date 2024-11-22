import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Sample data - would typically come from your database
const blogs = [
  {
    id: 1,
    title: "How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing",
    excerpt: "No need to create a fancy and modern website with hundreds of pages to make money online. — Making money online is the dream for man...",
    author: {
      name: "Peter V.",
    },
    date: "Dec 3, 2023",
    category: "Side Hustle",
  },
  {
    id: 2,
    title: "To PM2, or Not to PM2: Embracing Docker for Node.js",
    excerpt: "We've got this teeny-tiny service written Node.js, and like all services in the world its availability is very important to us. we're talking BC-era code here! Back in those dark ages, Docker didn't exist yet. We had to...",
    author: {
      name: "Payam Saderi",
    },
    date: "Oct 2, 2023",
    category: "Docker",
  }
]

export const BlogPost=() => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-sm">
      <div className="space-y-8 divide-y divide-gray-100">
        {blogs.map((blog) => (
          <article key={blog.id} className="pt-8 first:pt-0">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                <AvatarFallback>{blog.author.initials}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{blog.author.name}</span>
                <span>·</span>
                <span>{blog.date}</span>
              </div>
            </div>

            <div className="flex gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">
                  <a href="#">{blog.title}</a>
                </h2>
                <p className="text-lg text-muted-foreground mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="rounded-full">
                      {blog.category}
                    </Badge>
                    <span>{Math.ceil(blog.excerpt.length/70)*1 + " minute(s) read"}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}