import logo from "./logo.svg";
import "./App.css";
import Signup1 from "./comp/Signup1";
import Signin from "./comp/Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from "./comp/CreatePost";
import ViewAll from "./comp/ViewAll";
import Viewmypost from "./comp/Viewmp"; 
import PostDetail from "./comp/PostDetail"; 
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./comp/Navbar";
import UserProfile from "./comp/UserProfile";


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup1 />} />
        <Route path="/" element={<Signin />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/viewall" element={<ViewAll />} />
        <Route path="/viewmypost" element={<Viewmypost />} /> 
        <Route path="/posts/:id" element={<PostDetail />} /> 
        <Route path="/userprofile/:userId" element={<UserProfile />} />

        
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;