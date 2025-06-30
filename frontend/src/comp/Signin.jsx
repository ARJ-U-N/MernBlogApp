import React, { useState } from "react";
import "./Signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSignIn = () => {
    axios
      .post("http://localhost:3030/signIn", input)
      .then((response) => {
        if (response.data.status === "incorrect password") {
          alert("Invalid password");
        } else if (response.data.status === "invalid id") {
          alert("Invalid email");
        } else {
          let token = response.data.token;
          let userId = response.data.userId;
          sessionStorage.setItem("userId", userId);
          sessionStorage.setItem("token", token);
          navigate("/viewall");
        }
      })
      .catch((error) => {
        alert("An error occurred: " + error.message);
      });
  };

  const handleFacebookSignIn = () => {
    alert("Facebook Sign-In is not yet implemented.");
  };

  return (
    <div className="signin-container">
      <h1 className="app-title">Every New Travel Blog</h1>
      <div className="container">
        <div className="row g-3">
          <div className="col-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={input.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={input.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12">
            <button className="btn btn-success w-100" onClick={handleSignIn}>
              Sign In
            </button>
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary w-100"
              onClick={handleFacebookSignIn}
            >
              Sign In with Facebook
            </button>
          </div>
          <div className="col-12 text-center">
            <a href="/signup" className="btn btn-link">
              New User? Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;