import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Yourself | OnushilonHub',
  description: 'Take timed grammar tests to evaluate your knowledge and track your progress.',
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}