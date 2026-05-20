'use client';

import { useState } from 'react';
import { Database, RefreshCw, Layers } from 'lucide-react';

export default function DbUtilitiesPage() {
  const [running, setRunning] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const runUtility = async (name: string, endpoint: string, method = 'GET') => {
    setRunning(name);
    addLog(`Starting ${name}...`);
    try {
      const res = await fetch(endpoint, { method });
      const data = await res.json();
      if (res.ok && data.success !== false) {
        addLog(`SUCCESS: ${data.message || 'Operation completed successfully.'}`);
      } else {
        addLog(`ERROR: ${data.error || 'Operation failed.'}`);
      }
    } catch (err: any) {
      addLog(`FATAL ERROR: ${err.message || 'Network error occurred.'}`);
    } finally {
      setRunning(null);
    }
  };

  return (
    <div className="text-white max-w-4xl pb-32">
      <div className="mb-8">
        <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">Database Utilities</h1>
        <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// Maintain database structures & data seeding</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Migration Utility */}
        <div className="p-6 border border-[#222] bg-[#141414] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="h-6 w-6 text-[#FF6900]" />
              <h2 className="font-barlow-condensed text-xl font-black uppercase italic">Migrate & Sync Static Catalogue</h2>
            </div>
            <p className="font-inter text-xs text-[#888] leading-relaxed mb-6">
              Queries the 35 static machine configurations in the codebase and upserts them directly into the <code>products</code> table. Safe to run repeatedly; uses slug conflict resolution to prevent duplicates.
            </p>
          </div>
          <button
            onClick={() => runUtility('Migrate & Sync', '/api/migrate')}
            disabled={running !== null}
            className="w-full bg-[#FF6900] hover:bg-[#e55f00] text-white font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest py-3 transition-colors disabled:opacity-50"
          >
            {running === 'Migrate & Sync' ? 'Executing...' : 'Run Migration & Sync'}
          </button>
        </div>

        {/* Catalog Seeder Utility */}
        <div className="p-6 border border-[#222] bg-[#141414] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Layers className="h-6 w-6 text-[#FF6900]" />
              <h2 className="font-barlow-condensed text-xl font-black uppercase italic">Run Complete Catalogue Seeder</h2>
            </div>
            <p className="font-inter text-xs text-[#888] leading-relaxed mb-6">
              Executes the full database seeder. This seeds products, chemicals, and bespoke builds, mapping descriptions and specifications to the Supabase tables. Useful for a fresh database setup.
            </p>
          </div>
          <button
            onClick={() => runUtility('Seeder', '/api/admin/seed-catalogue', 'POST')}
            disabled={running !== null}
            className="w-full border border-[#333] hover:border-[#FF6900] hover:bg-[#1A1A1A] text-white font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest py-3 transition-colors disabled:opacity-50"
          >
            {running === 'Seeder' ? 'Executing...' : 'Run Complete Seeder'}
          </button>
        </div>
      </div>

      {/* Logs Console */}
      <div className="border border-[#222] bg-[#0D0D0D] p-6 font-ibm-plex-mono text-[11px] text-green-400">
        <div className="flex justify-between items-center mb-4 border-b border-[#222] pb-2">
          <span className="text-[#555] uppercase tracking-widest font-black text-[9px]">// Console Log output</span>
          <button
            onClick={() => setLogs([])}
            className="text-[#555] hover:text-white uppercase tracking-widest text-[9px]"
          >
            Clear Logs
          </button>
        </div>
        <div className="h-60 overflow-y-auto space-y-1.5 scrollbar-thin">
          {logs.length === 0 ? (
            <p className="text-[#333] italic">Console is idle. Trigger a utility above to see logs...</p>
          ) : (
            logs.map((log, i) => <p key={i}>{log}</p>)
          )}
        </div>
      </div>
    </div>
  );
}
