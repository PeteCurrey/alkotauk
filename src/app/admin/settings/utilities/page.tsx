'use client';

import { useState } from 'react';
import { Database, RefreshCw, Layers } from 'lucide-react';

export default function DbUtilitiesPage() {
  const [running, setRunning] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [dbHealth, setDbHealth] = useState<{
    healthy: boolean;
    existing: string[];
    missing: string[];
    fixSql: string | null;
  } | null>(null);
  const [dbChecking, setDbChecking] = useState(false);

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

  const runDbCheck = async () => {
    setDbChecking(true);
    setDbHealth(null);
    try {
      const res = await fetch('/api/admin/db-check');
      const data = await res.json();
      setDbHealth(data);
      addLog(data.healthy
        ? 'DB Check: enquiries table is healthy — all columns present.'
        : `DB Check: enquiries table is missing ${data.missing.length} column(s): ${data.missing.join(', ')}`
      );
    } catch (err: any) {
      addLog(`DB Check ERROR: ${err.message}`);
    } finally {
      setDbChecking(false);
    }
  };

  return (
    <div className="text-white max-w-4xl pb-32">
      <div className="mb-8">
        <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">Database Utilities</h1>
        <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// Maintain database structures & data seeding</p>
      </div>

      {/* ── Database Health Check ─────────────────────────────────────────── */}
      <div className="p-6 border border-[#222] bg-[#141414] mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Database className="h-6 w-6 text-[#FF6900]" />
            <h2 className="font-barlow-condensed text-xl font-black uppercase italic">Database Health Check</h2>
          </div>
          <button
            onClick={runDbCheck}
            disabled={dbChecking}
            className="flex items-center gap-2 px-5 py-2 bg-[#FF6900] hover:bg-[#e55f00] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${dbChecking ? 'animate-spin' : ''}`} />
            {dbChecking ? 'Checking...' : 'Run Check'}
          </button>
        </div>
        <p className="font-inter text-xs text-[#888] leading-relaxed mb-4">
          Checks that all required columns exist in the <code className="text-[#FF6900]">enquiries</code> table. 
          If columns are missing, the contact form will save to email only and not appear in the admin dashboard.
        </p>

        {dbHealth && (
          <div className="mt-4 space-y-3">
            <div className={`flex items-center gap-2 p-3 border ${dbHealth.healthy ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
              <div className={`h-2 w-2 rounded-full ${dbHealth.healthy ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest">
                {dbHealth.healthy
                  ? 'All columns present — table is healthy'
                  : `${dbHealth.missing.length} column(s) missing: ${dbHealth.missing.join(', ')}`}
              </span>
            </div>

            {!dbHealth.healthy && dbHealth.fixSql && (
              <div>
                <p className="font-ibm-plex-mono text-[9px] text-[#555] uppercase tracking-widest mb-2">
                  Run this SQL in Supabase Dashboard → SQL Editor → New Query:
                </p>
                <a
                  href="https://supabase.com/dashboard/project/xohftjaohhkwgxdnouoo/sql/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mb-2 font-ibm-plex-mono text-[9px] text-[#FF6900] hover:underline uppercase tracking-widest"
                >
                  → Open Supabase SQL Editor ↗
                </a>
                <pre className="bg-[#0D0D0D] border border-[#333] p-4 font-ibm-plex-mono text-[10px] text-green-400 overflow-x-auto whitespace-pre-wrap">
                  {dbHealth.fixSql}
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(dbHealth.fixSql!);
                    addLog('SQL copied to clipboard.');
                  }}
                  className="mt-2 px-4 py-2 border border-[#333] hover:border-[#FF6900] text-white font-ibm-plex-mono text-[9px] uppercase tracking-widest transition-colors"
                >
                  Copy SQL to Clipboard
                </button>
              </div>
            )}
          </div>
        )}
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
