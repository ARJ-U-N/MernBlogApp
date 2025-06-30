import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup1 = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    cnfPass: "",
  });

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (input.password === input.cnfPass) {
      let newInput = {
        name: input.name,
        phone: input.phone,
        email: input.email,
        password: input.password,
      };
      axios
        .post("http://localhost:3030/signup", newInput)
        .then((response) => {
          if (response.data.status === "Success") {
            alert("Registered successfully");
            setInput({
              name: "",
              phone: "",
              email: "",
              password: "",
              cnfPass: "",
            });
            navigate("/");
          } else {
            alert("Email already exists");
            setInput({
              name: "",
              phone: "",
              email: "",
              password: "",
              cnfPass: "",
            });
          }
        })
        .catch((error) => {
          alert("An error occurred: " + error.message);
        });
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="app-title" >Every New Travel Blog</h1>
      <div className="container">
        <div className="row g-3">
          <div className="col-12">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              name="phone"
              value={input.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
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
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="cnfPass" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="cnfPass"
              value={input.cnfPass}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12">
            <button className="btn btn-success w-100" onClick={handleSignup}>
              Register
            </button>
          </div>
          <div className="col-12 text-center">
            <a href="/" className="btn btn-link">
              Already have an account? Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup1;