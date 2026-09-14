import { redirect } from 'next/navigation';
import { abs } from '@/lib/site';

// Redirect-only route: give it its own metadata so it does not inherit
// the root layout's homepage canonical, and keep it out of the index.
export const metadata = {
  title: 'Noorix AI',
  alternates: { canonical: abs('/noorix/chat') },
  robots: { index: false, follow: true },
};

export default function NoorixPage() {
  redirect('/noorix/chat');
}
