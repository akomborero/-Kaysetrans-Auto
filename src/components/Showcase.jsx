import { useState } from 'react';
import { ArrowUpRight, Gauge, Fuel, Calendar, ShieldCheck } from 'lucide-react';

// Sample dataset organized by quick-filter categories
const VEHICLE_DATA = [
  {
    id: 1,
    title: 'Porsche 911 GT3 RS',
    category: 'NEW CARS',
    price: '$245,000',
    year: '2024',
    mileage: '1,200 km',
    fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
    tag: 'Popular'
  },
  {
    id: 2,
    title: 'Mercedes-AMG G63',
    category: 'PRE-OWNED CARS',
    price: '$189,000',
    year: '2023',
    mileage: '14,500 km',
    fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&q=80&w=800',
    tag: 'Certified'
  },
  {
    id: 3,
    title: 'Audi RS e-tron GT',
    category: 'FUEL EFFICIENT',
    price: '$104,000',
    year: '2023',
    mileage: '8,100 km',
    fuel: 'Electric',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
    tag: 'Eco Luxury'
  },
  {
    id: 4,
    title: 'BMW M4 Competition',
    category: 'RECENTLY ADDED',
    price: '$79,500',
    year: '2022',
    mileage: '22,000 km',
    fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
    tag: 'Just Arrived'
  },
  {
    id: 5,
    title: 'Toyota RAV4 Hybrid',
    category: 'CHEAP CARS',
    price: '$28,900',
    year: '2021',
    mileage: '45,000 km',
    fuel: 'Hybrid',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800',
    tag: 'Best Value'
  }
];

const CATEGORIES = [
  'ALL VEHICLES',
  'NEW CARS',
  'PRE-OWNED CARS',
  'RECENTLY ADDED',
  'FUEL EFFICIENT',
  'CHEAP CARS'
];

export default function Showcase() {
  const [activeTab, setActiveTab] = useState('ALL VEHICLES');

  // Filter cars dynamically based on selected pill tab
  const displayedCars = activeTab === 'ALL VEHICLES' 
    ? VEHICLE_DATA 
    : VEHICLE_DATA.filter(car => car.category === activeTab);

  return (
    <section className="bg-black text-white py-20 px-8 relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2 block">
              Curated Inventory
            </span>
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight">
              FIND YOUR <span className="text-gray-400 font-normal not-italic">PERFECT MATCH</span>
            </h2>
          </div>
          <p className="text-gray-400 text-xs max-w-xs leading-relaxed">
            Browse through our premium selection tailored for luxury, performance, and everyday efficiency.
          </p>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex items-center gap-3 overflow-x-auto pb-6 scrollbar-none mb-10 border-b border-white/10">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === category
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105'
                  : 'bg-neutral-900/80 text-gray-400 border border-white/10 hover:border-white/40 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCars.map((car) => (
            <div
              key={car.id}
              className="group bg-neutral-900/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-white/30 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Image & Badge Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-950">
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
                
                {/* Status Tag */}
                <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-blue-400" />
                  {car.tag}
                </span>

                {/* Price Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <span className="text-2xl font-black text-white italic tracking-tight">
                    {car.price}
                  </span>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {car.title}
                  </h3>

                  {/* Specs Pill List */}
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-gray-400 border-y border-white/10 py-3 mb-6">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" />
                      <span>{car.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-gray-500" />
                      <span>{car.mileage}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-gray-500" />
                      <span>{car.fuel}</span>
                    </div>
                  </div>
                </div>

                {/* Call To Action */}
                <button className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/20 text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-between group/btn cursor-pointer">
                  <span>View Details</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}