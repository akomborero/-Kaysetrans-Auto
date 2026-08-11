import { useState } from 'react';
import { 
  LayoutDashboard, Plus, Trash2, UserPlus, 
  ShieldCheck, Car, Database 
} from 'lucide-react';
import AddAdminModal from '../AddAdminModal';

const INITIAL_FLEET = [
  {
    id: '1',
    makeModel: '2020 Mazda CX-5 Luxury',
    year: '2020',
    price: '$16,500',
    mileage: '42,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
  },
  {
    id: '2',
    makeModel: '2019 Toyota Fortuner 2.8 GD-6',
    year: '2019',
    price: '$32,000',
    mileage: '68,000 km',
    transmission: 'Automatic',
    fuel: 'Diesel',
  }
];

export default function ManageInventory() {
  const [fleet, setFleet] = useState(INITIAL_FLEET);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const [form, setForm] = useState({
    makeModel: '',
    price: '',
    year: '',
    mileage: '',
    transmission: 'Automatic',
    fuel: 'Petrol',
    description: '',
  });

  const handleCreateListing = (e) => {
    e.preventDefault();
    if (!form.makeModel || !form.price) return;

    setFleet([
      { id: Date.now().toString(), ...form, price: `$${form.price}` },
      ...fleet
    ]);
    
    setForm({ makeModel: '', price: '', year: '', mileage: '', transmission: 'Automatic', fuel: 'Petrol', description: '' });
  };

  const handleWipeAll = () => {
    if (window.confirm('Are you sure you want to wipe all vehicle listings?')) {
      setFleet([]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800 p-6 hidden lg:flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="space-y-1">
            <span className="text-xl font-black italic tracking-tighter text-white">
              KayseTrans <span className="text-red-600 italic">Auto</span>
            </span>
            <p className="text-[10px] font-black uppercase text-neutral-500 tracking-widest">
              MANAGEMENT PORTAL
            </p>
          </div>

          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-red-600/10 text-red-500 border border-red-500/20 rounded-xl font-black text-xs uppercase tracking-wider">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
          </nav>
        </div>

        <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Online
          </div>
          <p className="text-[10px] text-neutral-400 font-semibold">Admin Engine v4.2</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl space-y-10">
        
        {/* Top Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight flex items-center gap-3">
              MANAGE <span className="text-red-600">FLEET</span>
            </h1>
            <p className="text-xs text-neutral-400 font-semibold">Real-time inventory management and user controls</p>
          </div>

          {/* Action Header Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white text-xs font-black uppercase px-5 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-neutral-400" />
              <span>ADD ADMIN</span>
            </button>

            <button
              onClick={handleWipeAll}
              className="bg-neutral-900 border border-neutral-800 hover:border-red-900/50 hover:text-red-500 text-neutral-400 text-xs font-black uppercase px-5 py-3 rounded-xl transition-all cursor-pointer"
            >
              WIPE ALL
            </button>

            <a
              href="#create-listing"
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-lg shadow-red-600/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-3" />
              <span>+ ADD CAR</span>
            </a>
          </div>
        </div>

        {/* Dashboard Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-950 border border-neutral-800/80 rounded-3xl p-6 space-y-2 relative overflow-hidden group">
            <div className="text-[10px] font-black uppercase text-red-500 tracking-widest flex items-center gap-2">
              <Car className="w-3.5 h-3.5" />
              TOTAL INVENTORY
            </div>
            <div className="text-4xl font-black italic">{fleet.length}</div>
            <p className="text-[10px] text-neutral-500 font-semibold uppercase">Live Vehicles in Showroom</p>
          </div>

          <div className="bg-neutral-950 border border-neutral-800/80 rounded-3xl p-6 space-y-2 relative overflow-hidden">
            <div className="text-[10px] font-black uppercase text-neutral-400 tracking-widest flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-neutral-400" />
              LATEST UPDATES
            </div>
            <div className="text-3xl font-black italic text-emerald-400">Active</div>
            <p className="text-[10px] text-neutral-500 font-semibold uppercase">Database Connected</p>
          </div>

          <div className="bg-neutral-950 border border-neutral-800/80 rounded-3xl p-6 space-y-2 relative overflow-hidden">
            <div className="text-[10px] font-black uppercase text-neutral-400 tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              ADMIN USER
            </div>
            <div className="text-sm font-black truncate text-white">tinotendakatsande@gmail.com</div>
            <p className="text-[10px] text-neutral-500 font-semibold uppercase">Authorized Access</p>
          </div>
        </div>

        {/* Create New Listing Section */}
        <div id="create-listing" className="bg-neutral-950 border border-neutral-800/80 rounded-3xl p-8 md:p-10 relative overflow-hidden border-l-4 border-l-red-600">
          <div className="mb-8">
            <h2 className="text-2xl font-black italic uppercase tracking-tight">CREATE NEW LISTING</h2>
            <p className="text-xs text-neutral-400 font-semibold mt-1">Publish new luxury unit into the digital showroom</p>
          </div>

          <form onSubmit={handleCreateListing} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Make & Model (e.g. Mazda CX-5)"
                value={form.makeModel}
                onChange={(e) => setForm({ ...form, makeModel: e.target.value })}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl px-5 py-4 text-xs font-bold text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors"
                required
              />
              <input
                type="text"
                placeholder="Price ($)"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl px-5 py-4 text-xs font-bold text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors"
                required
              />
              <input
                type="text"
                placeholder="Year (e.g. 2021)"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl px-5 py-4 text-xs font-bold text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors"
              />
              <input
                type="text"
                placeholder="Mileage (e.g. 45,000 km)"
                value={form.mileage}
                onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl px-5 py-4 text-xs font-bold text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors"
              />
              <select
                value={form.transmission}
                onChange={(e) => setForm({ ...form, transmission: e.target.value })}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl px-5 py-4 text-xs font-bold text-white focus:outline-none focus:border-red-600 transition-colors"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
              <select
                value={form.fuel}
                onChange={(e) => setForm({ ...form, fuel: e.target.value })}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl px-5 py-4 text-xs font-bold text-white focus:outline-none focus:border-red-600 transition-colors"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <textarea
              rows="4"
              placeholder="Vehicle Description & Optional Features..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-5 text-xs font-bold text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors"
            />

            {/* Image Gallery Upload Zone */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">IMAGE GALLERY</label>
              <div className="border-2 border-dashed border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-neutral-800 text-neutral-400 flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <p className="text-xs font-extrabold uppercase text-neutral-400">Click or drag vehicle photos here</p>
                <p className="text-[10px] text-neutral-600 font-semibold">JPG, PNG or WEBP up to 10MB each</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-widest py-5 rounded-2xl transition-all shadow-2xl cursor-pointer"
            >
              PUBLISH LISTING
            </button>
          </form>
        </div>

        {/* Live Showroom Table */}
        <div className="bg-neutral-950 border border-neutral-800/80 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-neutral-800/80">
            <h2 className="text-xl font-black italic uppercase tracking-tight">LIVE SHOWROOM</h2>
          </div>

          {fleet.length === 0 ? (
            <div className="p-12 text-center text-neutral-500 text-xs font-bold uppercase tracking-wider">
              Our showroom is currently empty. Add a vehicle above!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-900/50 border-b border-neutral-800/80 text-[10px] font-black uppercase text-neutral-400 tracking-wider">
                    <th className="p-5">VEHICLE</th>
                    <th className="p-5">YEAR</th>
                    <th className="p-5">PRICE</th>
                    <th className="p-5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-xs font-bold">
                  {fleet.map((car) => (
                    <tr key={car.id} className="hover:bg-neutral-900/40 transition-colors">
                      <td className="p-5 font-black uppercase italic text-sm text-white">
                        {car.makeModel}
                      </td>
                      <td className="p-5 text-neutral-400">{car.year}</td>
                      <td className="p-5 text-white font-black">{car.price}</td>
                      <td className="p-5 text-right">
                        <button
                          onClick={() => setFleet(fleet.filter((f) => f.id !== car.id))}
                          className="p-2.5 bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-500 rounded-xl transition-colors cursor-pointer border border-neutral-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>

      {/* Render Add Admin Modal */}
      <AddAdminModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
      />

    </div>
  );
}