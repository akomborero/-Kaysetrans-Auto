import { Link } from 'react-router-dom';

const LINKS = [
  { label: 'ALL CARS', to: '/cars' },
  { label: 'SELL YOUR CAR', to: '/sell' },
  { label: 'ABOUT US', to: '/about' },
  { label: 'NEWS & UPDATES', to: '/news' },
];

export default function FindMatch() {
  return (
    <section className="bg-white text-black py-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight mb-8">
          EXPLORE KAYSETRANS AUTO
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="px-8 py-3.5 rounded-full border-2 border-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer bg-white text-black hover:bg-black hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
