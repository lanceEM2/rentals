import React, { useState } from "react";

function AgentProfileUpdate() {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [zipcode, setZipcode] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        // Retrieve the token from localStorage or another storage method you use
        const token = localStorage.getItem('token');

        fetch("/agent-data/update", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`  // Include the token in the headers
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                phone,
                password,
                zipcode
            }),
        }).then((r) => {
            if (r.ok) {
                console.log(`${first_name}'s profile updated successfully`);
            } else {
                console.log("Failed to update profile");
            }
        }).catch((error) => console.error("Error updating profile:", error));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Updating {first_name}'s profile</h1>
                <label htmlFor="first_name">Enter first name</label>
                <input
                    type="text"
                    id="first_name"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                />
                <label htmlFor="last_name">Enter last name</label>
                <input
                    type="text"
                    id="last_name"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                />
                <label htmlFor="email">Enter email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="phone">Enter phone</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="password">Enter password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="zipcode">Enter Zipcode</label>
                <input
                    type="text"
                    id="zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                />
                <button type="submit" className="update-button">Update Profile</button>
            </form>
        </div>
    );
}

export default AgentProfileUpdate;
