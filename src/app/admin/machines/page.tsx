import { client } from '@/sanity/client';
import Link from 'next/link';

export default async function AdminMachinesPage() {
  const machinesData = await client.fetch(`*[_type == "machine"]`);
  
  const byCategory = (machinesData || []).reduce((acc: any, m: any) => {
    if (!acc[m.category]) acc[m.category] = [];
    acc[m.category].push(m);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="text-white">
      <div className="mb-8">
        <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">Machines</h1>
        <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">
          // {(machinesData?.length || 0)} machines — sourced from <code className="text-[#FF6900]">Supabase Inventory</code>
        </p>
      </div>

      <div className="border border-[#333] bg-[#0D0D0D] p-5 mb-6">
        <p className="font-ibm-plex-mono text-[10px] text-[#F59E0B] uppercase tracking-widest mb-1">// Data Source</p>
        <p className="font-inter text-[13px] text-[#888]">
          Machine data is served from the static TypeScript file <strong className="text-white">src/lib/machines.ts</strong>.
          To add or edit machines, update that file and push to GitHub — no database required.
          A future migration can move this to Supabase when needed.
        </p>
      </div>

      {Object.entries(byCategory).map(([category, machines]) => (
        <div key={category} className="mb-6">
          <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] mb-2">{category.replace('-', ' ')}</p>
          <div className="border border-[#222]">
            <table className="w-full">
              <thead>
                <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
                  {['Name', 'Series', 'Pressure', 'Flow', 'Power', 'View'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {machines.map((m, i) => (
                  <tr key={m.id} style={{ borderBottom: '1px solid #1A1A1A', background: i % 2 === 0 ? '#111' : '#0D0D0D' }}>
                    <td className="px-4 py-3 font-inter text-[13px] text-white">{m.name}</td>
                    <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#888]">{m.series}</td>
                    <td className="px-4 py-3 font-ibm-plex-mono text-[11px] text-[#FF6900]">{m.specs.pressureBar} bar</td>
                    <td className="px-4 py-3 font-ibm-plex-mono text-[11px] text-[#888]">{m.specs.flowLPM} lpm</td>
                    <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#666]">{m.specs.powerSource}</td>
                    <td className="px-4 py-3">
                      <Link href={m.slug} target="_blank" className="font-ibm-plex-mono text-[9px] text-[#FF6900] hover:underline uppercase tracking-widest">
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
