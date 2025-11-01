import React from "react";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";

const AppointmentPage = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            {/* === SIDEBAR === */}
            <div className="sidebar">
                <h2>🐾 FurEver</h2>
                <ul>
                    <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                    <li className="active" onClick={() => navigate("/appointment")}>
                        Appointments
                    </li>
                    <li onClick={() => navigate("/pet-profile")}>Pet profile</li>
                    <li onClick={() => navigate("/my-profile")}>My profile</li>
                    <li onClick={() => navigate("/logout")}>Logout</li>
                </ul>
            </div>

            {/* === MAIN CONTENT === */}
            <div className="main-content">


                {/* === MAIN CONTENT BOX === */}
                <div className="content-box">
                    <h2>Pet Appointments</h2>
                    <p>Schedule, manage, and view your pet’s appointments all in one place.</p>

                    {/* === APPOINTMENT CARDS === */}
                    <div className="card-grid">
                        <div className="info-card">
                            <h4>Request Appointment</h4>
                            <p>Schedule an appointment with a vet for your pet’s care.</p>
                            <button onClick={() => navigate("/request-appointment")}>
                                Request
                            </button>
                        </div>

                        <div className="info-card">
                            <h4>View Vet Availability</h4>
                            <p>Check available dates before requesting an appointment.</p>
                            <button onClick={() => navigate("/vet-availability")}>
                                Check Availability
                            </button>
                        </div>

                        <div className="info-card">
                            <h4>See Prescription</h4>
                            <p>Access your pet’s prescriptions and medical records.</p>
                            <button onClick={() => navigate("/prescriptions")}>
                                View Prescription
                            </button>
                        </div>

                        <div className="info-card">
                            <h4>Upcoming Appointments</h4>
                            <p>Track all your scheduled pet care appointments.</p>
                            <button onClick={() => navigate("/upcoming-appointments")}>
                                Upcoming
                            </button>
                        </div>

                        <div className="info-card">
                            <h4>Cancel Appointment</h4>
                            <p>Cancel a previously booked appointment if necessary.</p>
                            <button onClick={() => navigate("/cancel-appointment")}>
                                Cancel
                            </button>
                        </div>
                    </div>

                    {/* === CUSTOMER PROFILE SECTION === */}
                    <section>
                        <h3>Customer Profile</h3>
                        <div className="info-card single">
                            <h4>Manage Profile</h4>
                            <p>Update your personal details, preferences, and pet information.</p>
                            <button onClick={() => navigate("/my-profile")}>Manage</button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AppointmentPage;