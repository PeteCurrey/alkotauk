'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Wrench, Mail, Factory, Loader2, CheckCircle2, X, Volume2, VolumeX } from 'lucide-react';
import Logo from './Logo';

interface MaintenanceScreenProps {
  title?: string;
  message?: string;
  videoId?: string;
}

export default function MaintenanceScreen({ 
  title = "System Maintenance", 
  message = "The Alkota UK platform is currently undergoing scheduled infrastructure upgrades to enhance performance and catalogue accuracy. Access will be restored shortly.",
  videoId = "vFnvcx3vRUY"
}: MaintenanceScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          source: 'maintenance_splash'
        })
      });

      if (!res.ok) throw new Error('Failed to submit');

      setStatus('success');
      setFormData({ name: '', company: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleAdminBypass = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'Vivaro2104!!') {
      // Set a 24-hour cookie for admin bypass
      const expires = new Date(Date.now() + 86400000).toUTCString();
      document.cookie = `alkota_admin_access=true; path=/; expires=${expires}; SameSite=Lax`;
      window.location.reload();
    } else {
      setAdminError(true);
      setTimeout(() => setAdminError(false), 2000);
    }
  };

  const toggleAudio = () => {
    if (!videoRef.current) return;
    const command = isMuted ? 'unMute' : 'mute';
    videoRef.current.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: command, args: '' }),
      '*'
    );
    setIsMuted(!isMuted);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-alkota-black overflow-hidden flex flex-col md:flex-row">
      {/* LEFT: VIDEO BACKGROUND */}
      <div className="relative w-full h-[40vh] md:h-full md:flex-1 bg-alkota-black shrink-0 overflow-hidden">
        {/* YouTube Iframe Background - Oversized to crop black bars */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300vw] h-[300vh] md:w-[150vw] md:h-[150vh] opacity-60 grayscale pointer-events-none">
          <iframe
            ref={videoRef}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-alkota-black/90 md:from-alkota-black to-transparent" />
        
        {/* Diamond plate texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')`,
            backgroundRepeat: 'repeat'
          }}
        />

        {/* Audio Toggle */}
        <button 
          onClick={toggleAudio}
          className="absolute bottom-8 right-8 z-30 flex items-center gap-3 bg-alkota-black/40 border border-white/10 px-4 py-2 hover:bg-alkota-orange transition-all group"
        >
          <span className="text-[9px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">
            Audio: {isMuted ? 'Off' : 'On'}
          </span>
          {isMuted ? (
            <VolumeX className="w-3 h-3 text-white/60 group-hover:text-white" />
          ) : (
            <Volume2 className="w-3 h-3 text-white" />
          )}
        </button>

        {/* Messaging Overlay */}
        <div className="absolute bottom-0 md:bottom-auto md:top-1/2 left-0 w-full p-8 md:p-16 md:-translate-y-1/2 z-10 flex flex-col">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6 mb-10"
          >
             <Logo className="h-10 text-white" />
             <div className="h-[1px] w-12 bg-alkota-orange/50" />
             <Settings className="w-6 h-6 text-alkota-orange animate-spin-slow" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-barlow-condensed text-5xl md:text-8xl font-black italic tracking-tighter uppercase text-white mb-4"
          >
            {title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 !== 0 ? "block md:inline" : ""}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-inter text-alkota-silver max-w-md text-sm md:text-base leading-relaxed"
          >
            {message}
          </motion.p>
        </div>
      </div>

      {/* RIGHT: CONTACT FORM */}
      <div className="w-full md:w-[600px] h-full overflow-y-auto bg-alkota-bg relative z-20 flex flex-col justify-center border-t md:border-t-0 md:border-l border-alkota-iron">
         <div className="p-8 md:p-16">
            <h2 className="font-barlow-condensed text-3xl font-black italic uppercase text-alkota-black mb-2">Need immediate assistance?</h2>
            <p className="font-inter text-alkota-smoke text-sm mb-10">
              Our engineering and sales teams are fully operational. Drop your details below and an Alkota specialist will contact you directly.
            </p>

            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-alkota-green/10 border border-alkota-green/30 p-8 text-center rounded-sm"
              >
                <CheckCircle2 className="w-12 h-12 text-alkota-green mx-auto mb-4" />
                <h3 className="font-bold text-alkota-black uppercase tracking-widest text-sm mb-2">Transmission Confirmed</h3>
                <p className="text-alkota-smoke text-xs">A team member will reach out within the hour.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-alkota-orange text-xs font-bold uppercase hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-alkota-silver mb-2">Full Name *</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white border border-alkota-iron px-4 py-3 text-sm focus:border-alkota-orange focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-alkota-silver mb-2">Company</label>
                    <input 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-white border border-alkota-iron px-4 py-3 text-sm focus:border-alkota-orange focus:outline-none transition-colors"
                      placeholder="Heavy Industries Ltd"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-alkota-silver mb-2">Email Address *</label>
                    <input 
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white border border-alkota-iron px-4 py-3 text-sm focus:border-alkota-orange focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-alkota-silver mb-2">Phone</label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white border border-alkota-iron px-4 py-3 text-sm focus:border-alkota-orange focus:outline-none transition-colors"
                      placeholder="+44 123 456 789"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-alkota-silver mb-2">Request Subject / Model Context</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-white border border-alkota-iron p-4 text-sm focus:border-alkota-orange focus:outline-none transition-colors resize-none"
                    placeholder="We urgently need a quote for a ..."
                  />
                </div>

                <div className="pt-2 border-t border-alkota-iron">
                  <button 
                    disabled={status === 'submitting'}
                    type="submit"
                    className="w-full bg-alkota-orange hover:bg-alkota-orange-hover disabled:bg-alkota-smoke text-white font-black uppercase tracking-widest text-[11px] py-4 transition-colors flex justify-center items-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                    ) : (
                      'Dispatch Request'
                    )}
                  </button>
                </div>

                {status === 'error' && (
                  <p className="text-alkota-orange text-xs text-center font-bold">Error submitting request. Please try again or call us directly.</p>
                )}
              </form>
            )}

            <div className="mt-16 flex items-center justify-between border-t border-alkota-iron pt-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-alkota-silver">Emergency Support</span>
              <span className="text-[10px] font-black text-alkota-black tracking-wider">+44 (0) 123 456 7890</span>
            </div>
         </div>
      </div>

      {/* ADMIN BYPASS (HIDDEN CLICK AREA) */}
      <div 
        onClick={() => setShowAdminLogin(true)}
        className="fixed bottom-0 right-0 w-20 h-20 cursor-help z-[10000] group flex items-end justify-end p-1"
        title="Admin Access Control"
      >
        <div className="w-1 h-1 bg-alkota-orange/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <AnimatePresence>
        {showAdminLogin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10001] bg-alkota-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-sm bg-white p-10 relative"
            >
              <button 
                 onClick={() => setShowAdminLogin(false)}
                 className="absolute top-4 right-4 text-alkota-silver hover:text-alkota-black"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="font-barlow-condensed text-2xl font-black uppercase italic italic text-alkota-black mb-6">Internal Access Controller</h3>
              
              <form onSubmit={handleAdminBypass} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-alkota-silver mb-2">Security Key</label>
                  <input 
                    autoFocus
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className={`w-full bg-alkota-bg border ${adminError ? 'border-alkota-orange' : 'border-alkota-iron'} px-4 py-3 text-sm focus:border-alkota-black focus:outline-none transition-colors`}
                    placeholder="••••••••"
                  />
                  {adminError && (
                    <p className="text-[10px] font-black text-alkota-orange uppercase tracking-widest mt-2 animate-bounce">Access Denied</p>
                  )}
                </div>
                <button 
                  type="submit"
                  className="w-full bg-alkota-black text-white font-black uppercase tracking-widest text-[11px] py-4 hover:bg-alkota-orange transition-colors"
                >
                  Verify Access
                </button>
              </form>
              <p className="text-[10px] text-center text-alkota-silver uppercase tracking-widest mt-6">AL-KOTA_PLATFORM_V4.0</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
