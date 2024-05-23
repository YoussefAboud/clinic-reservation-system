import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./SignUp.css";
import API_ENDPOINTS from './apiConfig';

const SignUp = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState("patient");
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleLogIn = (e) => {
    history.push("/signin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      role === "patient"
        ? API_ENDPOINTS.PATIENT_SIGN_UP
        : API_ENDPOINTS.DOCTOR_SIGN_UP;

    try {
      const response = await axios.post(endpoint, userData);
      console.log("User is signed up:", response.data);
      if (role === "patient") {
        history.push(`/patient/${response.data}`);
      } else if (role === "doctor") {
        history.push(`/doctor/${response.data}`);
      }
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  };

  return (
    <div className="SignUpContainer">
      <h2 className="SignUpHeader">Sign Up</h2>
      <form className="SignUpForm" onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="radio"
            name="role"
            value="patient"
            checked={role === "patient"}
            onChange={handleRoleChange}
          />
          <label>Patient</label>
          <input
            type="radio"
            name="role"
            value="doctor"
            checked={role === "doctor"}
            onChange={handleRoleChange}
          />
          <label>Doctor</label>
        </div>
        <button type="submit" className="LoginButton">
          Sign Up
        </button>
        <hr />
        <button type="button" onClick={handleLogIn}>
          Login
        </button>
      </form>
    </div>
  );
};

export default SignUp;
