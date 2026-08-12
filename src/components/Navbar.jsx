import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import AdminLoginModal from './AdminLoginModal';

export default function Navbar({ isAuthenticated, user, onLogin, onLogout, isLoginOpen, setIsLoginOpen }) {
  // Get user name or email to display (e.g. mmmfundaedza.tm or tinotendakatsande)
  const displayName = user?.email || user?.name || user?.username || 'tinotendakatsande';

  return (
    <>
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="text-2xl font-black italic tracking-tighter text-black flex items-center">
            KayseTrans<span className="not-italic font-extrabold ml-1">Auto</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-black">
            <Link to="/cars" className="hover:opacity-70 transition-opacity">
              Cars for Sale
            </Link>
            <Link to="/about" className="hover:opacity-70 transition-opacity">
              About Us
            </Link>
            <Link to="/news" className="hover:opacity-70 transition-opacity">
              News & Videos
            </Link>
            <Link to="/sell" className="hover:opacity-70 transition-opacity">
              Sell Your Car
            </Link>

            {/* Authenticated Admin Link */}
            {isAuthenticated && (
              <Link to="/admin/inventory" className="font-black text-black hover:opacity-70 transition-opacity">
                Manage Inventory
              </Link>
            )}
          </div>

          {/* User Auth Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3 text-xs md:text-sm">
                <span className="font-bold text-neutral-500">
                  Hi, <span className="text-black font-extrabold">{displayName}</span>
                </span>
                <button
                  onClick={onLogout}
                  className="font-extrabold text-black hover:opacity-70 transition-opacity cursor-pointer ml-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center gap-2 text-sm font-extrabold text-black hover:opacity-70 transition-opacity cursor-pointer"
              >
                <span>Sign In</span>
                <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center">
                  <User className="w-4 h-4 text-black stroke-[2.5]" />
                </div>
              </button>
            )}
          </div>

        </nav>
      </header>

      {/* Login Modal */}
      <AdminLoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSuccess={onLogin}
      />
    </>
  );
}