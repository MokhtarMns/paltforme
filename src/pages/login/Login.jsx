import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";

import "./style.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { updateUserData } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const uid = data.uid;
        const role = data.role;

        //updateUserData(data);
        localStorage.setItem("userData", JSON.stringify(data));
        console.log({ data });

        if (role === 0) {
          navigate("/courses");
        } else if (role === 1) {
          navigate("/teacher");
        } else {
          setError("Invalid role received");
        }
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="left-diagonal"></div>
      <div className="left">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button" type="submit">
              Login
            </button>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
      <div className="right">
        <div className="img-container"></div>
      </div>
    </div>
  );
}
