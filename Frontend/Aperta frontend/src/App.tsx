import { Outlet } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  

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
