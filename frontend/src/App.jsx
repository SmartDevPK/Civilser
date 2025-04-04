import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages imports organized alphabetically
import About from "./pages/About";
import BoothServiceRegister from "./pages/BoothServiceRegister";
import Committee from "./pages/Committee";
import Donations from "./pages/Donations";
import Faq from "./pages/Faq";
// import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Register from "./pages/Register";
import RegistrationSuccess from "./pages/RegistrationSuccess";
// import ResetPassword from "./pages/ResetPassword";
import WelcomeSection from "./pages/WelcomeSection";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <div className="pt-[100px]">
        <Routes>
          {/* Alphabetical order for better maintainability */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/boothserviceregister" element={<BoothServiceRegister />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/contact" element={<Map />} />
          <Route path="/donate" element={<Donations />} />
          <Route path="/faqs" element={<Faq />} />
          {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registrationsuccess" element={<RegistrationSuccess />} />
          {/* <Route path="/resetpassword/:resetToken" element={<ResetPassword />} /> */}
          <Route path="/welcome" element={<WelcomeSection />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;