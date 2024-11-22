import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput , updateBlogInput } from "@aman06yadav/medium-common"

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables : {
    userId : string
  }

}>();

blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization") || "";
  try {
    const user = await verify(header , c.env.JWT_SECRET);
  if(user){
    //@ts-ignore
    c.set("userId",user.id)
    return await next();
  }
  else {
    c.status(401);
    return c.json({
        message : "Unuthorized access"
    })
  }
  }
  catch(e){
    c.status(403);
    return c.json({
        message : "Something wrong"
    })
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
        message : "Inputs are not correct"
    })
  }
  const authorId = c.get("userId");
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      published: true,
      authorId: authorId,
    },
  });
  return c.json({
    id: post.id,
  });
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success  } = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
        message : "Inputs are not correct"
    })
  }
  try {
    const post = await prisma.post.update({
        where: {
          id: body.id,
        },
        data: {
          title: body.title,
          content: body.content,
        },
      });
      return c.json({
        id: post.id
      });
  }
  catch(e){
    c.status(403);
    return c.json({
        message : "Invalid blog details"
    })
  }
}); 

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const posts = await prisma.post.findMany({});
    return c.json({
      posts,
    });
  });

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  try {
    const post = await prisma.post.findFirst({
      where: {
        id:id,
      },
    });
    return c.json({
      post,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while fetching the blog",
    });
  }
});


