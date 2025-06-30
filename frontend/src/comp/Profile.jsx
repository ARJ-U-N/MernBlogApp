import React, { useState, useEffect } from "react";
import axios from "axios";
import './Profile.css'


const avatars = [
  "avatar1.png",
  "avatar2.png",
 
];

const Profile = () => {
  const [user, setUser] = useState({});
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3030/profile", {
        headers: { token },
      })
      .then((res) => {
        setUser(res.data.user);
        setSelectedAvatar(res.data.user.avatar || "default.png");
      })
      .catch((err) => {
        alert("Failed to load profile: " + err.message);
      });
  }, []);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setShowAvatarPicker(false);

    axios
      .put(
        "http://localhost:3030/updateavatar",
        { avatar },
        { headers: { token } }
      )
      .then(() => alert("Avatar updated!"))
      .catch((err) => alert("Failed to update avatar: " + err.message));
  };

  return (
    <div className="profile-container text-center p-4">
     
      <img
        src={`/avatars/${selectedAvatar}`}
        alt="Profile Avatar"
        className="rounded-circle"
        onClick={() => setShowAvatarPicker(true)}
        style={{
          width: 150,
          height: 150,
          objectFit: "cover",
          border: "3px solid #ccc",
          cursor: "pointer",
          transition: "transform 0.2s",
        }}
      />

      
      <h4 className="mt-3">{user.name || "Anonymous"}</h4>
      <h6>Total Likes: {user.totalLikes || 0}</h6>

      
      {showAvatarPicker && (
        <div className="mt-4">
          <p className="fw-semibold">Choose Your Avatar</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={`/avatars/${avatar}`}
                alt={`avatar${index + 1}`}
                className={`rounded-circle border ${
                  avatar === selectedAvatar ? "border-primary border-3" : ""
                }`}
                style={{
                  width: 80,
                  height: 80,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onClick={() => handleAvatarSelect(avatar)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
