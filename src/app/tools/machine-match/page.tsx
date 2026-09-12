import { redirect } from 'next/navigation';

export default function LegacyMachineMatchRedirect() {
  redirect('/machines/help-me-choose');
}
