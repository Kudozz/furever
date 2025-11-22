import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UpcomingAppointments.css"; // <-- add this line

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?._id;

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`/api/appointments/${userId}`);

      setAppointments(res.data);
    } catch (error) {
      console.error("API ERROR:", error.response?.data || error.message);
      alert("Failed to load appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="appointments-container">
      <h2 className="title">My Appointments</h2>

      <table className="appt-table">
        <thead>
          <tr>
            <th>Pet</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a._id}>
              <td>{a.petName}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>
              <td>{a.reason}</td>
              <td>
                <span className={`status-badge ${a.status}`}>
                  {a.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingAppointments;
