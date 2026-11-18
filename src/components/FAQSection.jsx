import { useState } from 'react';

const FAQ_CATEGORIES = ['ALL', 'BUYING', 'SELLING', 'VEHICLE DETAILS'];

const FAQ_DATA = [
  {
    id: 1,
    category: 'SELLING',
    question: "How do I know I'm getting a fair price for my car?",
    answer: 'Send us the details of your vehicle and our team will discuss a price with you directly.'
  },
  {
    id: 2,
    category: 'BUYING',
    question: 'Can I enquire about a car online?',
    answer: 'Yes. Browse our inventory and contact us about any vehicle. Our team will confirm availability and explain the next steps.'
  },
  {
    id: 3,
    category: 'VEHICLE DETAILS',
    question: 'What details are available about a vehicle?',
    answer: 'Each listing shows the information we hold, such as the year, mileage, transmission and fuel type. Contact us if you would like more detail or to arrange a viewing.'
  },
  {
    id: 4,
    category: 'VEHICLE DETAILS',
    question: 'How do I arrange payment?',
    answer: 'Payment arrangements are discussed directly with our team for the vehicle you are interested in. Contact us to find out what applies to a specific listing.'
  },
  {
    id: 5,
    category: 'BUYING',
    question: 'What documents do I need to purchase a vehicle?',
    answer: 'Requirements depend on the vehicle and the transaction. Contact our team and we will explain what is needed.'
  },
  {
    id: 6,
    category: 'SELLING',
    question: 'When will I be paid after selling my car?',
    answer: 'Timing depends on the vehicle and the completion of the sale. Our team will discuss the next steps with you directly.'
  },
  {
    id: 7,
    category: 'BUYING',
    question: 'Can I arrange a test drive?',
    answer: 'Get in touch about the vehicle you are interested in and our team will arrange a viewing where possible.'
  },
  {
    id: 8,
    category: 'VEHICLE DETAILS',
    question: 'Do vehicles come with a warranty?',
    answer: 'Details vary by vehicle. Ask our team about a specific listing if you would like to know what applies.'
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
              TALK TO OUR TEAM
            </h3>

            <p className="text-xs text-neutral-400 leading-relaxed font-medium">
              Can't find the answer you're looking for? Contact our team directly and we will help where we can.
            </p>

            <div className="space-y-3 pt-2 border-t border-neutral-800">
              <a 
                href="https://wa.me/263784532889" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-white text-black text-xs font-black uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                CHAT ON WHATSAPP
              </a>
              <a 
                href="mailto:tinotendakatsande@gmail.com" 
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