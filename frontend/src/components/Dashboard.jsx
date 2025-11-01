import React from "react";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            {/* === SIDEBAR === */}
            <div className="sidebar">
                <h2>🐾 FurEver</h2>
                <ul>
                    <li className="active" onClick={() => navigate("/dashboard")}>
                        Dashboard
                    </li>
                    <li onClick={() => navigate("/appointment")}>Appointments</li>
                    <li onClick={() => navigate("/pet-profile")}>Pet profile</li>
                    <li onClick={() => navigate("/my-profile")}>My profile</li>
                    <li onClick={() => navigate("/logout")}>Logout</li>
                </ul>
            </div>

            {/* === MAIN CONTENT === */}
            <div className="main-content">
                {/* === TOP BAR === */}
                <div className="top-gradient-bar">
                    <div className="logo">
                    </div>
                    <div className="icons">
                        <i className="fas fa-bell"></i>
                        <i className="fas fa-user-circle"></i>
                    </div>
                </div>

                {/* === WHITE/BEIGE BOX CONTENT === */}
                <div className="content-box">
                    <h2>Welcome to FurEver</h2>
                    <p>Manage your pets, appointments, and adoptions in one place.</p>

                    {/* ==== PET ADOPTION SECTION ==== */}
                    <section>
                        <h3>Pet (Adoption)</h3>
                        <div className="card-grid">
                            <div className="info-card">
                                <h4>Put Up for Adoption</h4>
                                <p>List your pet for adoption and find a loving home.</p>
                                <button onClick={() => navigate("/put-up-for-adoption")}>List Pet</button>
                            </div>

                            <div className="info-card">
                                <h4>Adopt a Pet</h4>
                                <p>Find and adopt a pet that fits your home and lifestyle.</p>
                                <button onClick={() => navigate("/adopt")}>Adopt</button>
                            </div>

                            <div className="info-card">
                                <h4>View Pets</h4>
                                <p>See pets that are currently available for adoption.</p>
                                <button onClick={() => navigate("/pets")}>View Pets</button>
                            </div>
                        </div>
                    </section>

                    {/* ==== PET APPOINTMENT SECTION ==== */}
                    <section>
                        <h3>Pet (Appointment)</h3>
                        <div className="card-grid">
                            <div className="info-card">
                                <h4>Request Appointment</h4>
                                <p>Book an appointment with a vet for your pet.</p>
                                <button onClick={() => navigate("/request-appointment")}>Request</button>
                            </div>

                            <div className="info-card">
                                <h4>View Vet Availability</h4>
                                <p>Check available times before scheduling appointments.</p>
                                <button onClick={() => navigate("/vet-availability")}>Check Availability</button>
                            </div>

                            <div className="info-card">
                                <h4>See Prescription</h4>
                                <p>View your pet’s prescriptions and medical reports.</p>
                                <button onClick={() => navigate("/prescriptions")}>View Reports</button>
                            </div>
                        </div>
                    </section>

                    {/* ==== UPCOMING/CANCEL ==== */}
                    <div className="footer-actions">
                        <button onClick={() => navigate("/upcoming-appointments")}>Upcoming Appointments</button>
                        <button onClick={() => navigate("/cancel-appointment")}>Cancel Appointment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;