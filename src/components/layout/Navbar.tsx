

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
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-primary-600" />
                    <span className="text-xl font-bold tracking-tight text-slate-900">SmartDoc AI</span>
                </Link>
                <nav className="flex items-center gap-4">
                    <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                        Home
                    </Link>
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                                <User className="h-4 w-4" />
                                <span className="hidden sm:inline">{user?.name}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleLogout} title="Sign out">
                                <LogOut className="h-4 w-4" />
                            </Button>
                            <Link to="/upload">
                                <Button size="sm">Upload Document</Button>
                            </Link>
                        </>
                    ) : (
                        <Link to="/login">
                            <Button size="sm">Sign In</Button>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
