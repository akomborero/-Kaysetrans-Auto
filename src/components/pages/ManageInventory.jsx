import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Plus, Trash2, UserPlus, 
  ShieldCheck, Car, Database, Loader2, Upload, X 
} from 'lucide-react';
import AddAdminModal from '../AddAdminModal';

export default function ManageInventory() {
  const [fleet, setFleet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);

  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    description: '',
    status: 'available',
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://smart-ar-backend.onrender.com/api/cars');
      if (response.ok) {
        const data = await response.json();
        setFleet(data);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Convert File object to Base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle Gallery Selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImagePreviews = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      previewUrl: URL.createObjectURL(file)
    }));

    setSelectedImages((prev) => [...prev, ...newImagePreviews]);
  };

  const handleRemoveImage = (idToRemove) => {
    setSelectedImages((prev) => prev.filter((img) => img.id !== idToRemove));
  };

  // Create Car Handler
  const handleCreateListing = async (e) => {
    e.preventDefault();
    if (!form.make || !form.model || !form.price) return;

    setIsSubmitting(true);
    const token = localStorage.getItem('adminToken');

    try {
      // Process files to Base64 strings for backend consumption
      const base64Images = await Promise.all(
        selectedImages.map((imgObj) => fileToBase64(imgObj.file))
      );

      const payload = {
        make: form.make,
        model: form.model,
        year: Number(form.year) || 2023,
        price: Number(form.price) || 0,
        mileage: Number(form.mileage) || 0,
        description: form.description,
        status: form.status,
        images: base64Images
      };

      const response = await fetch('https://smart-ar-backend.onrender.com/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to create car');
      }

      const createdCar = await response.json();
      setFleet([createdCar, ...fleet]);

      // Reset Form & Gallery
      setForm({
        make: '',
        model: '',
        year: '',
        price: '',
        mileage: '',
        description: '',
        status: 'available',
      });
      setSelectedImages([]);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;

    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`https://smart-ar-backend.onrender.com/api/cars/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setFleet(fleet.filter((car) => (car.id || car._id) !== id));
      } else {
        const err = await response.json();
        alert(err.message || 'Failed to delete car');
      }
    } catch (error) {
      alert('Error deleting car: ' + error.message);
    }
  };

  const adminEmail = localStorage.getItem('adminEmail') || 'admin@kaysetrans.com';

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

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight flex items-center gap-3">
              MANAGE <span className="text-red-600">FLEET</span>
            </h1>
            <p className="text-xs text-neutral-400 font-semibold">Real-time inventory management and user controls</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white text-xs font-black uppercase px-5 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-neutral-400" />
              <span>ADD ADMIN</span>
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

        {/* Dashboard Stats */}
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
            <div className="text-sm font-black truncate text-white">{adminEmail}</div>
            <p className="text-[10px] text-neutral-500 font-semibold uppercase">Authorized Access</p>
          </div>
        </div>

        {/* Create Listing Form */}
        <div id="create-listing" className="bg-neutral-950 border border-neutral-800/80 rounded-3xl p-8 md:p-10 relative overflow-hidden border-l-4 border-l-red-600">
          <div className="mb-8">
            <h2 className="text-2xl font-black italic uppercase tracking-tight">CREATE NEW LISTING</h2>
            <p className="text-xs text-neutral-400 font-semibold mt-1">Publish new unit into the digital showroom</p>
          </div>

          <form onSubmit={handleCreateListing} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Make (e.g. Toyota)"
                value={form.make}
                onChange={(e) => setForm({ ...form, make: e.target.value })}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl px-5 py-4 text-xs font-bold text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors"
                required
              />
              <input
                type="text"
                placeholder="Model (e.g. RAV4)"
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl px-5 py-4 text-xs font-bold text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors"
                required
              />
              <input
                type="number"
                placeholder="Price ($)"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl px-5 py-4 text-xs font-bold text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors"
                required
              />
              <input
                type="number"
                placeholder="Year (e.g. 2023)"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl px-5 py-4 text-xs font-bold text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors"
              />
              <input
                type="number"
                placeholder="Mileage (e.g. 15000)"
                value={form.mileage}
                onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl px-5 py-4 text-xs font-bold text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors"
              />
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl px-5 py-4 text-xs font-bold text-white focus:outline-none focus:border-red-600 transition-colors"
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>

            <textarea
              rows="4"
              placeholder="Vehicle Description..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-5 text-xs font-bold text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors"
            />

            {/* Gallery Upload Section */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">
                IMAGE GALLERY (FROM DEVICE)
              </label>

              <label className="border-2 border-dashed border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer transition-colors block">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-2xl bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-xs font-extrabold uppercase text-neutral-400">Click to select photos from gallery</p>
                <p className="text-[10px] text-neutral-600 font-semibold">PNG, JPG, or WEBP supported</p>
              </label>

              {/* Uploaded Gallery Thumbnails */}
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  {selectedImages.map((img) => (
                    <div key={img.id} className="relative group rounded-xl overflow-hidden border border-neutral-800 aspect-video bg-neutral-900">
                      <img
                        src={img.previewUrl}
                        alt="Upload Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(img.id)}
                        className="absolute top-2 right-2 bg-black/80 hover:bg-red-600 text-white p-1.5 rounded-lg transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-widest py-5 rounded-2xl transition-all shadow-2xl cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'PUBLISH LISTING'}
            </button>
          </form>
        </div>

        {/* Live Showroom Table */}
        <div className="bg-neutral-950 border border-neutral-800/80 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-neutral-800/80">
            <h2 className="text-xl font-black italic uppercase tracking-tight">LIVE SHOWROOM</h2>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-neutral-500 flex items-center justify-center gap-2 text-xs font-bold uppercase">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading inventory...
            </div>
          ) : fleet.length === 0 ? (
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
                    <th className="p-5">STATUS</th>
                    <th className="p-5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-xs font-bold">
                  {fleet.map((car, index) => {
                    const carId = car.id || car._id || index;
                    return (
                      <tr key={carId} className="hover:bg-neutral-900/40 transition-colors">
                        <td className="p-5 font-black uppercase italic text-sm text-white flex items-center gap-3">
                          {car.images?.[0] && (
                            <img 
                              src={car.images[0]} 
                              alt={car.model} 
                              className="w-10 h-10 rounded-lg object-cover border border-neutral-800"
                            />
                          )}
                          <span>{car.make} {car.model}</span>
                        </td>
                        <td className="p-5 text-neutral-400">{car.year}</td>
                        <td className="p-5 text-white font-black">${car.price?.toLocaleString()}</td>
                        <td className="p-5 text-neutral-400 capitalize">{car.status || 'available'}</td>
                        <td className="p-5 text-right">
                          <button
                            onClick={() => handleDeleteCar(carId)}
                            className="p-2.5 bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-500 rounded-xl transition-colors cursor-pointer border border-neutral-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>

      <AddAdminModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
      />

    </div>
  );
}