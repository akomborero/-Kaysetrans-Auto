import { useState } from 'react';
import { Link } from 'react-router-dom';

const INVENTORY_DATA = [
  {
    id: '35e45de9-7bde-425f-8fa7-f6956515d584',
    year: '2016',
    make: 'Mazda',
    model: 'CX5',
    price: 9500,
    mileage: '85,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    year: '2018',
    make: 'Toyota',
    model: 'Fortuner 2.8 GD-6',
    price: 28500,
    mileage: '62,000 km',
    transmission: 'Automatic',
    fuel: 'Diesel',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: 'f9e8d7c6-b5a4-3f2e-1d0c-9b8a7f6e5d4c',
    year: '2019',
    make: 'Mercedes-Benz',
    model: 'C200 AMG Line',
    price: 24000,
    mileage: '45,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    featured: false
  },
  {
    id: '7a6b5c4d-3e2f-1a0b-9c8d-7e6f5a4b3c2d',
    year: '2017',
    make: 'Honda',
    model: 'CR-V Executive',
    price: 14200,
    mileage: '78,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800',
    featured: false
  },
  {
    id: '8d7c6b5a-4f3e-2d1c-0b9a-8f7e6d5c4b3a',
    year: '2020',
    make: 'BMW',
    model: '320i M Sport',
    price: 29900,
    mileage: '38,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: '9e8d7c6b-5a4f-3e2d-1c0b-9a8f7e6d5c4b',
    year: '2015',
    make: 'Volkswagen',
    model: 'Golf 7 GTI',
    price: 12800,
    mileage: '92,000 km',
    transmission: 'DSG',
    fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1541348263662-e082662d82da?auto=format&fit=crop&q=80&w=800',
    featured: false
  }
];

export default function CarsForSale() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState('All');
  const [maxPrice, setMaxPrice] = useState('30000');

  const filteredCars = INVENTORY_DATA.filter((car) => {
    const matchesSearch = `${car.make} ${car.model}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMake = selectedMake === 'All' || car.make === selectedMake;
    const matchesPrice = car.price <= Number(maxPrice);

    return matchesSearch && matchesMake && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-white text-black py-10 px-6 md:px-12">
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
                onClick={() => { setSearchQuery(''); setSelectedMake('All'); setMaxPrice('30000'); }}
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
                <option value="All">All Makes</option>
                <option value="Mazda">Mazda</option>
                <option value="Toyota">Toyota</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="BMW">BMW</option>
                <option value="Honda">Honda</option>
                <option value="Volkswagen">Volkswagen</option>
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
                min="5000"
                max="30000"
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

            {filteredCars.length === 0 ? (
              <div className="border border-dashed border-neutral-200 rounded-3xl p-16 text-center space-y-3">
                <p className="text-sm font-black text-neutral-400 uppercase tracking-wider">
                  Our showroom has no vehicles matching your criteria.
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
                        <img
                          src={car.image}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                          {car.year}
                        </span>
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