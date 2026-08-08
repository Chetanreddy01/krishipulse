import React from 'react';
import { Sidebar } from './Sidebar.jsx';
import { Navbar } from './Navbar.jsx';
import { Footer } from './Footer.jsx';
import { BottomNav } from '../BottomNav.jsx';
import { AuthModal } from '../AuthModal.jsx';
import { ToastContainer } from '../ToastContainer.jsx';

export function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[var(--bg-main)] transition-colors duration-200">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <Navbar />
        <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto animate-page-entry">
          {children}
        </main>
        <Footer />
      </div>
      <BottomNav />
      <AuthModal />
      <ToastContainer />
    </div>
  );
}
