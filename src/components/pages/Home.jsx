import HeroCard from '../HeroCard';
import FindMatch from '../FindMatch';
import WhyChooseUs from '../WhyChooseUs';
import FeaturedStock from '../FeaturedStock';
import NewsSection from '../NewsSection';
import FAQSection from '../FAQSection';
import Seo from '../Seo';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Seo
        title="Kaysetrans Auto — Premium Pre-Owned Cars"
        description="Browse hand-picked vehicles, transparent pricing, and trusted service in Harare, Zimbabwe."
        url="/"
      />
      {/* Hero Section */}
      <HeroCard />

      {/* Main Page Content */}
      <FindMatch />
      <WhyChooseUs />
      <FeaturedStock />
      <NewsSection />
      <FAQSection />
    </div>
  );
}