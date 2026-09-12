import { redirect } from 'next/navigation';

interface PageProps {
  searchParams: Promise<{ machines?: string; models?: string }>;
}

export default async function LegacyCompareRedirect({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const query = new URLSearchParams();
  if (resolved.machines) query.set('machines', resolved.machines);
  if (resolved.models) query.set('models', resolved.models);

  const queryString = query.toString();
  redirect(queryString ? `/machines/compare?${queryString}` : '/machines/compare');
}
