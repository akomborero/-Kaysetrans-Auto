import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-20 pb-12 px-6 md:px-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Section: Brand & Contact Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-neutral-800 pb-16">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-400">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight">
              TALK TO US ABOUT YOUR NEXT VEHICLE
            </h2>
          </div>

          <div className="lg:col-span-6">
            <a
              href="https://wa.me/263784532889"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-full hover:bg-neutral-200 transition-colors"
            >
              CHAT ON WHATSAPP
            </a>
          </div>
        </div>

        {/* Middle Section: Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-3xl font-black italic tracking-tight">
              Kaysetrans Auto
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-medium max-w-md">
              Kaysetrans Auto offers quality pre-owned and new vehicles in Zimbabwe. Browse our inventory or contact our team to find out more.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">
              CONTACT US
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400 font-medium">
              <li>
                <a href="tel:+263784532889" className="hover:text-white transition-colors">+263 784532889</a>
              </li>
              <li>
                <a href="mailto:tinotendakatsande@gmail.com" className="hover:text-white transition-colors">tinotendakatsande@gmail.com</a>
              </li>
              <li>N04 Nigel Philip Eastly</li>
              <li>Harare, Zimbabwe</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">
              QUICK LINKS
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400 font-medium">
              <li><Link to="/cars" className="hover:text-white transition-colors">Cars for Sale</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">News & Updates</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">Sell Your Car</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-10 border-t border-neutral-800 text-xs font-extrabold uppercase tracking-wider text-neutral-500">
          <span>© 2026 KAYSETRANS AUTO. ALL RIGHTS RESERVED.</span>
        </div>

      </div>
    </footer>
  );
}
