import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import ProjectDetails from './Components/ProjectDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProjectList from './Components/ProjectList';
import Index from './Components/Index';
import Product from './Components/Product';
import Login from './Components/Login';
import Registration from './Components/Registration';
import { MycontextProviders, MyContext } from './MycontextProviders';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOut from './Components/CheckOut';
import { useContext, useEffect, useState } from 'react';

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const hideNavbarRoutes = ['/checkOut'];
  const shouldHideNavbar = hideNavbarRoutes.includes(window.location.pathname);

  useEffect(() => {
    setShowNavbar(!shouldHideNavbar);
  }, [shouldHideNavbar]);

  return (
    <div className="App">
      <MycontextProviders>
        <BrowserRouter>
          {showNavbar && <Navbar />} {/* Conditionally render the navbar */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/projectDetails" element={<ProjectDetails />} />
            <Route path="/ProjectList" element={<ProjectList />} />
            <Route path="/checkOut" element={<CheckOut setShowNavbar={setShowNavbar} />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          style={{ marginTop: "auto", marginBottom: "auto" }}
        />
      </MycontextProviders>
    </div>
  );
}

export default App;
