import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FamilyProfile from './pages/FamilyProfile';
import AdminDashboard from './pages/AdminDashboard'; // For Best Outcome

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
        {/* Background blobs for modern look */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-orange-200 to-transparent opacity-50 -z-10 rounded-b-[100px]"></div>
        <div className="absolute top-20 right-0 w-64 h-64 bg-accent-light rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob -z-10"></div>
        <div className="absolute top-40 left-20 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 -z-10"></div>

        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/family/:id" element={<FamilyProfile />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <footer className="bg-white/80 backdrop-blur-md border-t border-orange-100 py-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Home Bites. Supporting local families.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
