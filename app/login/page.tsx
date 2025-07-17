import { Metadata } from 'next';
import AuthForm from '@/components/auth/AuthForm';

export const metadata: Metadata = {
  title: 'Login | OnushilonHub',
  description: 'Sign in to your OnushilonHub account to track your grammar learning progress.',
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}