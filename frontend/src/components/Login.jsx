import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Auth.css";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send login request to backend
            const res = await axios.post(
                `/api/users/login`,
                formData
            );

            // Save token to localStorage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));

            alert(`Welcome ${res.data.name}!`);
            navigate("/welcome"); // Redirect after success
        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                <h1 className="brand">🐾 FurEver</h1>
            </div>

            <div className="auth-right">
                <button className="back-btn" onClick={() => navigate("/")}>← Back</button>
                <h2>Login</h2>

                <form onSubmit={handleLogin}>
                    <label>Email address</label>
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

                    <div className="remember">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Log in"}
                    </button>

                    <p className="switch">
                        Don’t have an account? <a href="/signup">Sign up here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;