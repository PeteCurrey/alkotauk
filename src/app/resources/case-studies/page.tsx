import Navigation from '@/components/Navigation';
import { safeFetch } from '@/sanity/client';
import Link from 'next/link';

export const metadata = {
  title: 'Case Studies | Alkota UK',
  description: 'Real-world examples of Alkota Cleaning Systems solving the toughest industrial cleaning challenges.',
};

export default async function CaseStudiesPage() {
  const query = `*[_type == "caseStudy"] | order(_createdAt desc) {
    title, slug, industry->{name}, client, "imageUrl": featuredImage.asset->url
  }`;
  const cases = await safeFetch(query, []);
  
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-7xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          CASE <span className="text-alkota-orange">STUDIES.</span>
        </h1>
        {cases.length === 0 ? (
          <p className="text-xl text-alkota-silver border-l-4 border-alkota-orange pl-6 py-2 bg-alkota-iron/30">
            Case studies are currently being curated. Check back soon for in-depth examples of our machines performing in the field.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
             {cases.map((cs: any) => (
                <div key={cs.slug.current} className="border border-alkota-iron bg-alkota-steel/30 p-8">
                   <h3 className="text-2xl font-black uppercase italic mb-2 text-white">{cs.title}</h3>
                   <p className="text-alkota-orange font-bold uppercase text-xs tracking-widest mb-4">{cs.industry?.name} | {cs.client}</p>
                   {/* Full case study stub */}
                </div>
             ))}
          </div>
        )}
      </div>
    </main>
  );
}
