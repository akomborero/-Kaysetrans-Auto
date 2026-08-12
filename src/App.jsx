import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import CarsForSale from './components/pages/CarsForSale';
import CarDetails from './components/pages/CarDetails';
import AboutUs from './components/pages/AboutUs';
import NewsAndVideos from './components/pages/NewsAndVideos';
import SellYourCar from './components/pages/SellYourCar';
import ManageInventory from './components/pages/ManageInventory';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUser({ email: 'tinotendakatsande' });
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
      />

      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<CarsForSale />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/news" element={<NewsAndVideos />} />
          <Route path="/sell" element={<SellYourCar />} />
          
          {/* Admin Protected Route */}
          <Route 
            path="/admin/inventory" 
            element={
              isAuthenticated ? (
                <ManageInventory />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}