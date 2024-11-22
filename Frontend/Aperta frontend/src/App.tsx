import { Outlet } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from './Redux/authSlice';
import { checkTokenExpiration } from './utils/checkTokenExpiration';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const isTokenExpired = checkTokenExpiration(token);
      if (isTokenExpired) {
        dispatch(logout());
        navigate("/");
      }
    }
  }, [dispatch, navigate]);
  

  return (
    <section className="main-container">
      <Navbar />
      <div className="outlet-container">
        <Outlet />
      </div>
      <Footer />
    </section>
  )
}

export default App
