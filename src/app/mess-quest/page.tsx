import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Play, ArrowRight, Film, Clock, MapPin, Gauge, Shield, Wrench } from 'lucide-react';
import { messQuestEpisodes } from '@/lib/messQuestEpisodes';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Mess Quest — The Original Series | Alkota UK',
  description:
    'Mess Quest is Alkota’s original video series: Real industrial messes. Real Alkota machines. Real results. Watch our heavy cleaning equipment tackle the dirtiest jobs in the field.',
  alternates: {
    canonical: 'https://alkota.co.uk/mess-quest',
  },
};

export default function MessQuestHubPage() {
  const featured = messQuestEpisodes[0];
  const episodes = messQuestEpisodes.slice(1);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <Navigation />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="px-6 sm:px-12 pb-16 max-w-7xl mx-auto border-b border-[#222]">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-[#FF6900]" />
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#FF6900]">
              ALKOTA ORIGINAL SERIES // FIELD PROOF
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-barlow-condensed text-6xl sm:text-8xl lg:text-9xl font-black uppercase italic tracking-tight text-white leading-[0.85]">
                MESS QUEST.
              </h1>
              <p className="mt-4 font-inter text-base sm:text-xl text-[#ccc] max-w-2xl leading-relaxed">
                We went looking for the most extreme industrial cleaning challenges we could find. Armed with Alkota hot water pressure washers and steam units, we put our engineering to the test on real jobs.
              </p>
            </div>
            <div className="lg:col-span-4 border-l border-[#222] pl-6 font-ibm-plex-mono text-xs text-[#888]">
              <p className="text-white font-bold mb-1">// UNSTAGED INDUSTRIAL CHALLENGES</p>
              <p>No clean studio setups. Just heavy grease, road tar, agricultural mud, and Schedule 80 heat exchangers at work.</p>
            </div>
          </div>
        </section>

        {/* Featured Episode Hero Player */}
        {featured && (
          <section className="px-6 sm:px-12 py-16 max-w-7xl mx-auto border-b border-[#222]">
            <div className="bg-[#111] border border-[#222] p-8 sm:p-12">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-ibm-plex-mono font-bold uppercase tracking-widest text-[#FF6900] bg-[#FF6900]/10 px-3 py-1 border border-[#FF6900]/20">
                  EPISODE 01 // SPOTLIGHT
                </span>
                <span className="text-xs font-ibm-plex-mono text-[#888]">
                  Duration: {featured.duration}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 aspect-video relative bg-black border border-[#222] overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${featured.youtubeId}?rel=0`}
                    title={featured.title}
                    className="w-full h-full border-0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <h2 className="font-barlow-condensed text-3xl sm:text-4xl font-black uppercase italic text-white leading-tight mb-2">
                      {featured.title}
                    </h2>
                    <p className="font-inter text-sm text-[#aaa] leading-relaxed mb-6">
                      {featured.description}
                    </p>

                    <div className="space-y-2.5 font-ibm-plex-mono text-xs text-[#888] border-t border-[#222] pt-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span>MACHINE USED:</span>
                        <span className="text-white font-bold">{featured.machine}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>OPERATING SPEC:</span>
                        <span className="text-[#FF6900] font-bold">{featured.operatingSpec}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>INDUSTRY:</span>
                        <span className="text-white font-bold">{featured.industry}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/machines"
                    className="inline-flex items-center justify-center gap-2 bg-[#FF6900] text-white px-6 py-3.5 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                  >
                    <span>View {featured.machine}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Episodes Grid */}
        <section className="px-6 sm:px-12 py-16 max-w-7xl mx-auto">
          <h3 className="font-barlow-condensed text-4xl sm:text-5xl font-black uppercase italic text-white mb-12 border-b border-[#222] pb-4">
            MORE EPISODES IN THE SERIES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {episodes.map((ep) => (
              <div
                key={ep.id}
                className="border border-[#222] bg-[#0E0E0E] flex flex-col justify-between p-6 hover:border-[#FF6900] transition-colors"
              >
                <div>
                  <div className="aspect-video relative bg-black border border-[#222] mb-6 overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${ep.youtubeId}?rel=0`}
                      title={ep.title}
                      className="w-full h-full border-0"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[9px] font-ibm-plex-mono text-[#888] mb-2">
                    <span className="text-[#FF6900] font-bold">EP. 0{ep.id}</span>
                    <span>{ep.industry}</span>
                  </div>

                  <h4 className="font-barlow-condensed text-2xl font-bold uppercase italic text-white leading-tight mb-2">
                    {ep.title}
                  </h4>

                  <p className="font-inter text-xs text-[#888] line-clamp-3 leading-relaxed mb-4">
                    {ep.description}
                  </p>
                </div>

                <div className="border-t border-[#1C1C1C] pt-3 font-ibm-plex-mono text-[10px] text-[#666] flex items-center justify-between">
                  <span>{ep.machine}</span>
                  <span className="text-[#FF6900]">{ep.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
