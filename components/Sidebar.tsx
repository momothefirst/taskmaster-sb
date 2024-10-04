"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, FileText, UserPlus, LogIn } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/page1', icon: LayoutDashboard, label: 'Page 1' },
    { href: '/page2', icon: FileText, label: 'Page 2' }
  ];

  return (
    <aside className="w-16 bg-gray-800 text-white">
      <nav className="flex flex-col items-center py-4">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-lg mb-4 transition-colors",
              pathname === href ? "bg-gray-700" : "hover:bg-gray-700"
            )}
          >
            <Icon className="w-6 h-6" />
            <span className="sr-only">{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;