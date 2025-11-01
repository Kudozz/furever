import { Box, useColorModeValue } from "@chakra-ui/react";
import {Route, Routes} from "react-router-dom";
import AdoptPage from "./pages/AdoptPage";
import RehomePage from "./pages/RehomePage";
import Sidebar from "./components/Sidebar";
import CustomerDash from "./pages/CustomerDash";
import Theme from "./components/Theme";

function App() {
  return (
    <Box minH={"100vh"} display="flex"
      bgImage="url('/bg.png')" // 👈 your image path
      bgSize="cover"            // make sure it covers full area
      bgPosition="center"
      bgRepeat="no-repeat">
       {/* Sidebar (always visible) */}
      <Sidebar />

      {/* Main content shifted to the right */}
      <Box flex="1" ml="230px" p={6}>
        <Routes>
           <Route path="/" element={<CustomerDash/>}/>
          <Route path="/adopt" element={<AdoptPage/>}/>
         <Route path="/rehome" element={<RehomePage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
