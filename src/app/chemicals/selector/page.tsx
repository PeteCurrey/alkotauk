import { redirect } from 'next/navigation';

export default function ChemicalSelectorRedirect() {
  redirect('/chemicals/match');
}
