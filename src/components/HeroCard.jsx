import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroCard() {
  const [cars, setCars] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Form states for fallback view
  const [condition, setCondition] = useState('');
  const [category, setCategory] = useState('');

  // Fetch cars from API
  useEffect(() => {
    fetch('https://smart-ar-backend.onrender.com/api/cars')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCars(data);
        }
      })
      .catch((err) => console.error('Error fetching cars:', err))
      .finally(() => setLoading(false));
  }, []);

  // Auto-slide effect every 4 seconds
  useEffect(() => {
    if (cars.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [cars.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cars.length) % cars.length);
  };

  // Helper to extract image URL safely
  const getCarImage = (car) => {
    if (car.images && car.images.length > 0) {
      return car.images[0];
    }
    if (car.car_images && car.car_images.length > 0) {
      return (
        car.car_images.find((img) => img.is_primary)?.image_url ||
        car.car_images[0]?.image_url
      );
    }
    return 'https://images.unsplash.com/photo-1590362891991-f776e747a588';
  };

  // IF CARS EXIST: Render Full Screen Auto Carousel
  if (!loading && cars.length > 0) {
    const activeCar = cars[currentIndex];

    return (
      <div className="relative w-full h-screen bg-black text-white overflow-hidden">
        {/* Full Screen Background Slides */}
        {cars.map((car, idx) => {
          const imgUrl = getCarImage(car);
          return (
            <div
              key={car.id || idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
            >
              <img
                src={imgUrl}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
            </div>
          );
        })}

        {/* Hero Overlay Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between py-12 md:py-16">
          
          {/* Top Badge */}
          <div className="pt-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              JUST ARRIVED ({currentIndex + 1} / {cars.length})
            </span>
          </div>

          {/* Vehicle Title & Info */}
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight italic leading-none drop-shadow-md">
              {activeCar.make}{' '}
              <span className="text-neutral-300 font-extrabold">{activeCar.model}</span>
            </h1>

            <p className="text-xl md:text-3xl font-bold tracking-wider text-neutral-300 flex items-center gap-3">
              <span>{activeCar.year || 2024} EDITION</span>
              <span className="text-red-600">•</span>
              <span className="text-white font-black">${activeCar.price?.toLocaleString()}</span>
            </p>

            {activeCar.description && (
              <p className="text-xs md:text-sm text-neutral-400 font-semibold line-clamp-2 max-w-lg">
                {activeCar.description}
              </p>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 bg-white text-black font-black text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-all shadow-xl cursor-pointer">
                VIEW DETAILS
              </button>
              <button className="px-8 py-4 bg-black/40 backdrop-blur-md border border-white/30 text-white font-black text-xs uppercase tracking-wider rounded-full hover:bg-white/10 transition-all cursor-pointer">
                BROWSE INVENTORY
              </button>
            </div>
          </div>

          {/* Pagination Indicators & Controls */}
          <div className="flex items-center justify-between w-full pt-6">
            <div className="flex items-center gap-2">
              {cars.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-10 bg-red-600' : 'w-2 bg-white/40 hover:bg-white'
                  }`}
                />
              ))}
            </div>

            {cars.length > 1 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  className="p-3.5 rounded-full bg-black/50 border border-white/20 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3.5 rounded-full bg-black/50 border border-white/20 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }

  // FALLBACK VIEW: Display standard Search Card when no database cars exist
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-sm p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.15)] flex flex-col justify-between text-white">
        <div>
          <span className="text-[10px] tracking-widest text-gray-400 uppercase font-bold block mb-4">
            KAYSETRANS AUTO
          </span>

          <h1 className="text-3xl font-black uppercase tracking-tight italic leading-none mb-4">
            ELEVATE <br /> YOUR <br /> DRIVING
          </h1>

          <div className="w-8 h-0.5 bg-white mb-6" />

          <p className="text-xs text-gray-300 leading-relaxed mb-8">
            Experience luxury redefined. Explore our curated collection of high-performance vehicles.
          </p>

          <div className="space-y-4 mb-8">
            <div className="border-b border-gray-700 pb-2">
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-transparent text-xs font-bold uppercase tracking-wider text-gray-300 focus:outline-none cursor-pointer"
              >
                <option value="" disabled className="bg-neutral-900 text-gray-400">
                  CONDITION
                </option>
                <option value="new" className="bg-neutral-900 text-white">
                  Brand New
                </option>
                <option value="used" className="bg-neutral-900 text-white">
                  Pre-Owned
                </option>
              </select>
            </div>

            <div className="border-b border-gray-700 pb-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent text-xs font-bold uppercase tracking-wider text-gray-300 focus:outline-none cursor-pointer"
              >
                <option value="" disabled className="bg-neutral-900 text-gray-400">
                  CATEGORY
                </option>
                <option value="suv" className="bg-neutral-900 text-white">
                  Luxury SUV
                </option>
                <option value="sports" className="bg-neutral-900 text-white">
                  Sports Car
                </option>
                <option value="sedan" className="bg-neutral-900 text-white">
                  Executive Sedan
                </option>
              </select>
            </div>
          </div>
        </div>

        <button className="w-full py-3.5 px-4 rounded-xl border border-white/30 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-between group cursor-pointer">
          <span className="text-xs font-bold uppercase tracking-wider">Find Your Dream Car</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}