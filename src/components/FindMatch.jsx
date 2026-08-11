import { useState } from 'react';

const CATEGORIES = [
  'CHEAP CARS',
  'NEW CARS',
  'PRE-OWNED CARS',
  'RECENTLY ADDED',
  'FUEL EFFICIENT'
];

export default function FindMatch() {
  const [selected, setSelected] = useState('NEW CARS');

  return (
    <section className="bg-white text-black py-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight mb-8">
          FIND YOUR PERFECT MATCH
        </h2>

        {/* Category Outline Pills */}
        <div className="flex flex-wrap items-center gap-4">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelected(category)}
              className={`px-8 py-3.5 rounded-full border-2 border-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                selected === category
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}