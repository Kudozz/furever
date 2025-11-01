import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Welcome.css"; // Create this CSS for styling

const Welcome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to dashboard after 3 seconds
        const timer = setTimeout(() => {
            navigate("/home");
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="welcome-screen">
            {/* Optional: Add a welcome message or logo */}
            <h1>Welcome to FurEver! 🐾</h1>
        </div>
    );
};

export default Welcome;