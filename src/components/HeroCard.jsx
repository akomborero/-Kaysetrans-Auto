import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroCard() {
  const [condition, setCondition] = useState('');
  const [category, setCategory] = useState('');

  return (
    <div className="w-full max-w-sm p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.15)] flex flex-col justify-between text-white">
      <div>
        <span className="text-[10px] tracking-widest text-gray-400 uppercase font-bold block mb-4">
          KAYSETRANS AUTO
        </span>

        <h1 className="text-3xl font-black uppercase tracking-tight italic leading-none mb-4">
          ELEVATE <br /> YOUR <br /> DRIVING
        </h1>

        <div className="w-8 h-0.5 bg-white mb-6" />

        <p className="text-xs text-gray-300 leading-relaxed mb-8">
          Experience luxury redefined. Explore our curated collection of high-performance vehicles.
        </p>

        <div className="space-y-4 mb-8">
          <div className="border-b border-gray-700 pb-2">
            <select 
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full bg-transparent text-xs font-bold uppercase tracking-wider text-gray-300 focus:outline-none cursor-pointer"
            >
              <option value="" disabled className="bg-neutral-900 text-gray-400">CONDITION</option>
              <option value="new" className="bg-neutral-900 text-white">Brand New</option>
              <option value="used" className="bg-neutral-900 text-white">Pre-Owned</option>
            </select>
          </div>

          <div className="border-b border-gray-700 pb-2">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent text-xs font-bold uppercase tracking-wider text-gray-300 focus:outline-none cursor-pointer"
            >
              <option value="" disabled className="bg-neutral-900 text-gray-400">CATEGORY</option>
              <option value="suv" className="bg-neutral-900 text-white">Luxury SUV</option>
              <option value="sports" className="bg-neutral-900 text-white">Sports Car</option>
              <option value="sedan" className="bg-neutral-900 text-white">Executive Sedan</option>
            </select>
          </div>
        </div>
      </div>

      <button className="w-full py-3.5 px-4 rounded-xl border border-white/30 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-between group">
        <span className="text-xs font-bold uppercase tracking-wider">Find Your Dream Car</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}