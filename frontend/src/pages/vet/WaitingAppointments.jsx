// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
// import { useEffect, useState } from "react";
// import { Box, Heading, Text, Button, SimpleGrid, useToast } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../../components/vet/VetSidebar";
// import axios from "axios";
// import background from "../../assets/background.png";
// import { useAuth } from "../../context/AuthContext";

// const WaitingAppointments = () => {
//   const navigate = useNavigate();
//   const toast = useToast();
//   const [appointments, setAppointments] = useState([]);
//   const { user } = useAuth();
//   const vetId = user?._id;

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
