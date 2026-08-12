import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import AdminLoginModal from './AdminLoginModal';

export default function Navbar({ isAuthenticated, user, onLogin, onLogout, isLoginOpen, setIsLoginOpen }) {
  // Directly pull the logged-in user's email, or fall back to user object properties
  const displayName = user?.email || user?.user?.email || user?.name || user?.username || 'Admin';

  return (
    <>
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <nav className="w-full px-8 py-5 flex items-center justify-between">
          
          {/* Left Section: Brand Logo + Nav Links together */}
          <div className="flex items-center gap-12">
            <Link to="/" className="text-2xl font-black italic tracking-tight text-black flex items-center gap-1.5">
              <span>Kaysetrans</span>
              <span className="not-italic font-extrabold">Auto</span>
            </Link>

            {/* Navigation Links (Left Aligned Next to Logo) */}
            <div className="hidden md:flex items-center gap-8 text-sm font-bold text-black tracking-tight">
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

              {isAuthenticated && (
                <Link to="/admin/inventory" className="font-black text-black hover:opacity-70 transition-opacity">
                  Manage Inventory
                </Link>
              )}
            </div>
          </div>

          {/* Right Section: User Auth */}
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
                className="flex items-center gap-2 text-sm font-bold text-black hover:opacity-70 transition-opacity cursor-pointer"
              >
                <span>Sign In</span>
                <User className="w-5 h-5 text-black stroke-[2]" />
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