import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-black italic tracking-tighter text-black flex items-center">
          KayseTrans<span className="not-italic font-extrabold ml-1">Auto</span>
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-black">
          <Link to="/cars" className="hover:opacity-70 transition-opacity">
            Cars for Sale
          </Link>
          <a href="#about" className="hover:opacity-70 transition-opacity">
            About Us
          </a>
          <a href="#news" className="hover:opacity-70 transition-opacity">
            News & Videos
          </a>
          <a href="#sell" className="hover:opacity-70 transition-opacity">
            Sell Your Car
          </a>
        </div>

        {/* Sign In Button */}
        <a 
          href="#signin" 
          className="flex items-center gap-2 text-sm font-extrabold text-black hover:opacity-70 transition-opacity"
        >
          <span>Sign In</span>
          <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center">
            <User className="w-4 h-4 text-black stroke-[2.5]" />
          </div>
        </a>

      </nav>
    </header>
  );
}