import { useState, useEffect } from 'react';

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const apiKey = '9df1884cd0a44fb7b29297035a4f643f';
      const query = encodeURIComponent(
        '(car OR cars OR automotive OR "electric vehicle" OR EV OR "motor vehicle") AND NOT (crime OR shooting OR court OR murder OR ice)'
      );

      try {
        // Try Primary NewsAPI (Works on localhost)
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`
        );

        if (res.ok) {
          const data = await res.json();
          if (data.articles && data.articles.length > 0) {
            setNews(data.articles);
            return;
          }
        }
        throw new Error('NewsAPI restricted or limited');
      } catch (e) {
        console.warn('Primary news fetch failed, switching to fallback feed...', e);
        
        // Fallback live feed for Vercel/Production
        try {
          const rssUrl = encodeURIComponent('https://www.autocar.co.uk/rss');
          const fallbackRes = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
          const fallbackData = await fallbackRes.json();

          if (fallbackData.items) {
            const formattedArticles = fallbackData.items.map((item) => ({
              title: item.title,
              url: item.link,
              urlToImage:
                item.thumbnail ||
                item.enclosure?.link ||
                'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
              source: { name: fallbackData.feed?.title || 'Autocar' },
            }));
            setNews(formattedArticles);
          }
        } catch (fallbackErr) {
          console.error('Fallback news fetch failed:', fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  // Filter out removed or broken articles
  const validNews = news.filter(
    (article) =>
      article?.urlToImage &&
      article?.title &&
      article?.url &&
      !article.title.includes('[Removed]') &&
      article.urlToImage.startsWith('http')
  );

  const gridArticles = validNews.slice(0, 4);
  const trendingArticles = validNews.slice(4, 9);
  const featuredArticle = validNews[9] || validNews[0];

  return (
    <section id="news" className="px-6 py-24 bg-white border-t border-gray-100 scroll-mt-20">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-black text-gray-900 italic tracking-tighter uppercase">
            News & <span className="text-black">Reviews</span>
          </h2>
          <div className="hidden md:flex gap-2 items-center">
            <span className="w-3 h-3 rounded-full bg-black animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Live Auto Updates
            </span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest animate-pulse">
              Loading live automotive news...
            </p>
          </div>
        ) : validNews.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-3xl">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              No live automotive news available right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left Column: Grid & Featured Story */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* 2x2 Article Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {gridArticles.map((article, index) => (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                    className="group cursor-pointer block"
                  >
                    <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 shadow-lg bg-gray-900">
                      <img 
                        src={article.urlToImage} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                      
                      {article.source?.name && (
                        <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">
                          {article.source.name}
                        </span>
                      )}

                      <div className="absolute bottom-0 p-6">
                        <h3 className="text-white text-base font-extrabold leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Bottom Featured Banner */}
              {featuredArticle && (
                <a
                  href={featuredArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-900 rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden group cursor-pointer"
                >
                  <div className="relative z-10 max-w-lg">
                    <span className="text-red-500 font-black text-xs uppercase tracking-[0.3em]">
                      FEATURED AUTO STORY
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black mt-4 mb-6 italic line-clamp-3 leading-tight uppercase">
                      {featuredArticle.title}
                    </h3>
                    <div className="flex items-center gap-4 font-black uppercase text-xs tracking-widest group-hover:gap-6 transition-all">
                      <span className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold">
                        →
                      </span>
                      Read Full Story
                    </div>
                  </div>

                  {/* Background Image */}
                  <img
                    src={featuredArticle.urlToImage}
                    className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-25 group-hover:scale-105 transition-all duration-700"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-gray-900 via-gray-900/90 to-transparent z-0" />
                </a>
              )}
            </div>

            {/* Right Column: Trending List */}
            <div className="bg-gray-50 rounded-[40px] p-10 h-fit flex flex-col justify-between border border-gray-100">
              <div>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-8">
                  Trending Near You
                </h3>
                <div className="divide-y divide-gray-200">
                  {trendingArticles.map((article, i) => (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={i}
                      className="py-6 flex gap-6 group cursor-pointer first:pt-0"
                    >
                      <span className="text-3xl font-black text-gray-300 group-hover:text-red-600 transition-colors tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-xs font-bold text-gray-800 leading-snug group-hover:text-gray-600 transition-colors line-clamp-2">
                        {article.title}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              <a
                href="https://news.google.com/search?q=automotive"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-10 py-5 border-[3px] border-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white transition-all duration-300 active:scale-[0.98] text-center block"
              >
                See all news
              </a>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}