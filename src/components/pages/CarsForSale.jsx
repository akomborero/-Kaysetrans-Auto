import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Seo from '../Seo';
import { getCachedCars, setCachedCars, clearCachedCars } from '../../utils/carsCache';

export default function CarsForSale() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState('All');
  const [maxPrice, setMaxPrice] = useState('50000');

  useEffect(() => {
    const cached = getCachedCars();
    if (cached) {
      setCars(cached);
      setLoading(false);
      return; // use cache, skip fetch
    }

    fetch('https://smart-ar-backend.onrender.com/api/cars')
      .then((res) => {
        if (!res.ok) throw new Error('Inventory request failed');
        return res.json();
      })
      .then((data) => {
        setApiError('');

        if (Array.isArray(data) && data.length > 0) {
          const formattedCars = data.map((car) => {
            const primaryImg =
              car.image ||
              car.imageUrl ||
              car.images?.[0] ||
              car.car_images?.find((img) => img.is_primary)?.image_url ||
              car.car_images?.[0]?.image_url ||
              '';

            return {
              id: car.id || car._id,
              make: car.make || car.title?.split(' ')[0] || 'UNKNOWN',
              model: car.model || car.title?.split(' ').slice(1).join(' ') || 'MODEL',
              price: Number(car.price) || 0,
              year: car.year && car.year !== 0 && car.year !== '0' ? String(car.year) : 'N/A',
              mileage: car.mileage || 'N/A',
              transmission: car.transmission || 'Automatic',
              fuel: car.fuel || 'Petrol',
              image: primaryImg,
            };
          });
          setCars(formattedCars);
          setCachedCars(formattedCars);
        } else {
          setCars([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching cars:', err);
        setApiError('We could not load the current inventory. Please try again or contact us directly.');
        setCars([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const availableMakes = ['All', ...new Set(cars.map((car) => car.make))].filter(Boolean);
  const whatsappHref = `https://wa.me/263784532889?text=${encodeURIComponent('Hello, I would like to enquire about the vehicles currently available.')}`;

  const filteredCars = cars.filter((car) => {
    const fullTitle = `${car.make} ${car.model}`.toLowerCase();
    const matchesSearch = fullTitle.includes(searchQuery.toLowerCase());
    const matchesMake = selectedMake === 'All' || car.make.toLowerCase() === selectedMake.toLowerCase();
    const matchesPrice = car.price <= Number(maxPrice);

    return matchesSearch && matchesMake && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-white text-black py-10 px-6 md:px-12 font-sans">
      <Seo title="Cars For Sale — Kaysetrans Auto" description="Explore our current inventory of quality pre-owned vehicles. Browse by make, model, price and more." url="/cars" />
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Breadcrumb Banner */}
        <div className="space-y-2 border-b border-neutral-100 pb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
            KAYSETRANS AUTO / INVENTORY
          </span>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tight">
            CARS FOR SALE
          </h1>
        </div>

        {/* Main Grid: Sidebar Filters & Car Listing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Filter Panel */}
          <div className="lg:col-span-3 bg-neutral-50 border border-neutral-100 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-wider text-black">FILTER</h2>
              <button 
                onClick={() => { 
                  setSearchQuery(''); setSelectedMake('All'); setMaxPrice('50000'); setApiError('');
                  clearCachedCars();
                }}
                className="text-[10px] font-bold text-purple-700 hover:underline cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Search Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400">SEARCH</label>
              <input
                type="text"
                placeholder="Search make or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-black"
              />
            </div>

            {/* Make Filter Dropdown */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400">MAKE</label>
              <select
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-xs font-extrabold focus:outline-none focus:border-black"
              >
                {availableMakes.map((make) => (
                  <option key={make} value={make}>
                    {make === 'All' ? 'All Makes' : make}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400">MAX PRICE</label>
                <span className="text-xs font-black text-purple-700">${Number(maxPrice).toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full accent-purple-700 cursor-pointer"
              />
            </div>
          </div>

          {/* Cars Gallery */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black italic uppercase tracking-tight">FEATURED STOCK</h2>
              <span className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest">
                {filteredCars.length} VEHICLES AVAILABLE
              </span>
            </div>

            {loading ? (
              <div className="border border-dashed border-neutral-200 rounded-3xl p-16 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-6 h-6 animate-spin text-purple-700" />
                <p className="text-xs font-black uppercase tracking-widest text-neutral-400">
                  Loading Live Showroom Inventory...
                </p>
              </div>
            ) : apiError ? (
              <div className="border border-dashed border-neutral-200 rounded-3xl p-16 text-center space-y-4">
                <p className="text-sm font-black text-neutral-600 uppercase tracking-wider">
                  {apiError}
                </p>
                <p className="text-xs text-neutral-400 font-medium">
                  You can contact our team directly to ask about available vehicles.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-neutral-800 transition-colors"
                >
                  CHAT ON WHATSAPP
                </a>
              </div>
            ) : cars.length === 0 ? (
              <div className="border border-dashed border-neutral-200 rounded-3xl p-16 text-center space-y-4">
                <p className="text-sm font-black text-neutral-600 uppercase tracking-wider">
                  No vehicles are currently available.
                </p>
                <p className="text-xs text-neutral-400 font-medium">
                  Please contact our team to ask about upcoming stock or a specific vehicle.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-neutral-800 transition-colors"
                >
                  CHAT ON WHATSAPP
                </a>
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="border border-dashed border-neutral-200 rounded-3xl p-16 text-center space-y-3">
                <p className="text-sm font-black text-neutral-400 uppercase tracking-wider">
                  No vehicles match your current filters.
                </p>
                <p className="text-xs text-neutral-400 font-medium">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <Link
                    key={car.id}
                    to={`/cars/${car.id}`}
                    className="group bg-white border border-neutral-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview Container */}
                      <div className="aspect-4/3 relative bg-neutral-100 overflow-hidden">
                        {car.image ? (
                          <img
                            src={car.image}
                            alt={`${car.make} ${car.model}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-400 font-bold text-xs">
                            NO IMAGE
                          </div>
                        )}
                        {car.year && car.year !== 'N/A' && (
                          <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                            {car.year}
                          </span>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-5 space-y-4">
                        <div>
                          <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">
                            {car.make}
                          </span>
                          <h3 className="text-lg font-black italic uppercase tracking-tight text-black group-hover:text-purple-700 transition-colors">
                            {car.model}
                          </h3>
                        </div>

                        {/* Specs Strip */}
                        <div className="flex items-center gap-2 text-[10px] font-extrabold text-neutral-500 uppercase tracking-wider bg-neutral-50 rounded-xl p-2.5">
                          <span>{car.mileage}</span>
                          <span>•</span>
                          <span>{car.transmission}</span>
                          <span>•</span>
                          <span>{car.fuel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Action Footer */}
                    <div className="p-5 pt-0 flex items-center justify-between border-t border-neutral-50 mt-2">
                      <div>
                        <span className="text-[9px] font-black uppercase text-neutral-400 block tracking-widest">PRICE</span>
                        <span className="text-xl font-black italic tracking-tight text-black">
                          ${car.price.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider text-purple-700 group-hover:translate-x-1 transition-transform">
                        VIEW DETAILS &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}