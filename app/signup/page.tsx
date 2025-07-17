import { Metadata } from 'next';
import AuthForm from '@/components/auth/AuthForm';

export const metadata: Metadata = {
  title: 'Sign Up | OnushilonHub',
  description: 'Create your OnushilonHub account to start tracking your grammar learning progress.',
};

export default function SignUpPage() {
  return <AuthForm mode="signup" />;
}