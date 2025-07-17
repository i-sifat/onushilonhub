'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, LogOut, Settings, BarChart3 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AuthButton() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          onClick={() => router.push('/login')}
          className="text-sf-text-subtle hover:text-sf-button"
        >
          Login
        </Button>
        <Button
          onClick={() => router.push('/signup')}
          className="bg-sf-button hover:bg-sf-button/90 text-sf-bg"
        >
          Sign Up
        </Button>
      </div>
    );
  }

  const userInitials = user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-sf-button text-sf-bg">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-sf-text-bold">{user.email}</p>
            <p className="w-[200px] truncate text-sm text-sf-text-muted">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/dashboard')}>
          <BarChart3 className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}