export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-20 pb-12 px-6 md:px-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Section: Brand & Newsletter Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-neutral-800 pb-16">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-400">
              STAY IN THE LOOP
            </span>
            <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight">
              GET NEW ARRIVALS & EXCLUSIVE DEALS IN YOUR INBOX
            </h2>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="grow bg-neutral-800 border border-neutral-700 text-white px-6 py-4 rounded-full text-sm placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
              />
              <button 
                type="submit" 
                className="bg-white text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer shrink-0"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-3xl font-black italic tracking-tight">
              Kaysetrans Auto
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-medium max-w-md">
              Providing Zimbabwe with the best selection of quality pre-owned and new vehicles. Your journey to a better drive starts here with transparency, trust, and unmatched value.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">
              CONTACT US
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400 font-medium">
              <li className="hover:text-white transition-colors">+263 784532889</li>
              <li className="hover:text-white transition-colors">tinotendakatsande@gmail.com</li>
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
              <li><a href="#cars" className="hover:text-white transition-colors">Cars for Sale</a></li>
              <li><a href="#recent" className="hover:text-white transition-colors">Recently Added</a></li>
              <li><a href="#sell" className="hover:text-white transition-colors">Sell Your Car</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">
              LEGAL & HELP
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400 font-medium">
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ & Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Credit Line */}
        <div className="pt-10 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-extrabold uppercase tracking-wider text-neutral-500">
          
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span>© 2026 KAYSETRANS AUTO. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline text-neutral-700">•</span>
          
          
          </div>

          <div className="flex items-center gap-8">
            <a href="#facebook" className="hover:text-white transition-colors">FACEBOOK</a>
            <a href="#instagram" className="hover:text-white transition-colors">INSTAGRAM</a>
            <a href="#whatsapp" className="hover:text-white transition-colors">WHATSAPP</a>
          </div>

        </div>

      </div>
    </footer>
  );
}