'use client';

import { useState, useEffect } from 'react';
import MaintenanceScreen from '@/components/MaintenanceScreen';

export default function MaintenancePage() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/site-settings')
      .then(r => r.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="h-1 w-24 bg-[#FF6900] animate-pulse" />
      </div>
    );
  }

  return (
    <MaintenanceScreen 
      title="System Maintenance"
      message={settings.maintenance_message}
      phone={settings.maintenance_phone}
    />
  );
}
