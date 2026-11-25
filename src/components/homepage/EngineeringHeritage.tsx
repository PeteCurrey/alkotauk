'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import AccentLine from '../ui/AccentLine';

const INDUSTRIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function EngineeringHeritage() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.8, delay, ease: INDUSTRIAL_EASE },
        };

  return (
    <section
      className="bg-[#F8F7F4] text-alkota-black py-28 sm:py-36 px-6 sm:px-12 font-normal overflow-hidden"
      aria-label="Mechanical Engineering Architecture"
    >
      <div className="mx-auto max-w-7xl w-full">
        {/* Editorial Opening */}
        <div className="max-w-3xl mb-20 sm:mb-28">
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-3">
            <AccentLine widthClass="w-5" />
            <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange font-light">
              Mechanical Architecture
            </span>
          </motion.div>
          <motion.h2
            {...fadeUp(0.1)}
            className="font-extralight text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-none mb-6"
          >
            Why Does an Alkota Last?
          </motion.h2>
          <motion.p
            {...fadeUp(0.2)}
            className="text-base sm:text-lg text-[#555] leading-relaxed font-normal"
          >
            Industrial pressure washers fail at thermal welds and high-speed pumps. Alkota builds around Schedule 80 continuous cold-rolled seamless pipe, slow-turning ceramic triplex plungers, and structural welded steel frames.
          </motion.p>
        </div>

        {/* Asymmetrical Flowing Engineering Sequence */}
        <div className="space-y-24 sm:space-y-32">
          {/* Item 1: Schedule 80 Coil */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUp(0.05)} className="lg:col-span-5 font-normal">
              <span className="text-3xl sm:text-4xl font-extralight text-alkota-orange block mb-3">
                01
              </span>
              <h3 className="font-light text-2xl sm:text-3xl text-alkota-black leading-tight mb-4">
                Schedule 80 Continuous-Wound Coil
              </h3>
              <p className="text-base text-[#555] leading-relaxed mb-6 font-normal">
                Wound on precision CNC mandrels with zero internal welds. ASTM A53 seamless steel pipe features 35% heavier wall thickness than commercial Schedule 40 coils, resisting extreme thermal shock and continuous high-pressure cycling.
              </p>
              <div className="text-xs uppercase tracking-wider text-[#777] font-light">
                ASTM A53 Cold-Rolled · 7-Year Guarantee
              </div>
            </motion.div>
            <motion.div {...fadeUp(0.15)} className="lg:col-span-7">
              <div className="relative aspect-[16/10] bg-[#EFEFEA] flex items-center justify-center p-8 overflow-hidden rounded-[6px] shadow-tactile-sm">
                <div className="relative w-full h-full animate-breathe-subtle">
                  <Image
                    src="/assets/products/420x4.png"
                    alt="Alkota Schedule 80 Heating Coil Architecture"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)]"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Item 2: Slow-Turning Triplex Pump */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUp(0.15)} className="lg:col-span-7 order-2 lg:order-1">
              <div className="relative aspect-[16/10] bg-[#EFEFEA] flex items-center justify-center p-8 overflow-hidden rounded-[6px] shadow-tactile-sm">
                <div className="relative w-full h-full animate-breathe-subtle">
                  <Image
                    src="/assets/products/4305xd4.png"
                    alt="Alkota Ceramic Triplex Plunger Pump"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)]"
                  />
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeUp(0.05)} className="lg:col-span-5 order-1 lg:order-2 font-normal">
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
