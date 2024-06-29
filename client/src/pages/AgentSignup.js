import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AgentSignup() {
    const [firstName, setFirst_name] = useState("");
    const [lastName, setLast_name] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [zipcode, setZipcode] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/agent/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName,
            lastName,
            phone,
            email,
            password,
            description,
            zipcode
        }),
        }).then((r) => {
        if (r.ok) {
            // Extract the JWT token from the Authorization header
            const token = r.headers.get('Authorization').split(' ')[1];
            // Save the token in local storage
            localStorage.setItem("token", token);
            // Navigate to AgentProfile after a successful Signup
            navigate('agent/profile');
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
            <label htmlFor="firstname">First Name</label>
            <input
            type="text"
            id="firstname"
            autoComplete="off"
            value={firstName}
            onChange={(e) => setFirst_name(e.target.value)}
            />
            <label htmlFor="lastname">Last Name</label>
            <input
            type="text"
            id="lastname"
            autoComplete="off"
            value={lastName}
            onChange={(e) => setLast_name(e.target.value)}
            />
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
            type="text"
            id="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="phone">Phone</label>
            <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="off"
            />
            <label htmlFor="description">Description</label>
            <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="off"
            />
            <label htmlFor="zipcode">ZipCode</label>
            <input
            type="text"
            id="zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            autoComplete="off"
            />
            <button type="submit">Signup</button>
        </form>
        </div>
    );
}

export default AgentSignup;