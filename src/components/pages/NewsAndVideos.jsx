import { useState } from 'react';
import { Play, Calendar, Clock, ArrowRight, Eye } from 'lucide-react';

const MEDIA_ARTICLES = [
  {
    id: '1',
    category: 'REVIEWS',
    title: '2026 MAZDA CX-5 IN-DEPTH ROAD TEST: ZIMBABWE TERRAIN REVIEW',
    excerpt: 'We take the flagship SUV through Harare traffic and highway stretches to test suspension, fuel efficiency, and long-term durability.',
    date: 'AUG 10, 2026',
    readTime: '6 MIN READ',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200',
    type: 'article',
    featured: true,
  },
  {
    id: '2',
    category: 'VIDEO',
    title: 'TOP 5 MOST RELIABLE SUVS TO BUY IN HARARE THIS YEAR',
    excerpt: 'Our head inspector breaks down maintenance costs, spare parts availability, and resale values for local buyers.',
    date: 'AUG 04, 2026',
    readTime: '12 MIN WATCH',
    views: '14.2K VIEWS',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    type: 'video',
    featured: false,
  },
  {
    id: '3',
    category: 'BUYER GUIDES',
    title: 'THE ULTIMATE CHECKLIST BEFORE BUYING A PRE-OWNED CAR',
    excerpt: 'Avoid hidden repair bills. Here are the 10 essential mechanical checks every Zimbabwean car buyer must run before making a deposit.',
    date: 'JUL 28, 2026',
    readTime: '8 MIN READ',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    type: 'article',
    featured: false,
  },
  {
    id: '4',
    category: 'VIDEO',
    title: 'WALKAROUND: 2020 BMW 320i M SPORT FULL OVERVIEW',
    excerpt: 'Take a closer look at the exterior styling, executive leather cabin specs, and performance stats of this newly arrived unit.',
    date: 'JUL 21, 2026',
    readTime: '8 MIN WATCH',
    views: '9.8K VIEWS',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
    type: 'video',
    featured: false,
  },
  {
    id: '5',
    category: 'INDUSTRY NEWS',
    title: 'HOW VEHICLE IMPORT DUTIES & REGISTRATION WORK IN 2026',
    excerpt: 'A comprehensive legal and financial breakdown of clearance processes, physical inspection requirements, and paperwork steps.',
    date: 'JUL 15, 2026',
    readTime: '10 MIN READ',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800',
    type: 'article',
    featured: false,
  },
];

export default function NewsAndVideos() {
  const [activeTab, setActiveTab] = useState('ALL');
  const featuredPost = MEDIA_ARTICLES.find((item) => item.featured) || MEDIA_ARTICLES[0];

  const filteredPosts = MEDIA_ARTICLES.filter((item) => {
    if (activeTab === 'ARTICLES') return item.type === 'article';
    if (activeTab === 'VIDEOS') return item.type === 'video';
    return true;
  });

  return (
    <div className="min-h-screen bg-white text-black py-12 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="space-y-4 border-b border-neutral-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-400">
              KAYSETRANS JOURNAL & MEDIA Hub
            </span>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight">
              NEWS & <span className="text-neutral-400">VIDEOS</span>
            </h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-neutral-100 p-1.5 rounded-full self-start md:self-auto">
            {['ALL', 'ARTICLES', 'VIDEOS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-black text-white shadow-md'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Editorial Banner */}
        {activeTab === 'ALL' && (
          <div className="group relative rounded-3xl overflow-hidden bg-neutral-900 text-white grid grid-cols-1 lg:grid-cols-12 min-h-[460px] shadow-2xl">
            <div className="lg:col-span-7 relative overflow-hidden min-h-[280px] lg:min-h-full">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-neutral-900" />
            </div>

            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-8 z-10">
              <div className="space-y-4">
                <span className="bg-white text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest inline-block">
                  FEATURED {featuredPost.category}
                </span>

                <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-tight leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-xs text-neutral-400 font-medium leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-bold uppercase tracking-wider">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredPost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white border border-neutral-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Thumbnail Preview */}
                <div className="aspect-16/9 relative bg-neutral-100 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>

                  {/* Video Play Overlay Badge */}
                  {post.type === 'video' && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-black ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-black italic uppercase tracking-tight text-black group-hover:text-neutral-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="px-6 pb-6 pt-0 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 border-t border-neutral-50 mt-4">
                <span className="flex items-center gap-1 pt-4">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>

                <span className="flex items-center gap-1 pt-4 text-black font-black">
                  {post.type === 'video' ? (
                    <>
                      <Eye className="w-3 h-3 text-neutral-400" />
                      {post.views}
                    </>
                  ) : (
                    post.readTime
                  )}
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}