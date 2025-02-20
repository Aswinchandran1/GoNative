import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import HostLogin from './HostPages/HostLogin';
import HostRegister from './HostPages/HostRegister';
import UserRegister from './Pages/UserRegister';
import Explore from './Pages/Explore';
import ViewDetail from './Components/ViewDetail';

function App() {
  const location = useLocation();

  // Pages where Header & Footer should be hidden
  const hideHeaderFooterRoutes = ['/login', '/host-login', '/user-register', '/host-register'];

  return (
    <>
      {/* Conditionally render Header */}
      {!hideHeaderFooterRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/host-login" element={<HostLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/host-register" element={<HostRegister />} />
        <Route path="/explore" element={<Explore/>} />
        <Route path='/view-detail' element={<ViewDetail/>}/>
      </Routes>
      {/* Conditionally render Footer */}
      {!hideHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
