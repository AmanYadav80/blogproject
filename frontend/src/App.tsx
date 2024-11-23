import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { NavBar } from "./pages/NavBar";
import { CreateBlog } from "./pages/CreateBlog";
import {BlogPost } from "./pages/BlogPost";
import { Blogs } from "./pages/Blogs";
function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/post" element={<CreateBlog/>} />
        <Route path="/blog/:id" element={<BlogPost/>} />
      </Routes>
    </div>
  );
}

export default App;
