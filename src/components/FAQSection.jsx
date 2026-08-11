import { useState } from 'react';

const FAQ_CATEGORIES = ['ALL', 'BUYING', 'SELLING', 'INSPECTION & FINANCING'];

const FAQ_DATA = [
  {
    id: 1,
    category: 'SELLING',
    question: "How do I know I'm getting a fair price for my car?",
    answer: "We use real-time market data to compare thousands of similar listings. Our 'Deal Rating' system helps you see exactly how a car's price compares to the local market average, ensuring total pricing transparency."
  },
  {
    id: 2,
    category: 'BUYING',
    question: 'Can I buy a car entirely online?',
    answer: 'Yes! You can browse our inventory, apply for financing, and even arrange for home delivery. Our digital process is designed to be seamless, secure, and transparent from start to finish.'
  },
  {
    id: 3,
    category: 'INSPECTION & FINANCING',
    question: 'What is the Kaysetrans Auto inspection process?',
    answer: 'Every vehicle in our showroom undergoes a rigorous 150-point inspection by certified technicians to ensure safety, reliability, and mechanical integrity before it goes up for sale.'
  },
  {
    id: 4,
    category: 'INSPECTION & FINANCING',
    question: 'Do you offer financing for all credit types?',
    answer: 'We work with a diverse network of trusted lenders to provide competitive financing options tailored for a wide range of credit scores and financial backgrounds.'
  },
  {
    id: 5,
    category: 'BUYING',
    question: 'What documents do I need to purchase a vehicle?',
    answer: 'To complete your purchase, you will need a valid driver’s license, current proof of insurance, and your preferred method of payment or loan pre-approval details.'
  },
  {
    id: 6,
    category: 'SELLING',
    question: 'How quickly will I receive payment after selling my car?',
    answer: 'Once the final inspection is completed and the paperwork is signed, payments are processed directly into your bank account via electronic transfer within 24 to 48 hours.'
  },
  {
    id: 7,
    category: 'BUYING',
    question: 'Can I schedule a home test drive?',
    answer: 'Yes! We offer flexible home test-drive appointments for eligible local buyers. Simply select your desired vehicle and schedule a convenient time with our team.'
  },
  {
    id: 8,
    category: 'INSPECTION & FINANCING',
    question: 'Do your vehicles come with a warranty?',
    answer: 'All certified pre-owned vehicles include a standard 90-day/3,000-mile limited powertrain warranty, with extended coverage plans available upon request.'
  }
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [openId, setOpenId] = useState(1);

  const filteredFaqs = activeCategory === 'ALL' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(item => item.category === activeCategory);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-neutral-50 text-black py-20 px-6 md:px-8 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header & Description */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-neutral-400 block mb-2">
            GOT QUESTIONS?
          </span>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight leading-none mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-sm font-semibold text-neutral-500">
            Everything you need to know about buying, selling, financing, and inspecting vehicles at Kaysetrans Auto.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === category
                  ? 'bg-black text-white shadow-md'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:border-black hover:text-black'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Main Content Layout: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Accordion List */}
          <div className="lg:col-span-8 space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden bg-white ${
                    isOpen ? 'border-black shadow-md' : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-extrabold text-sm md:text-base text-black tracking-tight">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-transform ${
                      isOpen ? 'bg-black text-white rotate-45' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      +
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-xs md:text-sm font-medium leading-relaxed text-neutral-600 border-t border-neutral-100 mt-1">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Support & Contact Card */}
          <div className="lg:col-span-4 bg-black text-white rounded-3xl p-8 space-y-6 sticky top-8">
            <span className="text-[10px] font-black tracking-widest uppercase text-neutral-400 block">
              STILL HAVE QUESTIONS?
            </span>
            
            <h3 className="text-2xl font-black italic uppercase leading-tight">
              WE'RE HERE TO HELP YOU 24/7
            </h3>

            <p className="text-xs text-neutral-400 leading-relaxed font-medium">
              Can't find the answer you're looking for? Reach out directly to our customer support team for instant assistance.
            </p>

            <div className="space-y-3 pt-2 border-t border-neutral-800">
              <a 
                href="tel:+18005550199" 
                className="w-full py-3.5 px-6 rounded-full bg-white text-black text-xs font-black uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                CALL SUPPORT
              </a>
              <a 
                href="mailto:support@kaysetrans.com" 
                className="w-full py-3.5 px-6 rounded-full border border-neutral-700 text-white text-xs font-black uppercase tracking-wider hover:bg-neutral-900 transition-colors flex items-center justify-center gap-2"
              >
                EMAIL US
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}