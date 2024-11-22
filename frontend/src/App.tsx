import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
// import { Blogs } from "./pages/Blogs"
import { NavBar } from "./pages/NavBar";
import { BlogPost } from "./pages/BlogPost";
function App() {
  const router = createBrowserRouter([
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/blogs",
      element: <BlogPost/>,
    },
  ]);

  return (
    <div>
      <NavBar/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
