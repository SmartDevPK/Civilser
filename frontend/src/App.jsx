// import { useState } from "react";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import BoothServiceRegister from "./pages/BoothServiceRegister";
import Committee from "./pages/Committee";
import Donations from "./pages/Donations";
import Faq from "./pages/Faq";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Register from "./pages/Register";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import WelcomeSection from "./pages/WelcomeSection";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <BrowserRouter>
      <Navbar />

      <div className="pt-[100px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faqs" element={<Faq />} />
          <Route path="/donate" element={<Donations />} />
          <Route path="/contact" element={<Map />} />
          <Route path="/welcome" element={<WelcomeSection />} />
          <Route path="/login" element={<Login />} />
          
          
          <Route
            path="/registrationsuccess"
            element={<RegistrationSuccess />}
          />
          <Route path="/committee" element={<Committee />} />
          <Route
            path="/boothserviceregister"
            element={<BoothServiceRegister />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
