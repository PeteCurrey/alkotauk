'use client';

import { useState, useEffect } from 'react';
import { Save, CheckCircle } from 'lucide-react';

const SETTING_GROUPS = [
  {
    label: 'General',
    keys: [
      { key: 'site_name', label: 'Site Name' },
      { key: 'meta_title_suffix', label: 'Meta Title Suffix' },
      { key: 'meta_description', label: 'Meta Description', multiline: true },
    ],
  },
  {
    label: 'Contact',
    keys: [
      { key: 'contact_email', label: 'Contact Email' },
      { key: 'contact_phone', label: 'Contact Phone' },
      { key: 'notification_email', label: 'Enquiry Notification Email' },
      { key: 'address_line_1', label: 'Address Line 1' },
      { key: 'address_line_2', label: 'Address Line 2' },
      { key: 'city', label: 'City / Region' },
    ],
  },
  {
    label: 'Social Media',
    keys: [
      { key: 'instagram_url', label: 'Instagram URL' },
      { key: 'facebook_url', label: 'Facebook URL' },
      { key: 'linkedin_url', label: 'LinkedIn URL' },
      { key: 'youtube_url', label: 'YouTube URL' },
    ],
  },
  {
    label: 'Analytics',
    keys: [
      { key: 'google_analytics_id', label: 'Google Analytics ID (G-XXXXXXX)' },
      { key: 'search_console_verification', label: 'Search Console Verification Code' },
    ],
  },
  {
    label: 'Lead Generation',
    keys: [
      { key: 'exit_intent_title', label: 'Exit Intent Title' },
      { key: 'exit_intent_message', label: 'Exit Intent Message', multiline: true },
      { key: 'exit_intent_cta', label: 'Exit Intent CTA Button Text' },
    ],
  },
];

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then((data: Array<{ key: string; value: string }>) => {
        const map: Record<string, string> = {};
        data.forEach(row => { map[row.key] = row.value; });
        setSettings(map);
        setLoading(false);
      });
  }, []);

  function set(key: string, value: string) {
    setSettings(s => ({ ...s, [key]: value }));
  }

  async function save() {
    setSaving(true);
    const allKeys = SETTING_GROUPS.flatMap(g => g.keys.map(k => k.key));
    const updates = allKeys.map(key => ({ key, value: settings[key] || '' }));
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (loading) return (
    <div className="text-white flex items-center justify-center h-64">
      <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#444]">Loading...</p>
    </div>
  );

  const inputClass = "w-full bg-[#0D0D0D] border border-[#222] text-white px-4 py-2.5 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]";
  const labelClass = "block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1.5";

  return (
    <div className="text-white max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">Site Settings</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// Global site configuration</p>
        </div>
        <div className="flex items-center gap-4">
          {saved && (
            <p className="flex items-center gap-2 font-ibm-plex-mono text-[9px] text-[#22C55E] uppercase tracking-widest">
              <CheckCircle className="h-3 w-3" /> Saved
            </p>
          )}
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] disabled:opacity-50">
            <Save className="h-4 w-4" />{saving ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {SETTING_GROUPS.map(group => (
          <div key={group.label} className="border border-[#222] bg-[#141414]">
            <div className="px-6 py-3 border-b border-[#222]">
              <h2 className="font-barlow-condensed text-xl font-black uppercase italic text-white">{group.label}</h2>
            </div>
            <div className="p-6 grid grid-cols-1 gap-4">
              {group.keys.map(({ key, label, multiline }) => (
                <div key={key}>
                  <label className={labelClass}>{label}</label>
                  {multiline ? (
                    <textarea
                      value={settings[key] || ''}
                      onChange={e => set(key, e.target.value)}
                      rows={3}
                      className={inputClass + ' resize-y'}
                    />
                  ) : (
                    <input
                      type="text"
                      value={settings[key] || ''}
                      onChange={e => set(key, e.target.value)}
                      className={inputClass}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
