import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function FeaturedStock({ isAdmin = false }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://smart-ar-backend.onrender.com/api/cars')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch cars from backend');
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
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
              title: `${car.make || ''} ${car.model || ''}`.trim() || 'UNTITLED CAR',
              price: car.price ? `$${Number(car.price).toLocaleString()}` : '$0',
              year: car.year && car.year !== 0 && car.year !== '0' ? car.year : 'N/A',
              image: primaryImg,
            };
          });
          setCars(formattedCars);
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
  }, []);

  return (
    <section className="bg-white text-black py-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight">
            FEATURED STOCK
          </h2>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button className="bg-black text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-6 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer">
                + ADD A CAR
              </button>
            )}
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
          <div className="w-full border-2 border-dashed border-red-200 bg-red-50/50 rounded-3xl py-12 text-center text-red-600 font-bold text-sm uppercase tracking-wider">
            {error}
          </div>
        ) : cars.length === 0 ? (
          /* Empty Database State */
          <div className="w-full border-2 border-dashed border-gray-300 rounded-3xl py-16 text-center text-gray-500 font-bold text-sm uppercase tracking-wider">
            No cars found in live database.
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