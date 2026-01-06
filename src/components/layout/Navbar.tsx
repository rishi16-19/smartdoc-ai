

import { Link, useNavigate } from 'react-router-dom';
import { FileText, LogOut, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-dark backdrop-blur supports-[backdrop-filter]:bg-brand-dark/95">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-white" />
                    <span className="text-xl font-bold tracking-tight text-white">SmartDoc AI</span>
                </Link>
                <nav className="flex items-center gap-4">
                    <Link to="/" className="text-sm font-medium text-white/90 hover:text-white">
                        Home
                    </Link>
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                                <User className="h-4 w-4" />
                                <span className="hidden sm:inline">{user?.name}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleLogout} title="Sign out" className="text-white hover:bg-white/10 hover:text-white">
                                <LogOut className="h-4 w-4" />
                            </Button>
                            <Link to="/upload">
                                <Button size="sm" className="bg-white text-brand-dark hover:bg-white/90">Upload Document</Button>
                            </Link>
                        </>
                    ) : (
                        <Link to="/login">
                            <Button size="sm" className="bg-white text-brand-dark hover:bg-white/90">Sign In</Button>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
