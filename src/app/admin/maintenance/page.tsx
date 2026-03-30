'use client';

import { useState, useEffect } from 'react';
import { Power, AlertTriangle, CheckCircle, Save } from 'lucide-react';

export default function MaintenancePage() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data: Array<{ key: string; value: string }>) => {
        const map: Record<string, string> = {};
        data.forEach((row) => { map[row.key] = row.value; });
        setSettings(map);
        setLoading(false);
      });
  }, []);

  const isActive = settings['maintenance_mode'] === 'true';

  async function toggle() {
    const newVal = isActive ? 'false' : 'true';
    setSaving(true);
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'maintenance_mode', value: newVal }),
    });
    setSettings((s) => ({ ...s, maintenance_mode: newVal }));
    setSaving(false);
  }

  async function saveFields() {
    setSaving(true);
    const keys = ['maintenance_message', 'maintenance_phone', 'maintenance_lead_capture', 'maintenance_lead_heading'];
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(keys.map((k) => ({ key: k, value: settings[k] || '' }))),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function set(key: string, value: string) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  if (loading) return (
    <div className="text-white flex items-center justify-center h-64">
      <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#444]">Loading...</p>
    </div>
  );

  return (
    <div className="text-white max-w-3xl">
      <div className="mb-8">
        <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">Maintenance Mode</h1>
        <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// Control public site access</p>
      </div>

      {/* Status Indicator */}
      <div
        className="p-6 mb-6 border flex items-center gap-4"
        style={{
          borderColor: isActive ? '#EF444466' : '#22C55E66',
          background: isActive ? '#EF444408' : '#22C55E08',
        }}
      >
        <div className="h-4 w-4 rounded-full animate-pulse" style={{ background: isActive ? '#EF4444' : '#22C55E' }} />
        <div>
          <p className="font-barlow-condensed text-2xl font-black italic" style={{ color: isActive ? '#EF4444' : '#22C55E' }}>
            {isActive ? 'MAINTENANCE MODE: ACTIVE' : 'SITE LIVE'}
          </p>
          <p className="font-inter text-[13px]" style={{ color: isActive ? '#EF4444aa' : '#22C55Eaa' }}>
            {isActive
              ? 'The site is currently showing the maintenance screen to all visitors.'
              : 'The site is operating normally.'}
          </p>
        </div>
      </div>

      {/* Main Toggle */}
      <div className="border border-[#222] bg-[#141414] p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-barlow-condensed text-2xl font-black uppercase italic text-white mb-1">Maintenance Mode</h2>
            <p className="font-inter text-[13px]" style={{ color: isActive ? '#FF6900aa' : '#888' }}>
              {isActive
                ? 'Maintenance screen is ACTIVE — visitors cannot access the site.'
                : 'Site is LIVE — visitors see the full website.'}
            </p>
          </div>
          <button
            onClick={toggle}
            disabled={saving}
            className="relative inline-flex h-8 w-14 items-center rounded-none transition-colors duration-300"
            style={{ background: isActive ? '#FF6900' : '#1A1A1A', border: '1px solid', borderColor: isActive ? '#FF6900' : '#333' }}
            aria-label="Toggle maintenance mode"
          >
            <span
              className="inline-block h-6 w-6 transform transition-transform duration-300"
              style={{
                background: '#fff',
                transform: isActive ? 'translateX(28px)' : 'translateX(2px)',
              }}
            />
          </button>
        </div>
      </div>

      {/* Customise Screen */}
      <div className="border border-[#222] bg-[#141414] p-6 mb-6">
        <h2 className="font-barlow-condensed text-2xl font-black uppercase italic text-white mb-6">Customise the Maintenance Screen</h2>

        <div className="space-y-5">
          <div>
            <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-2">Maintenance Message</label>
            <textarea
              value={settings['maintenance_message'] || ''}
              onChange={(e) => set('maintenance_message', e.target.value)}
              rows={3}
              className="w-full bg-[#0D0D0D] border border-[#222] text-white px-4 py-3 font-inter text-[13px] resize-none focus:outline-none focus:border-[#FF6900]"
            />
          </div>

          <div>
            <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-2">Emergency Phone Number</label>
            <input
              value={settings['maintenance_phone'] || ''}
              onChange={(e) => set('maintenance_phone', e.target.value)}
              className="w-full bg-[#0D0D0D] border border-[#222] text-white px-4 py-3 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]"
            />
          </div>

          <div>
            <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-2">Lead Capture Form Heading</label>
            <input
              value={settings['maintenance_lead_heading'] || ''}
              onChange={(e) => set('maintenance_lead_heading', e.target.value)}
              className="w-full bg-[#0D0D0D] border border-[#222] text-white px-4 py-3 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]"
            />
          </div>

          <div className="flex items-center justify-between py-3 border-y border-[#1A1A1A]">
            <div>
              <p className="font-inter text-[13px] text-white">Show lead capture form on maintenance screen</p>
              <p className="font-ibm-plex-mono text-[9px] text-[#444] uppercase tracking-widest mt-0.5">Captures enquiries while site is down</p>
            </div>
            <button
              onClick={() => set('maintenance_lead_capture', settings['maintenance_lead_capture'] === 'true' ? 'false' : 'true')}
              className="relative inline-flex h-7 w-12 items-center"
              style={{ background: settings['maintenance_lead_capture'] === 'true' ? '#FF6900' : '#1A1A1A', border: '1px solid', borderColor: settings['maintenance_lead_capture'] === 'true' ? '#FF6900' : '#333' }}
            >
              <span className="inline-block h-5 w-5 bg-white transform transition-transform" style={{ transform: settings['maintenance_lead_capture'] === 'true' ? 'translateX(24px)' : 'translateX(2px)' }} />
            </button>
          </div>

          <button
            onClick={saveFields}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Maintenance Screen Settings'}
          </button>
          {saved && (
            <p className="flex items-center gap-2 font-ibm-plex-mono text-[9px] text-[#22C55E] uppercase tracking-widest">
              <CheckCircle className="h-3 w-3" /> Settings saved
            </p>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="border border-[#222] bg-[#141414] p-6">
        <h3 className="font-barlow-condensed text-xl font-black uppercase italic text-white mb-4">Preview</h3>
        <div
          className="aspect-[16/9] overflow-hidden"
          style={{ background: '#0A0A0A', border: '1px solid #1A1A1A' }}
        >
          <div className="h-full flex flex-col items-center justify-center p-8 text-center scale-75 origin-center">
            <p className="font-ibm-plex-mono text-[8px] uppercase tracking-[0.4em] text-[#FF6900] mb-3">// System Status</p>
            <h2 className="font-barlow-condensed text-3xl font-black uppercase italic text-white mb-3">System Maintenance</h2>
            <p className="font-inter text-[11px] text-[#888] max-w-sm mb-6">
              {settings['maintenance_message'] || 'The platform is currently undergoing scheduled upgrades.'}
            </p>
            {settings['maintenance_lead_capture'] !== 'false' && (
              <div className="border border-[#2A2A2A] p-4 w-64">
                <p className="font-ibm-plex-mono text-[8px] text-[#FF6900] uppercase tracking-widest mb-2">
                  {settings['maintenance_lead_heading'] || 'Need immediate assistance?'}
                </p>
                <div className="bg-[#1A1A1A] h-6 w-full mb-2" />
                <div className="bg-[#FF6900] h-6 w-full" />
              </div>
            )}
            <p className="font-ibm-plex-mono text-[10px] text-white mt-4">{settings['maintenance_phone'] || '+447912506738'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
