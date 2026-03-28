import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Warranty & Registration | Alkota UK',
  description: 'Register your new Alkota pressure washer and review our comprehensive UK warranty terms.',
};

export default function WarrantyPage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          WARRANTY <span className="text-alkota-orange">& REGISTRATION.</span>
        </h1>
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-a:text-alkota-orange">
          <p className="lead text-xl text-alkota-silver bg-alkota-iron/30 p-6 border-l-4 border-alkota-orange">
            Alkota Cleaning Systems are backed by the most robust warranty in the industry. Including a 7-year guarantee on our patented hydro-insulated coils.
          </p>
          
          <h2 className="text-3xl mt-12 mb-6">Standard Coverage</h2>
          <ul>
            <li><strong>Patented Heating Coils:</strong> 7 Years (Pro-rated after year 5)</li>
            <li><strong>Pumps:</strong> 5 Years (General Pumps) or as determined by manufacturer</li>
            <li><strong>Electric Motors:</strong> 1 Year</li>
            <li><strong>Burner Motors:</strong> 1 Year</li>
            <li><strong>Other Components (Valves, switches, etc):</strong> 90 Days</li>
          </ul>

          <h2 className="text-3xl mt-12 mb-6">Register Your Machine</h2>
          <p>
            Please complete the warranty registration form within 30 days of purchase to activate your coverage.
          </p>
          
          <div className="mt-8 border border-alkota-iron bg-alkota-steel/30 p-8 text-center">
            <h3 className="text-2xl font-black italic mb-4">Registration Form</h3>
            <p className="text-alkota-steel text-sm mb-6">A HubSpot or custom form will be loaded here to capture serial number, dealer info, and purchase date.</p>
            <div className="animate-pulse bg-alkota-iron h-12 w-full max-w-md mx-auto rounded-sm"></div>
            <div className="animate-pulse bg-alkota-iron h-12 w-full max-w-md mx-auto rounded-sm mt-4"></div>
            <div className="animate-pulse bg-alkota-iron h-12 w-full max-w-md mx-auto rounded-sm mt-4"></div>
            <div className="animate-pulse bg-alkota-orange h-12 w-32 mx-auto rounded-sm mt-8"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
