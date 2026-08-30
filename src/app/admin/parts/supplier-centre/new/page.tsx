'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, ShieldAlert, Sparkles, Truck } from 'lucide-react';

export default function NewSupplierPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    code: '',
    supplier_type: 'wholesaler',
    website_url: '',
    email: '',
    phone: '',
    integration_method: 'manual',
    api_endpoint: '',
    feed_url: '',
    auth_method: 'none',
    credential_ref: '',
    default_margin_pct: 35.0,
    sync_frequency_hours: 24,
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = '/admin/parts/supplier-centre';
      } else {
        setError(data.error || 'Failed to create supplier');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto px-4 sm:px-6 font-sans">
      {/* ── HEADER ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#64748B] uppercase tracking-wider mb-2">
          <Link href="/admin/parts/supplier-centre" className="hover:text-[#FF6900] flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Supplier Centre
          </Link>
          <span>/</span>
          <span className="text-[#FF6900]">New Supplier Ingestion Profile</span>
        </div>
        <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
          Register New Supplier / Manufacturer Feed
        </h1>
        <p className="text-xs text-[#64748B] mt-0.5">
          Configure a commercial supplier connector, authentication reference, and pricing margin rules.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs font-semibold">
          {error}
        </div>
      )}

      {/* ── FORM ── */}
      <form onSubmit={handleSubmit} className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1">
              Supplier Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Dual Pumps Ltd"
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-2.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1">
              Supplier Code
            </label>
            <input
              type="text"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              placeholder="e.g. DP"
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-2.5 text-xs font-mono uppercase text-[#0F172A] focus:outline-none focus:border-[#FF6900]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1">
              Supplier Type
            </label>
            <select
              value={form.supplier_type}
              onChange={(e) => setForm({ ...form, supplier_type: e.target.value as any })}
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-2.5 text-xs text-[#0F172A]"
            >
              <option value="wholesaler">Wholesaler / Distributor</option>
              <option value="manufacturer">OEM Manufacturer</option>
              <option value="importer">Importer</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1">
              Website URL
            </label>
            <input
              type="url"
              value={form.website_url}
              onChange={(e) => setForm({ ...form, website_url: e.target.value })}
              placeholder="https://..."
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-2.5 text-xs text-[#0F172A]"
            />
          </div>
        </div>

        {/* ── INTEGRATION METHOD BOX ── */}
        <div className="p-4 bg-[#F8FAFC] border border-[#E2E4E8] rounded-xl space-y-4">
          <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
            Connector & Ingestion Architecture
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">
                Integration Method
              </label>
              <select
                value={form.integration_method}
                onChange={(e) => setForm({ ...form, integration_method: e.target.value as any })}
                className="w-full bg-white border border-[#CBD5E1] rounded-lg p-2.5 text-xs text-[#0F172A]"
              >
                <option value="manual">Manual Entry / Desk</option>
                <option value="csv">CSV / XLSX Spreadsheet</option>
                <option value="rest_api">REST API</option>
                <option value="xml_feed">XML / RSS Feed</option>
                <option value="json_feed">JSON Feed</option>
                <option value="pdf">PDF / Document Extractor</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">
                Auth Method
              </label>
              <select
                value={form.auth_method}
                onChange={(e) => setForm({ ...form, auth_method: e.target.value as any })}
                className="w-full bg-white border border-[#CBD5E1] rounded-lg p-2.5 text-xs text-[#0F172A]"
              >
                <option value="none">None / Public Feed</option>
                <option value="api_key">API Key (Header / Query)</option>
                <option value="bearer">Bearer Token</option>
                <option value="basic">Basic Auth</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">
                Credential Ref Name
              </label>
              <input
                type="text"
                value={form.credential_ref}
                onChange={(e) => setForm({ ...form, credential_ref: e.target.value })}
                placeholder="e.g. DUAL_PUMPS"
                className="w-full bg-white border border-[#CBD5E1] rounded-lg p-2.5 text-xs font-mono uppercase text-[#0F172A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1">
              API Endpoint URL / Feed URL
            </label>
            <input
              type="text"
              value={form.api_endpoint}
              onChange={(e) => setForm({ ...form, api_endpoint: e.target.value })}
              placeholder="https://api.supplier.com/v1/products"
              className="w-full bg-white border border-[#CBD5E1] rounded-lg p-2.5 text-xs font-mono text-[#0F172A]"
            />
          </div>

          <div className="text-[11px] text-[#64748B] flex items-center gap-1.5 font-mono">
            <ShieldAlert className="w-3.5 h-3.5 text-[#FF6900]" />
            <span>Actual API keys are read server-side from environment variables (e.g. <code className="bg-[#E2E4E8] px-1 py-0.5 rounded">SUPPLIER_DUAL_PUMPS_API_KEY</code>) and never stored in the database.</span>
          </div>
        </div>

        {/* ── COMMERCIAL & PRICING RULES ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1">
              Default Gross Margin (%) *
            </label>
            <input
              type="number"
              required
              step="0.5"
              value={form.default_margin_pct}
              onChange={(e) => setForm({ ...form, default_margin_pct: parseFloat(e.target.value) || 35 })}
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-2.5 text-xs font-mono text-[#0F172A]"
            />
            <span className="text-[10px] text-[#64748B] mt-0.5 block">
              Formula: Retail = Cost / (1 - Margin%)
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1">
              Sync Frequency (Hours)
            </label>
            <input
              type="number"
              value={form.sync_frequency_hours}
              onChange={(e) => setForm({ ...form, sync_frequency_hours: parseInt(e.target.value, 10) || 24 })}
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-2.5 text-xs font-mono text-[#0F172A]"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E4E8]">
          <Link
            href="/admin/parts/supplier-centre"
            className="px-4 py-2.5 bg-[#F1F3F7] hover:bg-[#E2E4E8] text-[#334155] rounded-lg text-xs font-semibold"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-[#FF6900] hover:bg-[#E55D00] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Creating Profile...' : 'Save Supplier Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
