import HeroCard from '../HeroCard';
import FindMatch from '../FindMatch';
import WhyChooseUs from '../WhyChooseUs';
import FeaturedStock from '../FeaturedStock';
import NewsSection from '../NewsSection';
import FAQSection from '../FAQSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
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