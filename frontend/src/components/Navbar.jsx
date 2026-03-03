import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Search, User } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 glass border-b border-white/20 px-4 py-3 shadow-sm">
            <div className="container mx-auto max-w-7xl flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-gradient-to-r from-accent to-accent-light p-2 rounded-xl text-white group-hover:scale-105 transition-transform shadow-md">
                        <ChefHat size={24} />
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-gray-800 bg-clip-text">
                        Home <span className="text-accent">Bites</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-gray-600 hover:text-accent font-medium transition-colors">Discover</Link>
                    <Link to="/admin" className="text-gray-600 hover:text-accent font-medium transition-colors">Admin Dashboard</Link>
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-500 hover:text-accent hover:bg-orange-50 rounded-full transition-colors">
                        <Search size={20} />
                    </button>
                    <Link to="/admin" className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-colors shadow-md hover:shadow-lg">
                        <User size={18} />
                        <span className="hidden sm:inline">Family Login</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
