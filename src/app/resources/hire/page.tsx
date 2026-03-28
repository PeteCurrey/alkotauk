import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Pressure Washer Hire | Alkota UK',
  description: 'Hire the Platinum Standard. Short-term and long-term industrial pressure washer hire across the UK.',
};

export default function HirePage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6 text-center">
        <h1 className="mb-6 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          ALKOTA UK <span className="text-alkota-orange">HIRE.</span>
        </h1>
        <div className="inline-block border-2 border-alkota-orange px-6 py-2 text-alkota-orange font-bold tracking-widest uppercase mb-12">
           Coming Soon
        </div>
        
        <p className="text-xl text-alkota-silver max-w-2xl mx-auto mb-16">
          We are finalizing our nationwide Platinum Standard hire fleet. Soon, you will be able to hire Alkota Hot Water Trailers, Van Packs, and heavy-duty electric statics on short-term or long-term contracts.
        </p>

        <div className="border border-alkota-iron bg-alkota-steel/30 p-12 max-w-2xl mx-auto text-left">
           <h3 className="text-2xl font-black italic uppercase text-white mb-4">Register Your Interest</h3>
           <p className="text-sm text-alkota-silver mb-8">Be the first to know when the hire fleet goes live. Drop your details below.</p>
           
           {/* Placeholder for HubSpot Form */}
           <div className="space-y-4">
              <div className="animate-pulse h-12 bg-alkota-iron/50 rounded-sm"></div>
              <div className="animate-pulse h-12 bg-alkota-iron/50 rounded-sm"></div>
              <div className="animate-pulse h-12 bg-alkota-orange/80 w-1/3 rounded-sm mt-8"></div>
           </div>
        </div>
      </div>
    </main>
  );
}
