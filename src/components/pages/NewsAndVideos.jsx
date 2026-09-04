import { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export default function NewsAndVideos() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [mediaArticles, setMediaArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLiveNews() {
      const apiKey = '9df1884cd0a44fb7b29297035a4f643f';
      const query = encodeURIComponent(
        '(car OR cars OR automotive OR "electric vehicle" OR EV OR "motor vehicle") AND NOT (crime OR shooting OR court OR murder OR ice)'
      );

      // Helper function to map raw articles into your component's state format
      const formatArticles = (articles) => {
        return articles
          .filter(
            (art) =>
              art.urlToImage &&
              art.title &&
              art.url &&
              !art.title.includes('[Removed]') &&
              art.urlToImage.startsWith('http')
          )
          .map((art, idx) => {
            const textContent = `${art.title || ''} ${art.description || ''} ${art.content || ''}`;
            const wordCount = textContent.trim().split(/\s+/).length;
            const estimatedMinutes = Math.max(1, Math.ceil(wordCount / 200));

            const formattedDate = art.publishedAt
              ? new Date(art.publishedAt)
                  .toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
                  .toUpperCase()
              : 'RECENT';

            return {
              id: art.url || String(idx),
              category: art.source?.name ? art.source.name.toUpperCase().slice(0, 20) : 'AUTOMOTIVE',
              title: art.title,
              excerpt: art.description || 'Click to read full story on the original news source.',
              date: formattedDate,
              readTime: `${estimatedMinutes} MIN READ`,
              image: art.urlToImage,
              featured: idx === 0,
              url: art.url,
              author: art.author || art.source?.name || 'Automotive News',
            };
          });
      };

      try {
        setLoading(true);
        setError(null);

        // Try primary NewsAPI fetch
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=12&apiKey=${apiKey}`
        );

        if (res.ok) {
          const data = await res.json();
          const transformed = formatArticles(data.articles || []);
          if (transformed.length > 0) {
            setMediaArticles(transformed);
            return;
          }
        }

        throw new Error('NewsAPI limited or unavailable on production domain');
      } catch (err) {
        console.warn('NewsAPI primary fetch failed, switching to live RSS fallback...', err);

        // Fallback live RSS feed via rss2json (Production-safe)
        try {
          const rssUrl = encodeURIComponent('https://www.autocar.co.uk/rss');
          const fallbackRes = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
          
          if (!fallbackRes.ok) {
            throw new Error('Failed to reach fallback news service.');
          }

          const fallbackData = await fallbackRes.json();

          if (fallbackData.items && fallbackData.items.length > 0) {
            const rssArticles = fallbackData.items.map((item) => ({
              title: item.title,
              description: item.description?.replace(/<[^>]*>?/gm, '') || item.content?.replace(/<[^>]*>?/gm, ''),
              url: item.link,
              urlToImage:
                item.thumbnail ||
                item.enclosure?.link ||
                'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
              publishedAt: item.pubDate,
              source: { name: fallbackData.feed?.title || 'Autocar' },
              author: item.author || 'Autocar Editorial',
            }));

            const transformedFallback = formatArticles(rssArticles);

            if (transformedFallback.length > 0) {
              setMediaArticles(transformedFallback);
              return;
            }
          }

          throw new Error('No articles found in fallback news feed.');
        } catch (fallbackErr) {
          console.error('Fallback fetch error:', fallbackErr);
          setError('Unable to load live articles at this moment.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchLiveNews();
  }, []);

  const featuredPost = mediaArticles.find((item) => item.featured) || mediaArticles[0];

  return (
    <div className="min-h-screen bg-white text-black py-12 px-6 md:px-12 font-sans">
      <Seo title="News & Updates — Kaysetrans Journal" description="Latest automotive news, reviews, and updates curated for car buyers and enthusiasts in Zimbabwe." url="/news" />
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="space-y-4 border-b border-neutral-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-400">
              KAYSETRANS JOURNAL & MEDIA HUB
            </span>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight">
              NEWS & <span className="text-neutral-400">UPDATES</span>
            </h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-neutral-100 p-1.5 rounded-full self-start md:self-auto">
            {['ALL', 'LATEST'].map((tab) => (
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

        {loading ? (
          <div className="py-24 flex items-center justify-center text-xs font-black uppercase tracking-widest text-neutral-400 gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-black" />
            Fetching Live Automotive News...
          </div>
        ) : error ? (
          <div className="py-16 text-center border border-dashed border-neutral-200 rounded-3xl p-8 max-w-md mx-auto space-y-3">
            <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto" />
            <p className="text-xs font-black uppercase tracking-widest text-neutral-500">
              {error}
            </p>
          </div>
        ) : (
          <>
            {/* Featured Editorial Banner */}
            {activeTab === 'ALL' && featuredPost && (
              <a
                href={featuredPost.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-3xl overflow-hidden bg-neutral-900 text-white grid grid-cols-1 lg:grid-cols-12 min-h-[460px] shadow-2xl block"
              >
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
                      {featuredPost.category}
                    </span>

                    <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-tight leading-tight">
                      {featuredPost.title}
                    </h2>

                    <p className="text-xs text-neutral-400 font-medium leading-relaxed line-clamp-3">
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

                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* Media Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mediaArticles.slice(activeTab === 'ALL' ? 1 : 0).map((post) => (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border border-neutral-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer block"
                >
                  <div>
                    {/* Thumbnail Preview */}
                    <div className="aspect-16/9 relative bg-neutral-100 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Source/Category Badge */}
                      <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-black italic uppercase tracking-tight text-black group-hover:text-neutral-600 transition-colors leading-snug line-clamp-2">
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
                      <Clock className="w-3 h-3 text-neutral-400" />
                      {post.readTime}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}