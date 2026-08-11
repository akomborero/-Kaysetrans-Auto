import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import CarDetails from './components/pages/CarDetails';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars/:id" element={<CarDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}