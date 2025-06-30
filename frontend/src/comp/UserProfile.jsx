import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const UserProfile = () => {
    const navigate = useNavigate();
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    
    axios
      .get(`http://localhost:3030/publicprofile/${userId}`, {
        headers: { token },
      })
      .then((res) => {
        setProfile(res.data.user);
        setPosts(res.data.posts);
      })
      .catch((err) => {
        alert("Failed to load profile: " + err.message);
      });
  }, [userId]);

  return (
    <div className="container text-center">
      {profile ? (
        <>
          <img
            src={`/avatars/${profile.avatar || "default.png"}`}
            className="rounded-circle"
            style={{ width: 120, height: 120 }}
            alt="avatar"
          />
          <h3 className="mt-3">{profile.name}</h3>
          <p>Total Likes: {profile.totalLikes}</p>
          <h5 className="mt-4">Posts by {profile.name}</h5>

          <div className="row g-3">
  {posts.map((value, index) => (
    <div key={index} className="col-12">
      <div
        className="card1"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
