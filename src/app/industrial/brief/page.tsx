'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { 
  ArrowRight, 
  CheckCircle2, 
  ClipboardCheck, 
  MapPin, 
  Zap, 
  Droplets,
  ShieldCheck,
  Send
} from 'lucide-react';
import Link from 'next/link';

const sections = [
  { id: 'contact', title: 'Project Identity', icon: ClipboardCheck },
  { id: 'site', title: 'Site Logistics', icon: MapPin },
  { id: 'utilities', title: 'Infrastructure', icon: Zap },
  { id: 'requirements', title: 'System Scope', icon: ShieldCheck },
];

export default function EngineeringBrief() {
  const [activeSection, setActiveSection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    company: '',
    sector: '',
    sitePostcode: '',
    accessConstraints: '',
    powerAvailable: '',
    waterAvailable: '',
    requiredThroughput: '',
    environmentalSpecs: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
  };

  const handleNext = () => setActiveSection(prev => Math.min(prev + 1, sections.length - 1));
  const handlePrev = () => setActiveSection(prev => Math.max(prev - 1, 0));

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black overflow-x-hidden">
      <Navigation />

      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange mb-6 block">
              // Project Intake V.01
            </span>
            <h1 className="font-barlow-condensed text-6xl md:text-8xl font-black leading-[0.8] tracking-tighter italic mb-8 uppercase">
              ENGINEERING <br />
              <span className="text-alkota-orange">BRIEF.</span>
            </h1>
            <p className="font-inter text-xl text-alkota-silver max-w-2xl leading-relaxed mb-12">
              Submit your project specifications for a professional site audit 
              and technical consultation. This brief is for Tier 1 infrastructure 
              projects and industrial system deployments.
            </p>
          </motion.div>

          <div className="bg-white border border-alkota-iron shadow-2xl overflow-hidden">
            {!isSubmitted ? (
              <div className="flex flex-col md:flex-row min-h-[600px]">
                {/* Sidebar Navigation */}
                <div className="bg-alkota-black w-full md:w-72 p-8 border-r border-white/5">
                  <div className="space-y-4">
                    {sections.map((section, i) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(i)}
                        className={`w-full flex items-center gap-4 p-4 transition-all border-l-2 ${
                          activeSection === i 
                            ? 'border-alkota-orange bg-white/5 text-white' 
                            : 'border-transparent text-white/40 hover:text-white/60'
                        }`}
                      >
                        <section.icon className="h-4 w-4 shrink-0" />
                        <span className="font-barlow-condensed text-lg font-black italic uppercase tracking-wider">
                          {section.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="flex-1 p-8 md:p-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSection}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-[400px]"
                    >
                      {activeSection === 0 && (
                        <div className="space-y-6">
                          <div>
                            <label className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-alkota-orange mb-2 block">Project Name</label>
                            <input 
                              type="text" 
                              className="w-full bg-alkota-bg border border-alkota-iron p-4 font-inter text-sm outline-none focus:border-alkota-orange"
                              placeholder="e.g. Viking Link Phase 2"
                            />
                          </div>
                          <div>
                            <label className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-alkota-orange mb-2 block">Sector</label>
                            <select className="w-full bg-alkota-bg border border-alkota-iron p-4 font-inter text-sm outline-none focus:border-alkota-orange appearance-none">
                               <option>Oil & Gas</option>
                               <option>Renewables</option>
                               <option>Civil Engineering</option>
                               <option>Food Processing</option>
                               <option>Other Industrial</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {activeSection === 1 && (
                        <div className="space-y-6">
                          <div>
                            <label className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-alkota-orange mb-2 block">Site Postcode / Location</label>
                            <input 
                              type="text" 
                              className="w-full bg-alkota-bg border border-alkota-iron p-4 font-inter text-sm outline-none focus:border-alkota-orange"
                              placeholder="Current focus area"
                            />
                          </div>
                          <div>
                            <label className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-alkota-orange mb-2 block">Access Constraints</label>
                            <textarea 
                              className="w-full bg-alkota-bg border border-alkota-iron p-4 font-inter text-sm outline-none focus:border-alkota-orange h-32"
                              placeholder="e.g. Remote site, restricted turning circle, secure perimeter requirements..."
                            />
                          </div>
                        </div>
                      )}

                      {activeSection === 2 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-alkota-orange mb-2 block">Power Availability</label>
                            <select className="w-full bg-alkota-bg border border-alkota-iron p-4 font-inter text-sm outline-none focus:border-alkota-orange">
                               <option>3-Phase 400V</option>
                               <option>Single Phase 240V</option>
                               <option>Generator Required (Diesel)</option>
                               <option>None / Off-Grid</option>
                            </select>
                          </div>
                          <div>
                            <label className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-alkota-orange mb-2 block">Water Supply</label>
                            <select className="w-full bg-alkota-bg border border-alkota-iron p-4 font-inter text-sm outline-none focus:border-alkota-orange">
                               <option>Mains Supply (High Flow)</option>
                               <option>Mains Supply (Low Flow)</option>
                               <option>Tanker Feeding</option>
                               <option>Borehole / Natural Source</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {activeSection === 3 && (
                        <div className="space-y-6">
                           <div>
                            <label className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-alkota-orange mb-2 block">Required Throughput</label>
                            <input 
                              type="text" 
                              className="w-full bg-alkota-bg border border-alkota-iron p-4 font-inter text-sm outline-none focus:border-alkota-orange"
                              placeholder="e.g. 50 mats per day / continuous 24/7 operation"
                            />
                          </div>
                          <div>
                            <label className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-alkota-orange mb-2 block">Environmental / Biosecurity Needs</label>
                            <textarea 
                              className="w-full bg-alkota-bg border border-alkota-iron p-4 font-inter text-sm outline-none focus:border-alkota-orange h-32"
                              placeholder="List any specific discharge permits or pathogen removal protocols required..."
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-12 flex items-center justify-between border-t border-alkota-iron pt-8">
                    {activeSection > 0 ? (
                      <button 
                        type="button"
                        onClick={handlePrev}
                        className="text-[10px] font-black uppercase tracking-widest text-alkota-silver hover:text-alkota-black transition-colors"
                      >
                        Previous Step
                      </button>
                    ) : <div />}

                    {activeSection < sections.length - 1 ? (
                      <button 
                        type="button"
                        onClick={handleNext}
                        className="bg-alkota-black text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-alkota-orange transition-all flex items-center gap-2"
                      >
                        Next Step <ArrowRight className="h-3 w-3" />
                      </button>
                    ) : (
                      <button 
                        type="submit"
                        className="bg-alkota-orange text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-alkota-black transition-all flex items-center gap-2"
                      >
                        Submit Engineering Brief <Send className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-24 text-center"
              >
                <div className="w-20 h-20 bg-alkota-orange rounded-full flex items-center justify-center mb-8">
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </div>
                <h2 className="font-barlow-condensed text-5xl font-black italic mb-4 uppercase">BRIEF RECEIVED.</h2>
                <div className="h-1 w-16 bg-alkota-orange mb-8" />
                <p className="font-inter text-alkota-silver max-w-md leading-relaxed mb-12">
                  Priority sequence initiated. A project engineer from our industrial systems 
                  division will review your brief and contact you within 4 business hours 
                  to schedule a site consultation.
                </p>
                <Link href="/industrial" className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-alkota-black border-b-2 border-alkota-orange pb-1 hover:text-alkota-orange transition-colors">
                  Return to Industrial Division
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
