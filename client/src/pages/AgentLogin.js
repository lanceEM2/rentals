import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AgentSignup.css'; // Import the CSS file

function AgentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/agent/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((r) => {
      if (r.ok) {
        // Extract the JWT token from the Authorization header
        const token = r.headers.get('Authorization').split(' ')[1];
        // Save the token in local storage
        localStorage.setItem("token", token);
        // Navigate to AgentProfile after a successful login
        navigate('/agent/profile');
      }
      if (r.status === 401) {
        alert("Wrong data input!");
        navigate('/');
      }
    });
  }

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Login</h1>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="string"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
}

export default AgentLogin;