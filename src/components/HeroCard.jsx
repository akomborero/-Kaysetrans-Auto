import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroCard() {
  const [cars, setCars] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Form states for fallback view
  const [condition, setCondition] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetch('https://smart-ar-backend.onrender.com/api/cars')
      ? fetch('https://smart-ar-backend.onrender.com/api/cars')
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
              setCars(data);
            }
          })
          .catch((err) => console.error('Error fetching cars:', err))
          .finally(() => setLoading(false))
      : setLoading(false);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cars.length) % cars.length);
  };

  // IF CARS EXIST IN DATABASE: Display Hero Carousel matching reference design
  if (!loading && cars.length > 0) {
    const activeCar = cars[currentIndex];
    const primaryImg =
      activeCar.car_images?.find((img) => img.is_primary)?.image_url ||
      activeCar.car_images?.[0]?.image_url ||
      'https://images.unsplash.com/photo-1590362891991-f776e747a588';

    return (
      <div className="relative w-full h-[85vh] min-h-[550px] bg-black text-white overflow-hidden rounded-3xl">
        {/* Carousel Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out scale-105"
          style={{ backgroundImage: `url(${primaryImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-8 flex flex-col justify-between py-12">
          {/* Badge */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              JUST ARRIVED
            </span>
          </div>

          {/* Vehicle Title & Info */}
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight italic leading-none drop-shadow-md">
              {activeCar.make} <span className="text-gray-300 font-bold">{activeCar.model}</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold tracking-wider text-neutral-300">
              {activeCar.year} EDITION <span className="mx-2 text-red-500">•</span>{' '}
              <span className="text-white font-black">${activeCar.price?.toLocaleString()}</span>
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-3.5 bg-white text-black font-black text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-all shadow-xl cursor-pointer">
                VIEW DETAILS
              </button>
              <button className="px-8 py-3.5 bg-black/40 backdrop-blur-md border border-white/30 text-white font-black text-xs uppercase tracking-wider rounded-full hover:bg-white/10 transition-all cursor-pointer">
                BROWSE INVENTORY
              </button>
            </div>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-2 pt-6">
            {cars.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Arrow Controllers */}
          {cars.length > 1 && (
            <div className="absolute right-8 bottom-12 flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-black/40 border border-white/20 text-white hover:bg-white hover:text-black transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-black/40 border border-white/20 text-white hover:bg-white hover:text-black transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // FALLBACK VIEW: Display standard Search Card when no database cars exist
  return (
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

      <button className="w-full py-3.5 px-4 rounded-xl border border-white/30 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-between group">
        <span className="text-xs font-bold uppercase tracking-wider">Find Your Dream Car</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}