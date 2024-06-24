import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/auth/signup", {
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
        // Navigate to CustomerpersonCars component after a successful Signup
        navigate('/');
      }
      if (r.status === 401) {
        alert("The email and password already exists, please login!");
        navigate('/');
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="string"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default CustomerSignup;