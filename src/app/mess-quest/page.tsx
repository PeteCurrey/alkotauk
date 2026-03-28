import { Metadata } from 'next';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { messQuestEpisodes } from '@/lib/messQuestEpisodes';

export const metadata: Metadata = {
  title: 'Mess Quest — The Series | Alkota UK',
  description: 'Mess Quest is Alkota UK\'s original video series. Real industrial messes. Real Alkota machines. Watch the team take on the dirtiest, most challenging cleaning jobs they could find.',
  alternates: {
    canonical: 'https://www.alkota.co.uk/mess-quest',
  },
};

export default function MessQuestHubPage() {
  return (
    <main className="min-h-screen bg-alkota-bg">
      {/* HERO SECTION */}
      <section className="relative bg-alkota-black pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden border-b border-alkota-iron">
        {/* Diamond plate texture overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')`,
            backgroundRepeat: 'repeat'
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <p className="font-ibm-plex-mono text-alkota-orange font-bold tracking-[0.2em] uppercase text-sm mb-6">
            // THE ORIGINAL SERIES
          </p>
          <h1 className="font-barlow-condensed text-7xl md:text-9xl font-black italic tracking-tighter text-white uppercase mb-6 drop-shadow-lg">
            MESS QUEST
          </h1>
          <p className="font-inter text-xl md:text-2xl text-alkota-silver font-medium max-w-3xl mx-auto mb-8">
            We went looking for the worst messes we could find. Armed with Alkota machines, we cleaned every single one.
          </p>
          <div className="w-24 h-[2px] bg-alkota-orange mx-auto mb-8" />
          <p className="font-inter text-alkota-smoke max-w-2xl mx-auto leading-relaxed">
            Mess Quest is Alkota's original video series — real industrial cleaning challenges, real machines, real results. No studio. No staged messes. Just genuinely filthy jobs and the equipment built to handle them.
          </p>
        </div>
      </section>

      {/* EPISODE GRID SECTION */}
      <section className="py-24 px-6 bg-alkota-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-ibm-plex-mono text-alkota-orange font-bold tracking-[0.2em] uppercase text-2xl mb-12 border-b border-alkota-iron pb-6">
            // THE EPISODES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {messQuestEpisodes.map((episode) => (
              <div key={episode.id} className="group flex flex-col bg-alkota-steel border border-alkota-iron rounded-sm overflow-hidden transition-all hover:border-alkota-orange/50">
                {/* Video Container (16:9 aspect ratio) */}
                <div className="relative w-full aspect-video bg-alkota-iron border-b border-alkota-iron overflow-hidden">
                  {episode.youtubeId === 'PENDING' ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-alkota-iron">
                      <Play className="w-16 h-16 text-alkota-orange opacity-40 mb-4" />
                      <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-smoke font-bold">
                        Episode Coming Soon
                      </span>
                    </div>
                  ) : (
                    <iframe
                      src={`https://www.youtube.com/embed/${episode.youtubeId}`}
                      title={episode.title}
                      className="absolute top-0 left-0 w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      loading="lazy"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-ibm-plex-mono text-xs font-black tracking-widest text-alkota-orange bg-alkota-orange/10 px-2 py-1 uppercase">
                      EP. {episode.id.toString().padStart(2, '0')}
                    </span>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-smoke">
                      {episode.industry !== 'TBC' ? episode.industry : 'INDUSTRY PENDING'}
                    </span>
                  </div>

                  <h3 className="font-barlow-condensed text-3xl font-bold uppercase text-white mb-4 italic tracking-tight">
                    {episode.title}
                  </h3>

                  <p className="font-inter text-sm text-alkota-silver leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {episode.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-alkota-iron/50">
                    <span className="inline-flex items-center rounded-sm bg-alkota-iron px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-alkota-silver border border-alkota-steel">
                      Machine: {episode.machine}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERIES STATEMENT SECTION */}
      <section className="py-24 px-6 bg-alkota-black border-y border-alkota-iron relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-alkota-orange/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="font-barlow-condensed text-5xl md:text-7xl font-black uppercase text-white tracking-tighter italic mb-12 drop-shadow-md">
            "If it makes a mess, an Alkota cleans it."
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full border-t border-alkota-iron pt-12">
            <div className="flex flex-col gap-2 w-full md:w-auto text-center">
               <span className="font-barlow-condensed font-black text-3xl text-alkota-orange uppercase tracking-tight italic">Multiple Episodes</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-alkota-iron" />
            <div className="flex flex-col gap-2 w-full md:w-auto text-center">
               <span className="font-barlow-condensed font-black text-3xl text-alkota-orange uppercase tracking-tight italic">Real Industrial Jobs</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-alkota-iron" />
            <div className="flex flex-col gap-2 w-full md:w-auto text-center">
               <span className="font-barlow-condensed font-black text-3xl text-alkota-orange uppercase tracking-tight italic">Zero Staged Messes</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-6 bg-alkota-steel text-center border-b border-alkota-iron">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-barlow-condensed text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-6 drop-shadow-md">
            Got a mess that needs meeting?
          </h2>
          <p className="font-inter text-lg text-alkota-silver font-medium leading-relaxed mb-12">
            If you've got a cleaning challenge that belongs in the series — or just need the right machine for a serious job — we want to hear about it.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link 
              href="/tools/machine-match"
              className="bg-alkota-orange hover:bg-alkota-orange-bright text-white uppercase font-black tracking-widest text-sm px-10 py-5 rounded-sm transition-all shadow-[0_4px_20px_rgba(255,105,0,0.3)] hover:shadow-[0_6px_25px_rgba(255,105,0,0.4)] hover:-translate-y-0.5"
            >
              Find Your Machine →
            </Link>
            <Link 
              href="/quote"
              className="bg-alkota-black border border-alkota-iron hover:border-alkota-silver text-white uppercase font-bold tracking-widest text-sm px-10 py-5 rounded-sm transition-all"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
