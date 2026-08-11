import { useState } from 'react';
import { DollarSign, ShieldCheck, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SellYourCar() {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    condition: 'Excellent',
    askingPrice: '',
    fullName: '',
    phone: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Construct direct WhatsApp message with form details
  const whatsappMessage = encodeURIComponent(
    `*NEW VEHICLE SELL/TRADE INQUIRY*\n\n` +
    `*Vehicle:* ${formData.year} ${formData.make} ${formData.model}\n` +
    `*Mileage:* ${formData.mileage} km\n` +
    `*Condition:* ${formData.condition}\n` +
    `*Asking Price:* $${formData.askingPrice}\n\n` +
    `*Seller Name:* ${formData.fullName}\n` +
    `*Contact:* ${formData.phone}\n` +
    `*Notes:* ${formData.notes || 'N/A'}`
  );

  return (
    <div className="min-h-screen bg-white text-black py-12 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Banner */}
        <div className="space-y-4 border-b border-neutral-100 pb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-neutral-400">
            KAYSETRANS VALUATION & CONSIGNMENT
          </span>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight">
            SELL OR TRADE <span className="text-neutral-400">YOUR CAR</span>
          </h1>
          <p className="text-sm text-neutral-500 font-medium">
            Get an instant valuation, competitive cash offer, or consignment listing in Harare within 24 hours.
          </p>
        </div>

        {/* Value Proposition Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-50 border border-neutral-100 rounded-3xl p-6 space-y-2 flex items-start gap-4">
            <div className="p-3 bg-black text-white rounded-2xl shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-black italic uppercase">Best Market Offer</h3>
              <p className="text-xs text-neutral-500 font-medium">Top cash payouts based on real-time market data in Zimbabwe.</p>
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-100 rounded-3xl p-6 space-y-2 flex items-start gap-4">
            <div className="p-3 bg-black text-white rounded-2xl shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-black italic uppercase">Instant Payment</h3>
              <p className="text-xs text-neutral-500 font-medium">Same-day bank transfer or settlement upon physical verification.</p>
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-100 rounded-3xl p-6 space-y-2 flex items-start gap-4">
            <div className="p-3 bg-black text-white rounded-2xl shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-black italic uppercase">Zero Hassle Paperwork</h3>
              <p className="text-xs text-neutral-500 font-medium">We manage ownership transfer, police clearance, and agreements.</p>
            </div>
          </div>
        </div>

        {/* Main Form Section */}
        <div className="max-w-4xl mx-auto bg-neutral-50 border border-neutral-100 rounded-3xl p-8 md:p-12 shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black italic uppercase">Valuation Request Received!</h2>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  Your vehicle details have been saved. Click below to instantly send your info directly to our buying team on WhatsApp.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`https://wa.me/263784532889?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  <span>SEND VIA WHATSAPP</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-white border border-neutral-200 text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  SUBMIT ANOTHER
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="border-b border-neutral-200 pb-4">
                <h2 className="text-lg font-black italic uppercase tracking-tight">1. VEHICLE DETAILS</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-neutral-400">MAKE</label>
                  <input
                    type="text"
                    name="make"
                    required
                    placeholder="e.g. Toyota, Mazda, BMW"
                    value={formData.make}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-neutral-400">MODEL</label>
                  <input
                    type="text"
                    name="model"
                    required
                    placeholder="e.g. Fortuner, CX-5, 320i"
                    value={formData.model}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-neutral-400">YEAR</label>
                  <input
                    type="number"
                    name="year"
                    required
                    placeholder="e.g. 2018"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-neutral-400">MILEAGE (KM)</label>
                  <input
                    type="text"
                    name="mileage"
                    required
                    placeholder="e.g. 75,000"
                    value={formData.mileage}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-neutral-400">CONDITION</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs font-extrabold focus:outline-none focus:border-black"
                  >
                    <option value="Excellent">Excellent (Like New)</option>
                    <option value="Good">Good (Normal wear & tear)</option>
                    <option value="Fair">Fair (Needs minor repairs)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-neutral-400">DESIRED PRICE ($ USD)</label>
                  <input
                    type="number"
                    name="askingPrice"
                    required
                    placeholder="e.g. 15000"
                    value={formData.askingPrice}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="border-b border-neutral-200 pb-4 pt-4">
                <h2 className="text-lg font-black italic uppercase tracking-tight">2. SELLER INFORMATION</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-neutral-400">FULL NAME</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-neutral-400">PHONE / WHATSAPP NUMBER</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+263 77 000 0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-neutral-400">ADDITIONAL NOTES / SPECIFICATIONS</label>
                <textarea
                  name="notes"
                  rows="3"
                  placeholder="Mention added features, service history, or current location..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full bg-white border border-neutral-200 rounded-xl p-4 text-xs font-semibold focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white font-black text-xs uppercase tracking-widest py-4 rounded-full hover:bg-neutral-800 transition-all cursor-pointer shadow-lg"
              >
                GENERATE INSTANT QUOTE &rarr;
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}