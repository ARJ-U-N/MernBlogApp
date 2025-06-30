import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Dock from "./Dock";
import SearchBar from "./SearchBar";

const ViewAll = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [data, setData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Top");
  const [animatingPostId, setAnimatingPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/viewall?filter=${activeFilter}`, {
        headers: { token: token, "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.status === "invalid Authentication") {
          alert("Please sign in to view posts");
          navigate("/");
        } else {
          setData(response.data);
        }
      })
      .catch((error) => {
        alert("An error occurred: " + error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, [activeFilter]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handlePostClick = (id) => {
    setAnimatingPostId(id);
    setTimeout(() => {
      navigate(`/posts/${id}`);
    }, 400);
  };

  const filteredData = data.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="container">
        <h2 className="recommendation-header">Your Daily </h2>
        <h2 className="r"><b>Recommendation</b></h2>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="row g-2">

         
          {searchQuery === "" && data.length > 0 && (
            <div className="col-12 mb-3">
              <div className="featured-posts">
                {data.slice(0, 10).map((value, index) => (
                  <div
                    key={index}
                    className={`featured-post ${animatingPostId === value._id ? "post-click-anim" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handlePostClick(value._id)}
                  >
                    <img
                      src={value.thumbnail || "https://via.placeholder.com/300"}
                      className="featured-post-img"
                      alt={value.title || "Featured Post"}
                    />
                    <div className="featured-post-content">
                      <h5 className="featured-post-title">
                        {value.title || "Untitled Post"}
                      </h5>
                      <p className="featured-post-meta">
                        By {value.userId?.name || "Unknown"} | {value.readTime || "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

         
          <div className="filter-tabs mb-3">
            {["Top", "Popular", "Trending", "Editor Choice"].map((filter) => (
              <span
                key={filter}
                className={`filter-tab ${activeFilter === filter ? "active" : ""}`}
                onClick={() => handleFilterChange(filter)}
              >
                {filter}
              </span>
            ))}
          </div>

         
          {(searchQuery !== "" ? filteredData : data.slice(10)).map((value, index) => (
            <div key={index} className="col-12">
              <div
                className={`post-card ${animatingPostId === value._id ? "post-click-anim" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => handlePostClick(value._id)}
              >
                <div className="row g-0">
                  <div className="col-4">
                    <img
                      src={value.thumbnail || "https://via.placeholder.com/150"}
                      className="post-thumbnail"
                      alt={value.title || "Post"}
                    />
                  </div>
                  <div className="col-8">
                    <div className="post-card-content">
                      <h5 className="post-title text-truncate">
                        {value.title || "Untitled Post"}
                      </h5>
                      <p className="post-meta">
                        By {value.userId?.name || "Unknown"} | {value.readTime || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {data.length === 0 && (
            <p className="text-center">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAll;
