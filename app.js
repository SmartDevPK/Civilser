import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VerifyEmail from './pages/VerifyEmail';
import Registration from './pages/Registration';
import Login from './pages/Login';
import CheckEmail from './pages/CheckEmail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/login" element={<Login />} />
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;