import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import AdminLoginModal from './AdminLoginModal';

export default function Navbar({ isAuthenticated, user, onLogin, onLogout, isLoginOpen, setIsLoginOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fallback chain for user display name
  const displayName = user?.email || user?.user?.email || user?.name || user?.username || 'Admin';

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <nav className="w-full px-4 md:px-8 py-5 flex items-center justify-between">
          
          {/* Left Section: Brand Logo + Desktop Nav Links */}
          <div className="flex items-center gap-12">
            <Link 
              to="/" 
              onClick={closeMobileMenu}
              className="text-2xl font-black italic tracking-tight text-black flex items-center gap-1.5"
            >
              <span>Kaysetrans</span>
              <span className="not-italic font-extrabold">Auto</span>
            </Link>

            {/* Desktop Navigation Links */}
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

          {/* Right Section: User Auth (Desktop) + Hamburger Toggle (Mobile) */}
          <div className="flex items-center gap-4">
            
            {/* Desktop Auth Status */}
            <div className="hidden md:flex items-center gap-4">
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

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-black hover:opacity-70 transition-opacity focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-neutral-200 px-6 pt-4 pb-6 space-y-4 font-bold text-sm text-black border-t">
            <Link 
              to="/cars" 
              onClick={closeMobileMenu} 
              className="block py-2 border-b border-neutral-100 hover:opacity-70"
            >
              Cars for Sale
            </Link>
            <Link 
              to="/about" 
              onClick={closeMobileMenu} 
              className="block py-2 border-b border-neutral-100 hover:opacity-70"
            >
              About Us
            </Link>
            <Link 
              to="/news" 
              onClick={closeMobileMenu} 
              className="block py-2 border-b border-neutral-100 hover:opacity-70"
            >
              News & Videos
            </Link>
            <Link 
              to="/sell" 
              onClick={closeMobileMenu} 
              className="block py-2 border-b border-neutral-100 hover:opacity-70"
            >
              Sell Your Car
            </Link>

            {isAuthenticated && (
              <Link 
                to="/admin/inventory" 
                onClick={closeMobileMenu} 
                className="block py-2 border-b border-neutral-100 font-black text-black hover:opacity-70"
              >
                Manage Inventory
              </Link>
            )}

            {/* Mobile Auth Status */}
            <div className="pt-2">
              {isAuthenticated ? (
                <div className="flex items-center justify-between py-2 text-xs">
                  <span className="font-bold text-neutral-500">
                    Hi, <span className="text-black font-extrabold">{displayName}</span>
                  </span>
                  <button
                    onClick={() => {
                      onLogout();
                      closeMobileMenu();
                    }}
                    className="font-extrabold text-black hover:opacity-70 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setIsLoginOpen(true);
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-2 text-sm font-bold text-black hover:opacity-70 cursor-pointer pt-2"
                >
                  <User className="w-5 h-5 text-black stroke-[2]" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        )}
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