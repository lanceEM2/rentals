import React, { useState, useEffect } from "react";

function AgentProfileUpdate() {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [zipcode, setZipcode] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const token = localStorage.getItem('token');

        fetch('/agent-data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setFirst_name(data.first_name);
            setLast_name(data.last_name);
            setEmail(data.email);
            setDescription(data.description);
            setPhone(data.phone);
            setZipcode(data.zipcode);
        })
        .catch((error) => console.error("Error fetching agent data:", error));
    };

    function handleSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const updatedData = {
            first_name,
            last_name,
            email,
            description,
            phone,
            zipcode
        };

        if (password) {
            updatedData.password = password;
        }

        fetch("/agent-data/update", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedData),
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
                <label htmlFor="description">Enter Description</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
