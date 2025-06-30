import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Dock from "./Dock";
import "./CreatePost.css";

const CreatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.state?.postId || null;

  const [token] = useState(sessionStorage.getItem("token"));
  const [userId] = useState(sessionStorage.getItem("userId"));

  const [input, setInput] = useState({
    userId: userId,
    title: "",
    message: "",
    thumbnail: "",
    readTime: "",
  });

  // Fetch post data if editing
  useEffect(() => {
    if (postId) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/getpost/${postId}`, {
          headers: { token },
        })
        .then((res) => {
          if (res.data.post) {
            const { title, message, thumbnail, readTime } = res.data.post;
            setInput({
              userId: userId,
              title: title,
              message: message, 
              thumbnail: thumbnail || "",
              readTime: readTime || "",
            });
          } else {
            alert("Post not found");
            navigate("/viewmypost");
          }
        })
        .catch((err) => {
          alert("Error loading post: " + err.message);
        });
    }
  }, [postId, token, userId, navigate]);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handlePost = () => {
    if (postId) {
      // UPDATE existing post
      axios
        .put(`${process.env.REACT_APP_API_URL}/updatepost/${postId}`, {
          title: input.title,
          message: input.message,
          thumbnail: input.thumbnail,
          readTime: input.readTime,
        }, {
          headers: { token },
        })
        .then((res) => {
          alert("Post updated successfully");
          navigate("/viewmypost");
        })
        .catch((err) => {
          alert("Update failed: " + err.message);
        });
    } else {
      // CREATE new post
      axios
        .post(`${process.env.REACT_APP_API_URL}/create`, input, {
          headers: { token, "Content-Type": "application/json" },
        })
        .then((response) => {
          if (response.data.status === "Success") {
            alert("Posted successfully");
            setInput({
              userId: userId,
              title: "",
              message: "",
              thumbnail: "",
              readTime: "",
            });
          } else {
            alert("Failed to post: " + response.data.status);
          }
        })
        .catch((error) => {
          alert("An error occurred: " + error.message);
        });
    }
  };

  return (
    <div>
      <div className="container1">
        <h2 className="mt-3 text-centers">
          {postId ? "Update Post" : "Create a Post"}
        </h2>
        <div className="row g-3">
          <div className="col-12">
            <label htmlFor="title" className="form-label1">
              Post Title
            </label>
            <input
              type="text"
              name="title"
              value={input.title}
              className="form-control1"
              onChange={handleInputChange}
              placeholder="Enter post title"
            />
          </div>
          <div className="col-12">
            <label htmlFor="message" className="form-label1">
              Post Content
            </label>
            <textarea
              name="message"
              value={input.message}
              className="form-control1"
              onChange={handleInputChange}
              placeholder="Write your post content here"
              rows="5"
            ></textarea>
          </div>
          <div className="col-12">
            <label htmlFor="thumbnail" className="form-label1">
              Thumbnail URL (Optional)
            </label>
            <input
              type="text"
              name="thumbnail"
              value={input.thumbnail}
              className="form-control1"
              onChange={handleInputChange}
              placeholder="Enter image URL"
            />
          </div>
          <div className="col-12">
            <label htmlFor="readTime" className="form-label1">
              Read Time (Optional, e.g., '10 min')
            </label>
            <input
              type="text"
              name="readTime"
              value={input.readTime}
              className="form-control1"
              onChange={handleInputChange}
              placeholder="e.g., 10 min"
            />
          </div>
          <div className="col-12">
            <button className="btn btn-success w-50" onClick={handlePost}>
              {postId ? "Update Post" : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
