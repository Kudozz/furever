import React, { useState } from "react";
import "../Auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        dob: "",
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle signup
    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        // ===== Password validation =====
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            alert(
                "Password must be at least 8 characters long and include:\n" +
                "• 1 uppercase letter\n" +
                "• 1 lowercase letter\n" +
                "• 1 number\n" +
                "• 1 special character"
            );
            setLoading(false);
            return; // Stop further execution
        }

        try {
            // POST request to backend
            const res = await axios.post(
                "http://localhost:5000/api/users/signup",
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    dob: formData.dob,
                }
            );

            // Save token (optional)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));

            alert("Signup successful! Please log in.");
            navigate("/login");
        } catch (error) {
            console.error("Signup failed:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Signup failed. Try again!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="auth-container">
            {/* ==== LEFT SIDE ==== */}
            <div className="auth-left">
                <h1 className="brand">🐾 FurEver</h1>
            </div>

            {/* ==== RIGHT SIDE ==== */}
            <div className="auth-right">
                <button className="back-btn" onClick={() => navigate("/login")}>
                    ← Back
                </button>

                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="show-password-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />

                    <button className="auth-btn" type="submit" disabled={loading}>
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>

                    <div className="switch">
                        Already have an account?{" "}
                        <button
                            type="button"
                            className="link-button"
                            onClick={() => navigate("/login")}
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;