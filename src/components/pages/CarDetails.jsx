import { useState } from 'react';

const MOCK_CAR_DATA = {
  id: '35e45de9-7bde-425f-8fa7-f6956515d584',
  year: '2016',
  make: 'MAZDA',
  model: 'CX5',
  price: '$9,500',
  mileage: '85,000 km',
  transmission: 'Automatic',
  fuel: 'Petrol',
  description: 'Clean Mazda CX5 in excellent mechanical condition. Fully serviced, leather interior, alloy wheels, fuel efficient, and ready to drive away.',
  whatsappNumber: '263784532889',
  images: [
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800',
  ]
};

export default function CarDetails() {
  const car = MOCK_CAR_DATA;

  const [selectedImage, setSelectedImage] = useState(car.images[0]);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    rating: '5',
    comment: ''
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.comment) return;

    setReviews([formData, ...reviews]);
    setFormData({ fullName: '', email: '', rating: '5', comment: '' });
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in the ${car.year} ${car.make} ${car.model} listed for ${car.price} on Kaysetrans Auto.`
  );

  return (
    <div className="min-h-screen bg-white text-black py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Section: Media Gallery & Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-4/3 rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200">
              <img 
                src={selectedImage} 
                alt={`${car.make} ${car.model}`} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {car.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                    selectedImage === img ? 'border-black scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="car thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Vehicle Details */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-neutral-400">
                {car.year} MODEL
              </span>

              <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight leading-none">
                {car.make} <span className="text-neutral-400">{car.model}</span>
              </h1>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-4 text-center">
                  <span className="text-[10px] font-black uppercase text-neutral-400 block">MILEAGE</span>
                  <span className="text-xs font-black text-black">{car.mileage}</span>
                </div>
                <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-4 text-center">
                  <span className="text-[10px] font-black uppercase text-neutral-400 block">TRANSMISSION</span>
                  <span className="text-xs font-black text-black">{car.transmission}</span>
                </div>
                <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-4 text-center">
                  <span className="text-[10px] font-black uppercase text-neutral-400 block">FUEL</span>
                  <span className="text-xs font-black text-black">{car.fuel}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-black">DESCRIPTION</h3>
                <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                  {car.description}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block">PRICE</span>
                <span className="text-3xl font-black italic tracking-tight">{car.price}</span>
              </div>

              <a
                href={`https://wa.me/${car.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                CHAT ON WHATSAPP
              </a>
            </div>
          </div>

        </div>

        {/* Reviews & Feedback Section */}
        <div className="pt-12 border-t border-neutral-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-5 bg-neutral-50/80 rounded-3xl p-8 border border-neutral-100 space-y-6">
            <h2 className="text-2xl font-black italic uppercase tracking-tight">
              LEAVE A REVIEW
            </h2>

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
            <h2 className="text-2xl font-black italic uppercase tracking-tight">
              CUSTOMER FEEDBACK
            </h2>

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