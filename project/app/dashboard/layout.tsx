'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { useUser } from '@/lib/contexts/user-context';
import { redirect } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20">
      <Sidebar />
      <main className="ml-64 p-6">
        {children}
      </main>
    </div>
  );
}