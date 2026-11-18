import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Plus, Trash2, Car, Database, Loader2, Upload, X,
  Menu, ChevronRight, LogOut, ArrowUpRight, Image as ImageIcon, ShieldCheck,
} from 'lucide-react';
import { clearCachedCars } from '../../utils/carsCache';
import ConfirmDialog from '../ConfirmDialog.jsx';
import { useToast } from '../../context/useToast.js';

const inputClass = 'w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10';

function Field({ label, htmlFor, required = false, hint, children }) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-xs font-medium text-neutral-700">
        {label}{required && <span className="text-neutral-400"> *</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] leading-relaxed text-neutral-400">{hint}</p>}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">{label}</p>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-5 text-3xl font-semibold leading-none tracking-tight tabular-nums text-neutral-950">{value}</p>
      <p className="mt-2 text-xs text-neutral-500">{hint}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    available: 'bg-neutral-900 text-white',
    reserved: 'bg-neutral-200 text-neutral-700',
    sold: 'bg-neutral-100 text-neutral-500',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${styles[status] || styles.available}`}>
      {status}
    </span>
  );
}

export default function ManageInventory({ onLogout }) {
  const [fleet, setFleet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const { showToast } = useToast();

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
      showToast('Could not load your inventory. Please try again.', 'error');
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
    if (!form.make || !form.model || !form.price) {
      showToast('Please provide a make, model and price before publishing.', 'error');
      return;
    }

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

      const result = await response.json();
      const createdCar = result.car || result;
      setFleet([createdCar, ...fleet]);
      try { clearCachedCars(); } catch(e){}

      // Surface partial image failures as a card instead of hiding them.
      if (result.imageError) {
        showToast(`Vehicle created, but some photos failed to save: ${result.imageError}`, 'error');
      } else {
        showToast(`${createdCar.make || 'Vehicle'} ${createdCar.model || ''} published successfully.`, 'success');
      }

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
      showToast(error.message || 'Failed to publish vehicle.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open an in-app confirmation card instead of a browser confirm() dialog.
  const handleDeleteCar = (id) => setPendingDeleteId(id);

  const confirmDeleteCar = async () => {
    const id = pendingDeleteId;
    setPendingDeleteId(null);
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
        try { clearCachedCars(); } catch(e){}
        showToast('Vehicle deleted successfully.', 'success');
      } else {
        const err = await response.json();
        showToast(err.message || 'Failed to delete vehicle.', 'error');
      }
    } catch (error) {
      showToast('Error deleting vehicle: ' + error.message, 'error');
    }
  };

  const adminEmail = localStorage.getItem('adminEmail') || 'Administrator';
  const availableCount = fleet.filter((car) => (car.status || 'available') === 'available').length;
  const initial = adminEmail.charAt(0).toUpperCase();

  return (
    <div id="admin-top" className="admin-shell min-h-screen bg-neutral-50 font-sans text-neutral-900">
      {/* Compact mobile bar */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-5 py-4 lg:hidden">
        <Link to="/" className="flex items-center gap-1.5 text-lg font-black italic tracking-tight text-neutral-950">
          <span>Kaysetrans</span><span className="not-italic font-extrabold">Auto</span>
        </Link>
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle admin navigation"
          aria-expanded={sidebarOpen}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20"
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex w-full">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} w-full shrink-0 border-b border-neutral-200 bg-white lg:sticky lg:top-0 lg:block lg:h-screen lg:w-64 lg:border-b-0 lg:border-r`}>
          <div className="flex h-full flex-col p-5">
            <div className="space-y-1">
              <Link to="/" className="flex items-center gap-1.5 text-xl font-black italic tracking-tight text-neutral-950">
                <span>Kaysetrans</span><span className="not-italic font-extrabold">Auto</span>
              </Link>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Admin console</p>
            </div>

            <nav className="mt-9 space-y-1">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Workspace</p>
              <a
                href="#admin-top"
                onClick={() => setSidebarOpen(false)}
                className="mt-3 flex items-center gap-3 rounded-xl bg-neutral-900 px-3 py-2.5 text-sm font-medium text-white"
              >
                <LayoutDashboard className="h-4 w-4" />
                Inventory
              </a>
              <Link
                to="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
              >
                <span>View website</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </nav>

            <div className="mt-auto border-t border-neutral-200 pt-5">
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3.5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                    {initial}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-neutral-900">{adminEmail}</p>
                    <p className="text-[11px] text-neutral-500">Administrator</p>
                  </div>
                </div>
                {onLogout && (
                  <button
                    type="button"
                    onClick={onLogout}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign out
                  </button>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          <div className="border-b border-neutral-200 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <span>Admin</span>
                <ChevronRight className="h-4 w-4 text-neutral-300" />
                <span className="font-medium text-neutral-900">Inventory</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2.5 sm:flex">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-semibold text-white">{initial}</span>
                  <div className="text-left">
                    <p className="max-w-[160px] truncate text-xs font-semibold text-neutral-900">{adminEmail}</p>
                    <p className="text-[11px] text-neutral-500">Administrator</p>
                  </div>
                </div>
                {onLogout && (
                  <button
                    type="button"
                    onClick={onLogout}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Sign out</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-6xl space-y-8 px-5 py-8 md:px-8 md:py-10">
            {/* Page header */}
            <div className="admin-enter flex flex-col gap-5 border-b border-neutral-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Fleet management</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">Inventory</h1>
                <p className="mt-2 text-sm text-neutral-500">Manage the vehicles shown on the Kaysetrans Auto website.</p>
              </div>
              <a
                href="#create-listing"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2"
              >
                <Plus className="h-4 w-4" />
                Add vehicle
              </a>
            </div>

            {/* Overview */}
            <div className="admin-enter grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard icon={Car} label="Total vehicles" value={fleet.length} hint="Vehicles in the inventory" />
              <StatCard icon={Database} label="Available" value={availableCount} hint="Marked as available" />
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Account</p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-5 truncate text-lg font-semibold tracking-tight text-neutral-950">{adminEmail}</p>
                <p className="mt-2 text-xs text-neutral-500">Signed in with administrator access</p>
              </div>
            </div>

            {/* Create listing */}
            <section id="create-listing" className="admin-enter scroll-mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="flex flex-col gap-3 border-b border-neutral-200 px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-neutral-950">Add a vehicle</h2>
                  <p className="mt-1 text-sm text-neutral-500">Enter the vehicle details and attach photos before publishing.</p>
                </div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-medium text-neutral-600">
                  <ImageIcon className="h-3.5 w-3.5" />
                  Photos optional
                </span>
              </div>

              <form onSubmit={handleCreateListing} className="space-y-8 p-6">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <Field label="Make" htmlFor="make" required>
                    <input
                      id="make"
                      type="text"
                      placeholder="e.g. Toyota"
                      value={form.make}
                      onChange={(e) => setForm({ ...form, make: e.target.value })}
                      className={inputClass}
                      required
                    />
                  </Field>
                  <Field label="Model" htmlFor="model" required>
                    <input
                      id="model"
                      type="text"
                      placeholder="e.g. RAV4"
                      value={form.model}
                      onChange={(e) => setForm({ ...form, model: e.target.value })}
                      className={inputClass}
                      required
                    />
                  </Field>
                  <Field label="Price (USD)" htmlFor="price" required>
                    <input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className={inputClass}
                      required
                    />
                  </Field>
                  <Field label="Year" htmlFor="year">
                    <input
                      id="year"
                      type="number"
                      placeholder="e.g. 2023"
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Mileage (km)" htmlFor="mileage">
                    <input
                      id="mileage"
                      type="number"
                      placeholder="e.g. 15000"
                      value={form.mileage}
                      onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Status" htmlFor="status">
                    <select
                      id="status"
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      className={inputClass}
                    >
                      <option value="available">Available</option>
                      <option value="reserved">Reserved</option>
                      <option value="sold">Sold</option>
                    </select>
                  </Field>
                </div>

                <Field label="Description" htmlFor="description" hint="Optional details about the vehicle.">
                  <textarea
                    id="description"
                    rows="4"
                    placeholder="Describe the vehicle, its condition and key features..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                {/* Gallery */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-neutral-700">Photos</p>
                    <p className="mt-1 text-[11px] text-neutral-500">Select one or more images from your device. PNG, JPG or WEBP.</p>
                  </div>

                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 px-6 py-10 text-center transition-colors hover:border-neutral-400 hover:bg-neutral-100">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600">
                      <Upload className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-neutral-800">Choose photos</span>
                    <span className="text-xs text-neutral-500">Multiple images can be selected at once</span>
                  </label>

                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {selectedImages.map((img) => (
                        <div key={img.id} className="group relative aspect-video overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
                          <img
                            src={img.previewUrl}
                            alt="Upload preview"
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(img.id)}
                            aria-label="Remove image"
                            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-white/95 text-neutral-700 shadow-sm transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end border-t border-neutral-200 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Publishing…</>
                    ) : (
                      'Publish vehicle'
                    )}
                  </button>
                </div>
              </form>
            </section>

            {/* Live inventory */}
            <section className="admin-enter overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="flex flex-col gap-3 border-b border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-neutral-950">Vehicles</h2>
                  <p className="mt-1 text-sm text-neutral-500">Live inventory from the connected backend.</p>
                </div>
                <span className="inline-flex w-fit items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  {fleet.length} total
                </span>
              </div>

              {isLoading ? (
                <div className="space-y-4 p-6">
                  {[0, 1, 2].map((row) => (
                    <div key={row} className="flex items-center gap-4">
                      <div className="h-11 w-11 animate-pulse rounded-lg bg-neutral-100" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/3 animate-pulse rounded bg-neutral-100" />
                        <div className="h-3 w-1/5 animate-pulse rounded bg-neutral-100" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : fleet.length === 0 ? (
                <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500">
                    <Car className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-semibold text-neutral-900">No vehicles yet</p>
                  <p className="max-w-sm text-sm text-neutral-500">
                    Add a vehicle using the form above to start building your showroom.
                  </p>
                  <a
                    href="#create-listing"
                    className="mt-1 inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-xs font-medium text-neutral-800 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add vehicle
                  </a>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-neutral-200 bg-neutral-50/70 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                        <th className="px-6 py-3 font-semibold">Vehicle</th>
                        <th className="px-6 py-3 font-semibold">Year</th>
                        <th className="px-6 py-3 font-semibold">Price</th>
                        <th className="px-6 py-3 font-semibold">Status</th>
                        <th className="px-6 py-3 text-right font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {fleet.map((car, index) => {
                        const carId = car.id || car._id || index;
                        return (
                          <tr key={carId} className="transition-colors hover:bg-neutral-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                {car.images?.[0] ? (
                                  <img
                                    src={car.images[0]}
                                    alt={car.model}
                                    className="h-11 w-11 rounded-lg border border-neutral-200 object-cover"
                                  />
                                ) : (
                                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-400">
                                    <Car className="h-4 w-4" />
                                  </span>
                                )}
                                <div>
                                  <p className="text-sm font-semibold text-neutral-900">{car.make} {car.model}</p>
                                  <p className="text-xs capitalize text-neutral-500">{car.status || 'available'}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm tabular-nums text-neutral-600">{car.year}</td>
                            <td className="px-6 py-4 text-sm font-semibold tabular-nums text-neutral-900">${car.price?.toLocaleString()}</td>
                            <td className="px-6 py-4"><StatusBadge status={car.status || 'available'} /></td>
                            <td className="px-6 py-4 text-right">
                              <button
                                type="button"
                                onClick={() => handleDeleteCar(carId)}
                                aria-label={`Delete ${car.make} ${car.model}`}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>

      <ConfirmDialog
        isOpen={pendingDeleteId !== null}
        title="Delete this vehicle?"
        message="This permanently removes the vehicle and its stored photos. This action cannot be undone."
        confirmLabel="Delete vehicle"
        cancelLabel="Keep vehicle"
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={confirmDeleteCar}
      />
    </div>
  );
}
