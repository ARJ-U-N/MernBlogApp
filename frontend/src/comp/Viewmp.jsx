import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Dock from "./Dock";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { RiChatPrivateLine } from "react-icons/ri";
import { MdOutlinePublic } from "react-icons/md";
import Profile from "./Profile";



const Viewmypost = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/viewmypost`, {
        headers: { token: token, "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.status === "invalid Authentication") {
          alert("Please sign in to view your posts");
          navigate("/");
        } else if (response.data.status === "user not found") {
          alert("User not found");
          navigate("/");
        } else {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred: " + error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePostClick = (id) => {
    navigate(`/posts/${id}`);
  };
  const handleUpdate = (id) => {
    navigate("/create", { state: { postId: id } });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/deletepost/${id}`, {
          headers: { token: token },
        })
        .then((res) => {
          alert(res.data.status);
          fetchData(); 
        })
        .catch((err) => {
          alert("Error deleting post: " + err.message);
        });
    }
  };

  const handleMakePrivate = (id, isPrivate) => {
    const confirmMessage = isPrivate
      ? "Make this post public again?"
      : "Make this post private?";

    if (window.confirm(confirmMessage)) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/makeprivate/${id}`, {}, {
          headers: { token },
        })
        .then((res) => {
          alert(res.data.status);
          fetchData(); 
        })
        .catch((err) => {
          alert("Error toggling post privacy: " + err.message);
        });
    }
  };

  return (
    <div>
      <Profile />
      <div className="container">
        <h2 className="my-3 text-center">My Posts</h2>
        <div className="row g-3">
          {data.length > 0 ? (
            data.map((value, index) => (
              <div key={index} className="col-12">
                <div className="card1"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/posts/${value._id}`)}
                >
                  <div className="row g-0">
                    <div className="col-4">
                      <img
                        src={value.thumbnail || "https://via.placeholder.com/150"}
                        className="img-fluid rounded"
                        alt={value.title}
                      />
                    </div>
                    <div className="col-8">
                      <div className="card-body1">
                        <h5 className="card-title text-truncate">{value.title}</h5>
                        <p className="card-text1">
                          <small className="text-body-primary">
                            {value.readTime} | {value.likes} Likes
                          </small>
                        </p>

                        
                        <div className="d-flex gap-2 mt-2">
                          <button
                            className="btn btn1 btn-sm"
                            onClick={() => handleUpdate(value._id)}
                          >
                            <GrUpdate />
                          </button>
                          <button
                            className="btn btn1 btn-sm"
                            onClick={() => handleDelete(value._id)}
                          >
                            <RiDeleteBin6Line />
                          </button>
                          <button
                            className="btn btn1 btn-sm"
                            onClick={() => handleMakePrivate(value._id, value.private)}
                            title={value.private ? "Make Public" : "Make Private"}
                          >
                            {value.private ? <MdOutlinePublic /> : <RiChatPrivateLine />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No posts available.</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Viewmypost;