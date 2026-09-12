import React from 'react';
import { supabaseAdmin } from '@/lib/supabase/server';
import { CANONICAL_RELATIONSHIPS } from '@/lib/relationships/canonical-data';
import RelationshipsAdminClient from './RelationshipsAdminClient';

export const revalidate = 0;

export default async function AdminRelationshipsPage() {
  let relationships: any[] = [];

  try {
    const { data, error } = await supabaseAdmin
      .from('product_relationships')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      relationships = data;
    } else {
      relationships = CANONICAL_RELATIONSHIPS as any[];
    }
  } catch {
    relationships = CANONICAL_RELATIONSHIPS as any[];
  }

  return <RelationshipsAdminClient initialData={relationships} />;
}
