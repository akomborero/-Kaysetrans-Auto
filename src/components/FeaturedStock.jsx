import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { getCachedCars, setCachedCars } from '../utils/carsCache';
import { getPrerenderData } from '../utils/prerenderData';

function formatCars(data) {
  return data.map((car) => ({
    id: car.id,
    title: `${car.make || ''} ${car.model || ''}`.trim() || 'UNTITLED CAR',
    price: car.price ? `$${Number(car.price).toLocaleString()}` : '$0',
    year: car.year && car.year !== 0 && car.year !== '0' ? car.year : 'N/A',
    image:
      car.image || car.imageUrl || car.images?.[0] ||
      car.car_images?.find((img) => img.is_primary)?.image_url ||
      car.car_images?.[0]?.image_url || '',
  }));
}

export default function FeaturedStock() {
  const prerenderCars = getPrerenderData()?.cars;
  const hasPrerenderData = Array.isArray(prerenderCars);

  const [cars, setCars] = useState(() => (hasPrerenderData ? formatCars(prerenderCars) : []));
  const [loading, setLoading] = useState(!hasPrerenderData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hasPrerenderData) {
      const cached = getCachedCars();
      if (cached) {
        setCars(formatCars(cached));
        setLoading(false);
        return;
      }
    }

    fetch('https://smart-ar-backend.onrender.com/api/cars')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch cars from backend');
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          // Normalize and cache the raw car objects similarly to other pages
          const normalized = data.map((car) => ({
            id: car.id || car._id,
            make: car.make || car.title?.split(' ')[0] || 'UNKNOWN',
            model: car.model || car.title?.split(' ').slice(1).join(' ') || 'MODEL',
            price: Number(car.price) || 0,
            year: car.year && car.year !== 0 && car.year !== '0' ? String(car.year) : 'N/A',
            mileage: car.mileage || 'N/A',
            transmission: car.transmission || 'Automatic',
            fuel: car.fuel || 'Petrol',
            image:
              car.image || car.imageUrl || car.images?.[0] || car.car_images?.find((img) => img.is_primary)?.image_url || car.car_images?.[0]?.image_url || '',
          }));

          try { setCachedCars(normalized); } catch { /* cache unavailable */ }

          setCars(formatCars(normalized));
        } else {
          setCars([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching cars:', err);
        setError('Unable to connect to live inventory.');
        setCars([]);
      })
      .finally(() => setLoading(false));
  }, [hasPrerenderData]);

  const whatsappHref = `https://wa.me/263784532889?text=${encodeURIComponent('Hello, I would like to enquire about the vehicles currently available.')}`;

  return (
    <section className="bg-white text-black py-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight">
            FEATURED STOCK
          </h2>

          <div className="flex items-center gap-3">
            <Link 
              to="/cars" 
              className="bg-white text-black border-2 border-black font-extrabold text-xs uppercase tracking-wider py-3.5 px-6 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer text-center"
            >
              VIEW ALL CARS
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="w-full py-20 flex items-center justify-center text-gray-500 font-bold text-xs uppercase tracking-widest gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-black" />
            Loading live stock inventory...
          </div>
        ) : error ? (
          /* Error State */
          <div className="w-full border-2 border-dashed border-neutral-200 rounded-3xl py-12 text-center space-y-4">
            <p className="text-neutral-600 font-bold text-sm uppercase tracking-wider">
              {error}
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
          /* Empty Inventory State */
          <div className="w-full border-2 border-dashed border-neutral-200 rounded-3xl py-16 text-center space-y-4">
            <p className="text-neutral-600 font-bold text-sm uppercase tracking-wider">
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
        ) : (
          /* Live API Cars Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cars.map((car) => (
              <Link 
                key={car.id} 
                to={`/cars/${car.id}`}
                className="group flex flex-col justify-between p-3 rounded-3xl hover:shadow-xl hover:bg-neutral-50 transition-all duration-300 border border-transparent hover:border-neutral-100"
              >
                {/* Image & Year Badge */}
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-100 mb-3">
                  {car.image ? (
                    <img 
                      src={car.image} 
                      alt={car.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xs">
                      NO IMAGE
                    </div>
                  )}

                  {car.year && car.year !== 'N/A' && (
                    <span className="absolute top-2 left-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {car.year}
                    </span>
                  )}
                </div>

                {/* Info Text */}
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm uppercase tracking-tight text-black truncate group-hover:text-purple-700 transition-colors">
                    {car.title}
                  </h3>
                  <div className="text-base font-black text-black">
                    {car.price}
                  </div>
                  <div className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-block pt-1">
                    VIEW DETAILS &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}