import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';

export default function CarDetails() {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    rating: '5',
    comment: ''
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://smart-ar-backend.onrender.com/api/cars/${id}`);
        
        if (!response.ok) {
          throw new Error('Vehicle details could not be loaded.');
        }

        const data = await response.json();
        console.log('RAW BACKEND CAR RESPONSE:', data);
        setCar(data);

      } catch (err) {
        console.error('Error fetching car details:', err);
        setError(err.message || 'Failed to load car details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCarDetails();
    }
  }, [id]);

  // Updated Helper: Safely parses car_images, handles Base64 formatting, and appends prefixes
  const extractImageUrls = (data) => {
    if (!data) return [];

    // Checked car_images first as returned by your database schema
    let rawList = data.car_images || data.images || data.image || data.gallery || [];

    if (typeof rawList === 'string') {
      try {
        rawList = JSON.parse(rawList);
      } catch {
        rawList = [rawList];
      }
    }

    if (!Array.isArray(rawList)) {
      rawList = [rawList];
    }

    return rawList
      .map((item) => {
        if (!item) return null;

        // Extracts string from objects like { image_url: '...' }, { url: '...' }, etc.
        let src = typeof item === 'object' 
          ? (item.image_url || item.url || item.path || item.secure_url || '') 
          : item;

        if (typeof src !== 'string' || !src.trim()) return null;

        src = src.trim();

        // 1. Handle HTTP / HTTPS URLs directly
        if (src.startsWith('http://') || src.startsWith('https://')) {
          return src;
        }

        // 2. Handle Base64 strings with or without data: URI headers
        if (src.startsWith('data:image')) {
          return src;
        }

        // If it looks like raw Base64 (alphanumeric/padding), prefix it with base64 data URI
        if (/^[A-Za-z0-9+/=]+$/.test(src.substring(0, 100))) {
          return `data:image/png;base64,${src}`;
        }

        // 3. Handle relative server paths
        const cleanPath = src.startsWith('/') ? src : `/${src}`;
        return `https://smart-ar-backend.onrender.com${cleanPath}`;
      })
      .filter(Boolean);
  };

  const galleryImages = extractImageUrls(car);
  const activeImage = selectedImage || galleryImages[0] || 'https://placehold.co/800x600/e2e8f0/1e293b?text=No+Image+Available';

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.comment) return;

    setReviews([formData, ...reviews]);
    setFormData({ fullName: '', email: '', rating: '5', comment: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6">
        <Loader2 className="w-10 h-10 animate-spin text-neutral-400 mb-4" />
        <span className="text-xs font-black uppercase tracking-widest text-neutral-400">
          Loading Vehicle Details...
        </span>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-black italic uppercase tracking-tight mb-2">VEHICLE NOT FOUND</h2>
        <p className="text-xs text-neutral-500 font-medium max-w-sm mb-6">
          {error || 'The requested car details could not be retrieved.'}
        </p>
      </div>
    );
  }

  const formattedPrice = typeof car.price === 'number' 
    ? `$${car.price.toLocaleString()}` 
    : car.price || 'Contact for Price';

  const formattedMileage = typeof car.mileage === 'number' 
    ? `${car.mileage.toLocaleString()} km` 
    : car.mileage || 'N/A';

  const whatsappNumber = car.whatsappNumber || '263784532889';
  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in the ${car.year || ''} ${car.make} ${car.model} listed for ${formattedPrice} on Kaysetrans Auto.`
  );

  return (
    <div className="min-h-screen bg-white text-black py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-4/3 rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200">
              <img 
                src={activeImage} 
                alt={`${car.make} ${car.model}`} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/800x600/e2e8f0/1e293b?text=Image+Load+Failed';
                }}
              />
            </div>

            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                      activeImage === imgUrl ? 'border-black scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-neutral-400">
                {car.year || 'N/A'} MODEL
              </span>

              <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight leading-none">
                {car.make} <span className="text-neutral-400">{car.model}</span>
              </h1>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-4 text-center">
                  <span className="text-[10px] font-black uppercase text-neutral-400 block">MILEAGE</span>
                  <span className="text-xs font-black text-black">{formattedMileage}</span>
                </div>
                <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-4 text-center">
                  <span className="text-[10px] font-black uppercase text-neutral-400 block">TRANSMISSION</span>
                  <span className="text-xs font-black text-black">{car.transmission || 'Automatic'}</span>
                </div>
                <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-4 text-center">
                  <span className="text-[10px] font-black uppercase text-neutral-400 block">FUEL</span>
                  <span className="text-xs font-black text-black">{car.fuel || 'Petrol'}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-black">DESCRIPTION</h3>
                <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                  {car.description || 'No description available for this vehicle.'}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block">PRICE</span>
                <span className="text-3xl font-black italic tracking-tight">{formattedPrice}</span>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                CHAT ON WHATSAPP
              </a>
            </div>
          </div>

        </div>

        {/* Reviews */}
        <div className="pt-12 border-t border-neutral-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 bg-neutral-50/80 rounded-3xl p-8 border border-neutral-100 space-y-6">
            <h2 className="text-2xl font-black italic uppercase tracking-tight">LEAVE A REVIEW</h2>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-neutral-500">FULL NAME</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-black"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-neutral-500">EMAIL ADDRESS</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-black"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-neutral-500">RATING</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs font-extrabold focus:outline-none focus:border-black"
                >
                  <option value="5">★★★★★ EXCELLENT</option>
                  <option value="4">★★★★☆ GOOD</option>
                  <option value="3">★★★☆☆ AVERAGE</option>
                  <option value="2">★★☆☆☆ POOR</option>
                  <option value="1">★☆☆☆☆ TERRIBLE</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-neutral-500">COMMENT</label>
                <textarea
                  rows={4}
                  placeholder="Share your experience..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full bg-white border border-neutral-200 rounded-xl p-4 text-xs font-medium focus:outline-none focus:border-black resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-black text-white text-xs font-black uppercase tracking-wider rounded-2xl hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                SUBMIT REVIEW
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-black italic uppercase tracking-tight">CUSTOMER FEEDBACK</h2>
            {reviews.length === 0 ? (
              <div className="border border-dashed border-neutral-200 rounded-3xl p-12 text-center text-xs font-semibold text-neutral-400">
                No reviews yet. Be the first to review this car!
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((rev, index) => (
                  <div key={index} className="bg-white border border-neutral-100 rounded-2xl p-6 space-y-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-black">{rev.fullName}</span>
                      <span className="text-xs text-amber-500">{'★'.repeat(Number(rev.rating))}</span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}