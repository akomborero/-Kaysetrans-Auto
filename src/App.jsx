import { useState, useEffect } from 'react';
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

  // Load actual user session from storage on mount & on auth changes
  const loadUserFromStorage = () => {
    const storedUser = localStorage.getItem('adminUser') || localStorage.getItem('user');
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token');

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Failed to parse user session:', err);
        handleLogout();
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    loadUserFromStorage();

    // Event listener to synchronize auth changes instantly across components
    const handleAuthChange = () => {
      loadUserFromStorage();
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  // Updated handleLogin accepts the logged-in user object passed from AdminLoginModal
  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('token');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    window.dispatchEvent(new Event('authChange'));
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