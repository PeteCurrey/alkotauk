import BespokeForm from '../BespokeForm';
export default function NewBespokePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">New Bespoke Build</h1>
        <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// Trailer, wash plant, skid unit or stationary</p>
      </div>
      <BespokeForm />
    </div>
  );
}
