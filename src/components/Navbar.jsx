import { User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-white/10">
      <div className="text-2xl font-black tracking-tight italic text-white">
        KayseTrans <span className="text-slate-300 font-normal not-italic">Auto</span>
      </div>

      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
        <a href="#cars" className="hover:text-white transition">Cars for Sale</a>
        <a href="#about" className="hover:text-white transition">About Us</a>
        <a href="#news" className="hover:text-white transition">News & Videos</a>
        <a href="#sell" className="hover:text-white transition">Sell Your Car</a>
      </div>

      <button className="flex items-center space-x-2 text-sm font-semibold text-white hover:text-gray-300 transition">
        <span>Sign In</span>
        <div className="p-1.5 rounded-full border border-white/30">
          <User className="w-4 h-4" />
        </div>
      </button>
    </nav>
  );
}