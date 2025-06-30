import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostDet.css";


const PostDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [token] = useState(sessionStorage.getItem("token"));
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPost = () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
        headers: { token: token, "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("Post Detail Response:", response.data);
        if (response.data.status === "invalid Authentication") {
          alert("Please sign in to view this post");
          navigate("/");
        } else {
          setPost(response.data);
          setHasLiked(response.data.hasLiked || false);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error fetching post:", error);
        alert("An error occurred: " + error.message);
        navigate("/viewall");
        setIsLoading(false);
      });
  };

  const handleLike = () => {
    if (!token) {
      alert("Please sign in to like this post");
      return;
    }

    // Prevent liking if already liked
    if (hasLiked) {
      alert("You have already liked this post");
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/posts/${id}/like`,
        {},
        {
          headers: { token: token, "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log("Like Response:", response.data);
        if (response.data.status === "success") {
          setPost((prevPost) => ({
            ...prevPost,
            likes: response.data.likes,
          }));
          setHasLiked(true);
        } else {
          alert("Failed to like the post: " + response.data.message);
        }
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        console.log("Error liking post:", errorMessage);

        // If the error is because they already liked the post
        if (error.response?.data?.hasLiked) {
          setHasLiked(true);
          // Update likes count from the error response if available
          if (error.response.data.likes !== undefined) {
            setPost((prevPost) => ({
              ...prevPost,
              likes: error.response.data.likes,
            }));
          }
        }

        alert("Failed to like the post: " + errorMessage);
      });
  };

  // Handlers for the category buttons
  const handleAnimalsClick = () => {
    navigate("/featured-animals");
  };

  const handleFoodsClick = () => {
    navigate("/category/foods");
  };

  useEffect(() => {
    if (token) {
      fetchPost();
    } else {
      alert("Please sign in to view this post");
      navigate("/");
    }
  }, [id, token]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  // Render the message as a single bolded paragraph
  const renderMessage = (message) => {
    if (!message) {
      return <p>No message available.</p>;
    }
    return (
      <p>
        <strong>{message}</strong>
      </p>
    );
  };

  return (
    <div>
      <div className="post-detail-header">
        <img
          src={post.thumbnail || "https://via.placeholder.com/300"}
          className="post-detail-img"
          alt={post.title || "Post Image"}
        />
        <div className="post-detail-header-overlay">
          <h1 className="post-detail-title">{post.title || "Untitled Post"}</h1>
          <div className="post-detail-meta-container">
            <p className="post-detail-meta">
              <span
                style={{ cursor: "pointer", color: "white", textDecoration: "none" }}
                onClick={() => navigate(`/userprofile/${post.userId?._id}`)}
              >
                {post.userId?.name || "Unknown"}
              </span>{" "}
              • {post.readTime || "N/A"}
            </p>

            <div className="fixed-like-container">
              <button
                className={`like-button btn btn-outline-light btn-sm ${hasLiked ? "liked" : ""}`}
                onClick={handleLike}
                disabled={hasLiked}
                aria-label={hasLiked ? "Post already liked" : "Like this post"}
              >
                {hasLiked ? "❤️" : "🖤"}
              </button>
              <span className="likes-count">{post.likes}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="post-detail-content-card">
          {renderMessage(post.message)}
          <div className="category-buttons">
            <button
              className="a"
              onClick={handleAnimalsClick}
            >
              <span className="category-button-icon">🐾</span>
              <span className="category-button-text"> Featured Animals</span>
            </button><br />
            <button
              className="b"
              onClick={handleFoodsClick}
            >
              <span className="category-button-icon">🍴</span>
              <span className="category-button-text"> Featured Foods</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;