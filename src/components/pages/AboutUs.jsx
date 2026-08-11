import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Zap, Users, ArrowRight } from 'lucide-react';

export default function AboutUs() {
  const stats = [
    { value: '1,200+', label: 'Vehicles Delivered' },
    { value: '99.4%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Dedicated Support' },
    { value: '100%', label: 'Verified Integrity' },
  ];

  const pillars = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-black" />,
      title: 'Uncompromised Quality',
      description: 'Every vehicle undergoes a rigorous 150-point mechanical inspection before reaching our showroom floor. No compromises, no hidden history.',
    },
    {
      icon: <Zap className="w-8 h-8 text-black" />,
      title: 'Seamless Purchasing',
      description: 'From instant WhatsApp inquiries to rapid paper processing, we eliminate dealership friction so you get driving faster.',
    },
    {
      icon: <Award className="w-8 h-8 text-black" />,
      title: 'Transparent Pricing',
      description: 'What you see is what you pay. We pride ourselves on straight-forward, fair market valuation with zero surprise add-ons.',
    },
    {
      icon: <Users className="w-8 h-8 text-black" />,
      title: 'Customer First Culture',
      description: 'We do not just sell cars; we forge long-term relationships backed by authentic after-sales support across Zimbabwe.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      
      {/* Hero Section */}
      <section className="relative bg-neutral-900 text-white py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-neutral-300">
            <span>ABOUT KAYSETRANS AUTO</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tight leading-none max-w-4xl">
            REDEFINING THE <span className="text-neutral-400">AUTOMOTIVE EXPERIENCE</span> IN ZIMBABWE.
          </h1>

          <p className="text-base md:text-lg text-neutral-400 font-medium max-w-2xl leading-relaxed">
            Founded on transparency, performance, and trust, Kaysetrans Auto is building the most trusted destination for acquiring hand-picked, premium pre-owned and new vehicles.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link 
              to="/cars" 
              className="bg-white text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-full hover:bg-neutral-200 transition-all flex items-center gap-2 group"
            >
              <span>EXPLORE INVENTORY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="bg-neutral-100 border-y border-neutral-200 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1 text-center md:text-left">
              <span className="text-4xl md:text-5xl font-black italic tracking-tight text-black block">
                {stat.value}
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-neutral-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Story Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-400">OUR PURPOSE</span>
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight">
              DRIVEN BY PASSION. BACKED BY INTEGRITY.
            </h2>
            <p className="text-sm text-neutral-600 font-medium leading-relaxed">
              At Kaysetrans Auto, we believe buying a car should be as exciting as driving it. We recognized that vehicle buyers in Zimbabwe needed a dealership partner who prioritized authentic documentation, mechanical reliability, and hassle-free transactions.
            </p>
            <p className="text-sm text-neutral-600 font-medium leading-relaxed">
              Whether you are looking for an economical daily commuter or a luxury executive SUV, our curated stock is selected to meet the exact standards of modern Zimbabwean roads.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-3/4 rounded-3xl overflow-hidden bg-neutral-200 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800" 
                  alt="Showroom Car" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-3/4 rounded-3xl overflow-hidden bg-neutral-200 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800" 
                  alt="Luxury Vehicle Interior" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Value Pillars */}
      <section className="bg-neutral-50 py-20 px-6 md:px-12 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-400">WHY CHOOSE US</span>
            <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight">
              THE KAYSETRANS STANDARDS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-neutral-200 p-8 rounded-3xl space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-neutral-100 rounded-2xl flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-black italic uppercase tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-neutral-900 text-white rounded-3xl p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight">
              READY TO FIND YOUR NEXT VEHICLE?
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 font-medium max-w-xl">
              Browse our inventory or contact our sales team directly in Harare for personalized assistance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              to="/cars"
              className="bg-white text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-full hover:bg-neutral-200 transition-colors text-center"
            >
              VIEW INVENTORY
            </Link>
            <a
              href="https://wa.me/263784532889"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 text-white font-black text-xs uppercase tracking-wider px-8 py-4 rounded-full hover:bg-emerald-600 transition-colors text-center"
            >
              CHAT ON WHATSAPP
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}