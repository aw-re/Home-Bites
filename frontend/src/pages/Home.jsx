import React, { useState, useEffect } from 'react';
import { Search, Filter, Loader2, RefreshCw } from 'lucide-react';
import DishCard from '../components/DishCard';

const Home = () => {
    const [dishes, setDishes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Categories
            const catRes = await fetch('http://localhost:5000/api/categories');
            if (catRes.ok) {
                const catData = await catRes.json();
                setCategories(catData);
            }

            // Fetch Dishes with filters
            let url = 'http://localhost:5000/api/dishes';
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (activeCategory) params.append('category', activeCategory);

            if (search || activeCategory) {
                url += `?${params.toString()}`;
            }

            const dishRes = await fetch(url);
            if (dishRes.ok) {
                const dishData = await dishRes.json();
                setDishes(dishData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Debounce search
        const handler = setTimeout(() => {
            fetchData();
        }, 300);
        return () => clearTimeout(handler);
    }, [search, activeCategory]);

    const handleSeed = async () => {
        try {
            await fetch('http://localhost:5000/api/seed', { method: 'POST' });
            fetchData();
            alert("Database Seeded! Refreshing.");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="animate-fade-in relative z-10">

            {/* Hero Section */}
            <section className="text-center py-16 mb-8">
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 drop-shadow-sm leading-tight tracking-tight">
                    Discover Local <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-orange-400">Culinary Magic</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                    Support home-based family businesses and taste authentic, homemade meals prepared with love.
                    Find your next favorite dish and order directly via WhatsApp.
                </p>
            </section>

            {/* Search and Filters */}
            <section className="mb-12 glass p-4 md:p-6 rounded-3xl mx-auto max-w-5xl shadow-xl flex flex-col md:flex-row gap-4 items-center relative z-20">
                <div className="relative w-full md:flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for dishes, flavors... e.g., 'Kabsa'"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-none bg-white/60 focus:bg-white focus:ring-4 focus:ring-accent/20 outline-none transition-all shadow-inner text-gray-700 font-medium"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar no-scrollbar">
                    <button
                        onClick={() => setActiveCategory('')}
                        className={`px-5 py-3 rounded-xl whitespace-nowrap font-medium transition-all shadow-sm flex items-center gap-2 ${activeCategory === '' ? 'bg-accent text-white shadow-md shadow-accent/20' : 'bg-white/60 hover:bg-white text-gray-700'}`}
                    >
                        <Filter size={16} /> All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id.toString())}
                            className={`px-5 py-3 rounded-xl whitespace-nowrap font-medium transition-all shadow-sm ${activeCategory === cat.id.toString() ? 'bg-accent text-white shadow-md shadow-accent/20' : 'bg-white/60 hover:bg-white text-gray-700'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </section>

            {/* Dishes Grid */}
            <section>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Available Dishes</h2>
                    <span className="text-gray-500 font-medium bg-white/50 px-3 py-1 rounded-full">
                        {dishes.length} Results
                    </span>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-accent w-12 h-12" />
                    </div>
                ) : dishes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {dishes.map((dish) => (
                            <DishCard key={dish.id} dish={dish} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 glass rounded-3xl">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No dishes found</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-6">We couldn't find any dishes matching your current filters. Try adjusting your search.</p>
                        {dishes.length === 0 && search === '' && activeCategory === '' && (
                            <button
                                onClick={handleSeed}
                                className="bg-accent hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-colors flex items-center gap-2 mx-auto"
                            >
                                <RefreshCw size={18} /> Seed Dummy Data
                            </button>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
