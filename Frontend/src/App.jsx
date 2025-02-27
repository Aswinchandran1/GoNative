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
import ViewDetail from './Pages/ViewDetail';
import Favourites from './Pages/Favourites';
import HostDashboard from './HostPages/HostDashboard';
import HostHome from './HostPages/HostHome';
import AddDate from './HostPages/AddDate';
import HostProfile from './HostPages/HostProfile';
import ViewBookings from './HostPages/ViewBookings';
import ManageExperience from './HostPages/ManageExperience';
import EditExperience from './HostComponents/EditExperience';
import EditHostProfile from './HostComponents/EditHostProfile';
import AdminHome from './AdminPages/AdminHome';
import AdminDashboard from './AdminPages/AdminDashboard';
import HostReq from './AdminPages/HostReq';
import ViewUsers from './AdminPages/ViewUsers';
import ViewHosts from './AdminPages/ViewHosts';
import UserResponse from './AdminPages/UserResponse';

function App() {
  const location = useLocation();

  // Pages where Header & Footer should be hidden
  const hideHeaderFooterRoutes = ['/login', '/host-login', '/user-register', '/host-register',];

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
        <Route path="/explore" element={<Explore />} />
        <Route path='/view-detail' element={<ViewDetail />} />
        <Route path='/favourites' element={<Favourites />} />

        <Route path='/host' element={<HostHome />}>
          <Route index element={<HostDashboard />} />
          <Route path='add-date' element={<AddDate />} />
          <Route path='host-profile' element={<HostProfile />} />
          <Route path='view-booking' element={<ViewBookings />} />
          <Route path='manage-experience' element={<ManageExperience />} />
          <Route path="edit-experience/:id" element={<EditExperience />} />
          <Route path="edit-host-profile/:id" element={<EditHostProfile />} />
        </Route>


        <Route path='/admin' element={<AdminHome />}>
          <Route index element={<AdminDashboard />} />
          <Route path='host-requests' element={<HostReq />} />
          <Route path='view-users' element={<ViewUsers />} />
          <Route path='view-hosts' element={<ViewHosts />} />
          <Route path='user-responses' element={<UserResponse />} />
        </Route>

      </Routes>
      {/* Conditionally render Footer */}
      {!hideHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
