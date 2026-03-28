import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Wash Plant Management | Alkota UK',
  description: 'Enterprise fleet management, lifecycle planning, and Planned Preventative Maintenance (PPM) for multi-site wash operations.',
};

export default function WashPlantPage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-6 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          WASH PLANT <span className="text-alkota-orange">MANAGEMENT.</span>
        </h1>
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-a:text-alkota-orange">
          <p className="lead text-xl text-alkota-silver border-l-4 border-alkota-orange pl-6 py-2 bg-alkota-iron/30">
            Operating a multi-site wash plant or large fleet of industrial machines requires strategic lifecycle planning. Alkota UK provides comprehensive management services for enterprise applications.
          </p>

          <h2 className="text-3xl mt-12 mb-6">Planned Preventative Maintenance (PPM)</h2>
          <p>
            We deploy nationwide service agents to conduct routine PPM, ensuring maximum up-time. Our proactive approach identifies wear components before they fail, saving you the cost of unscheduled downtime.
          </p>
          
          <h2 className="text-3xl mt-12 mb-6">Total Cost of Ownership Analysis</h2>
          <p>
            Stop replacing cheap machines every 12 months. Let our engineers conduct a TCO analysis on your wash operation. We can demonstrate how investing in the Platinum Standard, paired with an effective maintenance schedule, rapidly pays for itself compared to the continuous CAPEX of replacing inferior equipment.
          </p>
          
          <div className="mt-16 bg-alkota-orange p-8 text-center sm:text-left sm:flex justify-between items-center group">
             <div>
                 <h3 className="text-2xl font-black italic uppercase text-white mb-2">Enterprise Enquiry</h3>
                 <p className="text-sm font-bold text-white max-w-md">Speak directly to an Alkota UK management specialist about your national fleet.</p>
             </div>
             <button className="mt-6 sm:mt-0 shrink-0 border-2 border-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-white hover:text-alkota-orange hover:bg-white transition-colors">
                Contact Strategy Team
             </button>
          </div>
        </div>
      </div>
    </main>
  );
}
