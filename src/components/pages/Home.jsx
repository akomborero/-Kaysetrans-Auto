import Navbar from '../Navbar';
import HeroCard from '../HeroCard';

import FindMatch from '../FindMatch';
import WhyChooseUs from '../WhyChooseUs';
import FeaturedStock from '../FeaturedStock';
import  NewsSection from '../NewsSection';
import FAQSection from '../FAQSection';
  
export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-73px)] bg-black overflow-hidden flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 z-0 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=2000')`
          }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/80" />
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-12 w-full">
          <HeroCard />
        </main>
      </section>

      {/* 8-Vehicle Grid replacing the empty showroom */}
    

      <FindMatch />
      <WhyChooseUs />
        <FeaturedStock />
        <NewsSection/>
        <FAQSection/>
    </div>
  );
}