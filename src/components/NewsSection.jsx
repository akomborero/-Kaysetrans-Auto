const FEATURED_NEWS = [
  {
    id: 1,
    title: 'Bokaro, Giridih get 71 new police vehicles',
    publisher: 'TOI',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'ZEV mandate review imminent: government mulls softer sales targets',
    publisher: null,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Audi India confirms new Q3, A5 and Q9 launches: Targets doubling market...',
    publisher: 'TOI',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'SC extends mandatory insurance for new cars, bikes: Third-party vs...',
    publisher: 'mint',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'
  }
];

const TRENDING_ARTICLES = [
  'EchoPark Automotive Relocates North Houston Dealership to Bett...',
  'Ford needs another Taurus, and the $30K Fathom EV pickup isn\'t ...',
  'New Vehicles Are Getting Easier to Afford (Comparatively, At Least)',
  'She Followed ICE\'s Advice to Self-Deport. Five Weeks Later, She W...',
  'More Americans Have Access to Credit While Debt Growth Has...'
];

export default function NewsSection() {
  return (
    <section className="bg-white text-black py-12 px-6 md:px-8 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Grid & Sidebar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Left Column: 2x2 Grid of News Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURED_NEWS.map((item) => (
              <div 
                key={item.id} 
                className="relative aspect-16/10 rounded-3xl overflow-hidden group cursor-pointer shadow-sm"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

                {item.publisher && (
                  <span className={`absolute top-4 left-4 text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    item.publisher === 'TOI' ? 'bg-red-600 text-white' : 'bg-orange-500 text-white'
                  }`}>
                    {item.publisher}
                  </span>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-sm font-extrabold leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Trending Near You Sidebar */}
          <div className="bg-neutral-50/80 rounded-3xl p-8 border border-neutral-100 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-6">
                TRENDING NEAR YOU
              </h3>

              <div className="space-y-6">
                {TRENDING_ARTICLES.map((title, index) => (
                  <div key={index} className="flex gap-4 items-start group cursor-pointer">
                    <span className="text-2xl font-black text-neutral-300 group-hover:text-black transition-colors leading-none">
                      0{index + 1}
                    </span>
                    <p className="text-xs font-bold text-neutral-900 leading-tight group-hover:text-neutral-600 transition-colors line-clamp-2">
                      {title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full mt-8 py-3.5 px-6 rounded-full border-2 border-black bg-white text-black text-xs font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all cursor-pointer">
              SEE ALL NEWS
            </button>
          </div>

        </div>

        {/* Bottom Banner: FEATURED STORY Card (Matching Screenshot 330) */}
        <div className="relative rounded-3xl overflow-hidden bg-black text-white min-h-[320px] flex items-center p-8 md:p-12">
          {/* Background Image with Dark Gradient Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1600')`
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent" />
          </div>

          {/* Foreground Story Content */}
          <div className="relative z-10 max-w-xl space-y-6">
            <span className="text-[10px] font-black tracking-widest uppercase text-gray-300 block">
              FEATURED STORY
            </span>

            <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight leading-tight">
              Black Residents Warned of Abusive Cops for Years. Then Police Shot and Killed a...
            </h2>

            <a 
              href="#read-story" 
              className="inline-flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                &rarr;
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-white group-hover:underline">
                READ FULL STORY
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}