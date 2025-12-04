import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [status, setStatus] = useState("");

    const pets = [
        { id: 1, name: "Bella", breed: "Labrador", age: "2", status: "Available", image: "/images/labrador.jpeg" },
        { id: 2, name: "Max", breed: "Beagle", age: "1", status: "Adopted", image: "/images/beagle.jpeg" },
        { id: 3, name: "Luna", breed: "Persian Cat", age: "3", status: "Available", image: "/images/persian.jpeg" },
        { id: 4, name: "Charlie", breed: "Poodle", age: "4", status: "Available", image: "/images/poodle.jpeg" },
    ];

    const filteredPets = pets.filter(
        (p) =>
            (!breed || p.breed === breed) &&
            (!age || p.age === age) &&
            (!status || p.status === status)
    );

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>🐾 FurEver</h2>
                <ul>
                    <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                    <li onClick={() => navigate("/appointment")}>Appointments</li>
                    <li onClick={() => navigate("/pet-profile")}>Pet Profile</li>
                    <li onClick={() => navigate("/my-profile")}>My Profile</li>
                    <li onClick={() => navigate("/logout")}>Logout</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Top Gradient Bar */}

                {/* Main White Box */}
                <div className="content-box">
                    <h1>Find Your New Best Friend 🐾</h1>

                    {/* Filters */}
                    <div className="filters">
                        <select value={breed} onChange={(e) => setBreed(e.target.value)}>
                            <option value="">All Breeds</option>
                            <option value="Labrador">Labrador</option>
                            <option value="Beagle">Beagle</option>
                            <option value="Persian Cat">Persian Cat</option>
                            <option value="Poodle">Poodle</option>
                        </select>

                        <select value={age} onChange={(e) => setAge(e.target.value)}>
                            <option value="">All Ages</option>
                            <option value="1">1 year</option>
                            <option value="2">2 years</option>
                            <option value="3">3 years</option>
                            <option value="4">4 years</option>
                        </select>

                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="">All Statuses</option>
                            <option value="Available">Available</option>
                            <option value="Adopted">Adopted</option>
                        </select>
                    </div>

                    {/* Pet Grid */}
                    <div className="pet-grid">
                        {filteredPets.map((pet) => (
                            <div key={pet.id} className="pet-card">
                                <img src={pet.image} alt={pet.name} />
                                <div className="pet-info">
                                    <h3>{pet.name}</h3>
                                    <p>
                                        {pet.breed} • {pet.age} yrs
                                    </p>
                                    <span className={`status ${pet.status.toLowerCase()}`}>
                                        {pet.status}
                                    </span>
                                </div>
                                <div className="pet-actions">
                                    <button onClick={() => navigate(`/adopt/${pet.id}`)}>
                                        Adopt
                                    </button>
                                    <button onClick={() => navigate(`/pets/${pet.id}`)}>
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;