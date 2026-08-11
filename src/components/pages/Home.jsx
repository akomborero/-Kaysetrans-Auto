import Navbar from '../Navbar';
import HeroCard from '../HeroCard';
import Showcase from '../Showcase';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden font-sans">
      {/* Dark Sports Car Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 z-0 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=2000')`
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/80" />
      </div>

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-12 pb-24 flex items-center min-h-[calc(100vh-90px)]">
        <HeroCard />
      </main>

      {/* Showroom Showcase Section */}
      <Showcase />
    </div>
  );
}