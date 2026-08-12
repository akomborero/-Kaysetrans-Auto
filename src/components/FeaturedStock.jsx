import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const FEATURED_CARS = [
  {
    id: 1,
    title: 'MAZDA CX5',
    price: '$9,500',
    year: '2016',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 2,
    title: 'TOYOTA AXIO',
    price: '$7,500',
    year: '2011',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    title: 'HONDA FIT 10TH',
    price: '$4,500',
    year: '2012',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 4,
    title: 'TOYOTA COROLLA',
    price: '$4,900',
    year: '2004',
    image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 5,
    title: 'TOYOTA ALION',
    price: '$6,800',
    year: '2006',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 6,
    title: 'VITZ',
    price: '$4,500',
    year: '2010',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 7,
    title: 'NISSAN ADVAN',
    price: '$4,500',
    year: '2013',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 8,
    title: 'TOYOTA RACTIS',
    price: '$3,800',
    year: '2009',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'
  }
];

export default function FeaturedStock({ isAdmin = false }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://smart-ar-backend.onrender.com/api/cars')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Map real backend database fields to component structure
          const formattedCars = data.map((car) => {
            const primaryImg =
              car.images?.[0] ||
              car.car_images?.find((img) => img.is_primary)?.image_url ||
              car.car_images?.[0]?.image_url ||
              'https://images.unsplash.com/photo-1590362891991-f776e747a588';

            return {
              id: car.id,
              title: `${car.make || ''} ${car.model || ''}`.trim() || 'UNTITLED CAR',
              price: car.price ? `$${Number(car.price).toLocaleString()}` : '$0',
              year: car.year && car.year !== 0 && car.year !== '0' ? car.year : 'N/A',
              image: primaryImg,
            };
          });
          setCars(formattedCars);
        } else {
          // Fallback if API returns an empty array
          setCars(FEATURED_CARS);
        }
      })
      .catch((err) => {
        console.error('Error fetching cars:', err);
        setCars(FEATURED_CARS); // Fallback on network/fetch error
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
            <button className="bg-white text-black border-2 border-black font-extrabold text-xs uppercase tracking-wider py-3.5 px-6 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer">
              VIEW ALL CARS
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="w-full py-20 flex items-center justify-center text-gray-500 font-bold text-xs uppercase tracking-widest gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-black" />
            Loading stock inventory...
          </div>
        ) : cars.length === 0 ? (
          /* Empty State Fallback */
          <div className="w-full border-2 border-dashed border-gray-300 rounded-3xl py-16 text-center text-gray-500 font-bold text-sm">
            Our showroom is currently empty. Check back soon!
          </div>
        ) : (
          /* Car Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cars.map((car) => (
              <div key={car.id} className="group flex flex-col justify-between">
                
                {/* Image & Year Badge */}
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-100 mb-3">
                  <img 
                    src={car.image} 
                    alt={car.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {car.year && car.year !== 'N/A' && (
                    <span className="absolute top-2 left-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {car.year}
                    </span>
                  )}
                </div>

                {/* Info Text */}
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-tight text-black truncate">
                    {car.title}
                  </h3>
                  <div className="text-base font-black text-black mt-0.5">
                    {car.price}
                  </div>
                  <a 
                    href={`#car-${car.id}`} 
                    className="inline-block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mt-1 hover:text-black transition-colors"
                  >
                    VIEW DETAILS &rarr;
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}