import React from 'react';
import { Lock } from 'lucide-react';

const AdminDashboard = () => {
    return (
        <div className="max-w-2xl mx-auto py-20 text-center animate-fade-in z-10 relative">
            <div className="glass p-12 rounded-3xl shadow-xl flex flex-col items-center">
                <div className="bg-orange-100 p-6 rounded-full mb-6 text-accent">
                    <Lock size={64} />
                </div>

                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Admin Dashboard</h1>
                <p className="text-xl text-gray-600 mb-8 max-w-md">
                    This area is restricted. In a full implementation, families would log in here to manage their dishes and profile.
                </p>

                <div className="w-full max-w-sm">
                    <form className="space-y-4 text-left" onSubmit={(e) => { e.preventDefault(); alert("Login feature is a placeholder!"); }}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number / Username</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" placeholder="Enter phone" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" placeholder="Enter password" />
                        </div>

                        <button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-xl transition-all shadow-md mt-6">
                            Sign In to Manage Home Bites
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
