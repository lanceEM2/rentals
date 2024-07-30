import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AgentSignup.css'; // Import the CSS file

function AgentSignup() {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [zipcode, setZipcode] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const signupData = {
            first_name,
            last_name,
            phone,
            email,
            password,
            description,
            zipcode
        };
        console.log("Submitting data:", signupData); // Log the data being sent

        fetch("/agent/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupData),
        }).then((r) => {
            if (r.ok) {
                const token = r.headers.get('Authorization').split(' ')[1];
                localStorage.setItem("token", token);
                navigate('/agent/profile');
            } else if (r.status === 409) {
                alert("This account exists!");
            } else {
                alert("Signup failed!");
            }
        });
    }

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h1>Signup</h1>

                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        autoComplete="off"
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        autoComplete="off"
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                    />
                </div>

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
                        type="password"
                        id="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        autoComplete="off"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        autoComplete="off"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="zipcode">ZipCode</label>
                    <input
                        type="text"
                        id="zipcode"
                        autoComplete="off"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                </div>

                <button type="submit" className="submit-button">Signup</button>
            </form>
        </div>
    );
}

export default AgentSignup;
