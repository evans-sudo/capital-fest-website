import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Capital Fest | Feel Every Moment',
  description: 'Capital Fest — music, people, culture and unforgettable live experiences. Explore the moments and sign up for event updates.',
  robots: { index: false, follow: false }, // Staging replica: enable only for approved public launch
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
