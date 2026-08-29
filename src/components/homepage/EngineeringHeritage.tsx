import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function EngineeringHeritage() {
  return (
    <section className="bg-[#F8F7F4] text-alkota-black py-28 sm:py-36 font-normal overflow-hidden" aria-label="Engineering Architecture and Heritage">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Editorial Opening */}
        <div className="max-w-3xl mb-20 sm:mb-28">
          <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-3 font-light">
            Engineering & Provenance
          </span>
          <h2 className="font-extralight text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-none mb-6">
            Why Does an Alkota Last?
          </h2>
          <p className="text-base sm:text-lg text-[#555] leading-relaxed font-normal">
            Industrial pressure washers fail at thermal welds and high-speed pumps. Alkota builds around Schedule 80 continuous cold-rolled seamless pipe, slow-turning ceramic triplex plungers, and structural welded steel frames. Handcrafted in Alcester, South Dakota since 1964.
          </p>
        </div>

        {/* Asymmetrical Flowing Engineering Sequence */}
        <div className="space-y-24 sm:space-y-32">
          {/* Item 1: Schedule 80 Coil */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 font-normal">
              <span className="text-3xl sm:text-4xl font-extralight text-alkota-orange block mb-3">
                01
              </span>
              <h3 className="font-light text-2xl sm:text-3xl text-alkota-black leading-tight mb-4">
                Schedule 80 Continuous-Wound Coil
              </h3>
              <p className="text-base text-[#555] leading-relaxed mb-6 font-normal">
                Wound on CNC mandrels with zero internal welds. ASTM A53 seamless steel pipe features 35% heavier wall thickness than commercial Schedule 40 coils, resisting extreme thermal shock and continuous high-pressure cycling.
              </p>
              <div className="text-xs uppercase tracking-wider text-[#777] font-light">
                ASTM A53 Cold-Rolled · 7-Year Guarantee
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="aspect-[16/10] bg-[#EFEFEA] flex items-center justify-center p-8 overflow-hidden">
                <img
                  src="/assets/products/420x4.png"
                  alt="Alkota Schedule 80 Heating Coil Architecture"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Item 2: Slow-Turning Triplex Pump */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="aspect-[16/10] bg-[#EFEFEA] flex items-center justify-center p-8 overflow-hidden">
                <img
                  src="/assets/products/4305xd4.png"
                  alt="Alkota Ceramic Triplex Plunger Pump"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)]"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 font-normal">
              <span className="text-3xl sm:text-4xl font-extralight text-alkota-orange block mb-3">
                02
              </span>
              <h3 className="font-light text-2xl sm:text-3xl text-alkota-black leading-tight mb-4">
                Slow-Turning Ceramic Triplex Pump
              </h3>
              <p className="text-base text-[#555] leading-relaxed mb-6 font-normal">
                Forged brass manifolds and solid ceramic pistons operating at low RPM. Dramatically reduces friction, cavitation, and thermal wear on packings for continuous multi-shift industrial duty.
              </p>
              <div className="text-xs uppercase tracking-wider text-[#777] font-light">
                Forged Brass · Low-RPM Drive · Readily Serviceable
              </div>
            </div>
          </div>

          {/* Item 3: Heritage & Antarctic Provenance */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 font-normal">
              <span className="text-3xl sm:text-4xl font-extralight text-alkota-orange block mb-3">
                03
              </span>
              <h3 className="font-light text-2xl sm:text-3xl text-alkota-black leading-tight mb-4">
                Six Decades of South Dakota Build
              </h3>
              <p className="text-base text-[#555] leading-relaxed mb-6 font-normal">
                Founded in 1964 in Alcester, South Dakota. In 2013, custom Alkota heating systems powered the hot-water drill reaching Subglacial Lake Whillans — 800 metres beneath Antarctic ice — in uninterrupted sub-zero conditions.
              </p>
              <div className="flex items-center gap-6 font-normal">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors no-underline group font-normal"
                >
                  <span>The Alkota Heritage (1964 — Present)</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="aspect-[16/10] bg-[#141412] overflow-hidden">
                <img
                  src="/assets/industries/manufacturing.png"
                  alt="Alkota Manufacturing Plant — Alcester, South Dakota"
                  className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.12]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
