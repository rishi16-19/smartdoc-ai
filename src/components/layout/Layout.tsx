import React from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <footer className="border-t border-slate-200 bg-white py-6">
                <div className="container mx-auto px-4 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} SmartDoc AI. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
