export default function WhyChooseUs() {
  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto bg-black text-white rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side: Title & Feature Bullet Points */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight">
            Why Choose us
          </h2>

          <ul className="space-y-3 text-base md:text-lg font-bold">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
              150-Point Certified Inspections
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
              7-Day Money Back Guarantee
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
              Direct Home Delivery
            </li>
          </ul>
        </div>

        {/* Right Side: High-Contrast Pill CTA Button */}
        <div>
          <a
            href="#inventory"
            className="inline-block bg-white text-black font-extrabold uppercase tracking-wider text-xs md:text-sm py-4 px-8 rounded-full hover:bg-neutral-200 transition-colors"
          >
            BROWSE INVENTORY
          </a>
        </div>

      </div>
    </section>
  );
}