import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./SignIn.css";
import API_ENDPOINTS from './apiConfig';

const SignIn = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [role, setRole] = useState("patient");
  const [uuid, setUuid] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (uuid) {
      if (role === "patient") {
        history.push(`/patient/${uuid}`);
      } else if (role === "doctor") {
        history.push(`/doctor/${uuid}`);
      }
    }
  }, [uuid, role, history]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSignUpRedirect = () => {
    history.push("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      role === "patient"
        ? API_ENDPOINTS.PATIENT_SIGN_IN
        : API_ENDPOINTS.DOCTOR_SIGN_IN;

    try {
      const response = await axios.post(endpoint, userData);
      console.log("User is signed in:", response.data);

      setUuid(response.data);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div className="SignInContainer">
      <h2 className="SignInHeader">Sign In</h2>
      <form className="SignInForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
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
        <button type="submit">Sign In</button>
        <hr />
        <button
          type="button"
          className="SignUpButton"
          onClick={handleSignUpRedirect}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignIn;
