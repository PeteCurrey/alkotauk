import React from 'react';
import { supabaseAdmin } from '@/lib/supabase/server';
import RequestsWorkspaceClient from './RequestsWorkspaceClient';

export const revalidate = 0;

export default async function AdminPartsRequestsPage() {
  // 1. Fetch part requests
  const { data: dbRequests } = await supabaseAdmin
    .from('part_requests')
    .select('*')
    .order('created_at', { ascending: false });

  // 2. Fetch search analytics
  const { data: analytics } = await supabaseAdmin
    .from('search_analytics')
    .select('query, is_zero_result, results_count, created_at')
    .order('created_at', { ascending: false })
    .limit(200);

  // Aggregate analytics
  const queryCounts: Record<string, number> = {};
  const zeroCounts: Record<string, number> = {};

  (analytics || []).forEach(a => {
    if (!a.query) return;
    const q = a.query.toLowerCase().trim();
    queryCounts[q] = (queryCounts[q] || 0) + 1;
    if (a.is_zero_result) {
      zeroCounts[q] = (zeroCounts[q] || 0) + 1;
    }
  });

  const topQueries = Object.entries(queryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([query, count]) => ({ query, count }));

  const zeroResultQueries = Object.entries(zeroCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([query, count]) => ({ query, count }));

  const recentSearches = (analytics || []).slice(0, 10).map(a => ({
    query: a.query,
    results_count: a.results_count,
    created_at: a.created_at,
  }));

  return (
    <RequestsWorkspaceClient
      initialRequests={dbRequests || []}
      analyticsData={{
        topQueries,
        zeroResultQueries,
        recentSearches,
      }}
    />
  );
}
