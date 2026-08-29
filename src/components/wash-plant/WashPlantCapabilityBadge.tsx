import { CapabilityBadgeLabel } from '@/lib/types/wash-plant';

interface Props {
  label: CapabilityBadgeLabel;
  className?: string;
}

export default function WashPlantCapabilityBadge({ label, className = '' }: Props) {
  let style = 'bg-[#181818] text-[#999] border-[#333]';

  if (label === 'VERIFIED ALKOTA BUILD') {
    style = 'bg-[#FF6900]/10 text-alkota-orange border-[#FF6900]/30 font-medium';
  } else if (label === 'PROJECT DEPENDENT' || label === 'ENGINEERED TO APPLICATION') {
    style = 'bg-blue-950/40 text-blue-400 border-blue-800/40';
  } else if (label === 'DATA-READY' || label === 'REMOTE MONITORING CAPABLE') {
    style = 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40';
  } else if (label === 'INTEGRATION AVAILABLE') {
    style = 'bg-purple-950/40 text-purple-400 border-purple-800/40';
  } else if (label.includes('SUBJECT TO')) {
    style = 'bg-amber-950/40 text-amber-400 border-amber-800/40';
  }

  return (
    <span
      className={`inline-block font-ibm-plex-mono text-[8px] uppercase tracking-widest px-2 py-0.5 border ${style} ${className}`}
    >
      {label}
    </span>
  );
}
