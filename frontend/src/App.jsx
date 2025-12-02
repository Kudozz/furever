import { Box } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";

// Customer Panel Components
import AdoptPage from "./pages/AdoptPage";
import RehomePage from "./pages/RehomePage";
import ViewAdoptedPets from "./pages/ViewAdoptedPets";
import Sidebar from "./components/CustomerSidebar";
import CustomerDash from "./pages/CustomerDash";

//Appointment pages
import BookAppointment from "./pages/customer/BookAppointment";
import CancelAppointment from "./pages/customer/CancelAppointment";
import UpcomingAppointments from "./pages/customer/UpcomingAppointments";
import ModifyAppointments from "./pages/customer/ModifyAppointments"

// Admin Panel Components
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/welcome";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Appointment from "./components/Appointments";

// Vet Panel Components
import VetDashboard from "./pages/vet/VetDashboard";
import Appointments from "./pages/vet/Appointments";
import PendingAppointments from "./pages/vet/PendingAppointments";
import PastAppointments from "./pages/vet/PastAppointments";
import WaitingAppointments from "./pages/vet/WaitingAppointments";

import Patients from "./pages/vet/Patients";
import Prescriptions from "./pages/vet/Prescriptions";
import Profile from "./pages/vet/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRemoveVet from "./pages/admin/RemoveVet";
import AddPet from "./pages/admin/AddPet";
import AddVet from "./pages/admin/AddVet";
import ViewVets from "./pages/admin/ViewVets";

// Customer Layout Wrapper
function CustomerLayout({ children }) {
  return (
    <Box
      minH="100vh"
      display="flex"
      bgImage="url('/bg.png')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Sidebar />
      <Box flex="1" ml="230px" p={6}>
        {children}
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Routes>
      {/* Redirect root to customer home */}
      <Route path="/" element={<Navigate to="/customer-home" />} />

      {/* Auth Routes (no sidebar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/welcome" element={<Welcome />} />

      {/* Admin Routes (no sidebar) */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/pets/add" element={<AddPet />} />
      <Route path="/admin/vets/add" element={<AddVet />} />
      <Route path = "/admin/vets/view" element={<ViewVets/>}/>
      <Route path="/admin/vets/remove" element={<AdminRemoveVet/>}/>

      {/* Vet Routes (no sidebar for now) */}
      <Route path="/vet-home" element={<VetDashboard />} />
      <Route path="/appointments/view" element={<Appointments />} />
      <Route path="/appointments/pending" element={<PendingAppointments />} />
      <Route path="/appointments/past" element={<PastAppointments />} />
      <Route path="/appointments/approve" element={<WaitingAppointments />} />
      <Route path="/appointments/waiting" element={<WaitingAppointments />} />


      {/* Customer Routes (with sidebar) */}
      <Route path="/customer-home" element={<CustomerLayout><CustomerDash /></CustomerLayout>} />
      <Route path="/adopt" element={<CustomerLayout><AdoptPage /></CustomerLayout>} />
      <Route path="/adopted-pets" element={<CustomerLayout><ViewAdoptedPets /></CustomerLayout>} />
      <Route path="/rehome" element={<CustomerLayout><RehomePage /></CustomerLayout>} />
      <Route path="/book-appt" element={<CustomerLayout><BookAppointment /></CustomerLayout>} />
        <Route path="/cancel-appt" element={<CustomerLayout><CancelAppointment /> </CustomerLayout>} />
        <Route path="/upcoming-appt" element={<CustomerLayout><UpcomingAppointments /> </CustomerLayout>} />
        <Route path="/modify-appt" element ={<CustomerLayout> <ModifyAppointments/></CustomerLayout>}></Route>



    {/* unimplemented */}
{/* 
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/prescriptions" element={<Prescriptions />} />
      <Route path="/profile" element={<Profile />} /> */}

{/* extra */}

  {/* this one has good search/filter, see later */}
      {/* <Route path="/home" element={<Home />} /> */}

      {/* <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/appointment" element={<Appointment />} /> */}
    </Routes>
  );
}

export default App;