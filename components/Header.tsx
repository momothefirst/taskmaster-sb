"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const getUsername = (email: string) => {
    return email.split('@')[0];
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Next.js App
      </Link>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.user_metadata.avatar_url} alt={user.email || ''} />
                <AvatarFallback>{getUsername(user.email || '').charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem>
              <span className="font-medium">{getUsername(user.email || '')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/preferences">Preferences</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={async () => {
              await supabase.auth.signOut();
            }}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <Button variant="ghost">Login</Button>
        </Link>
      )}
    </header>
  );
};

export default Header;