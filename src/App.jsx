import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import CarsForSale from './components/pages/CarsForSale';
import CarDetails from './components/pages/CarDetails';
import AboutUs from './components/pages/AboutUs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<CarsForSale />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}