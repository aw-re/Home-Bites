import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, ArrowLeft, Loader2, Info } from 'lucide-react';
import DishCard from '../components/DishCard';

const FamilyProfile = () => {
    const { id } = useParams();
    const [family, setFamily] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFamily = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/families/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setFamily(data);
                }
            } catch (error) {
                console.error("Error fetching family:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFamily();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="animate-spin text-accent w-12 h-12" />
            </div>
        );
    }

    if (!family) {
        return (
            <div className="text-center py-20 max-w-md mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Family Not Found</h2>
                <Link to="/" className="text-accent underline">Return to Home</Link>
            </div>
        );
    }

    return (
        <div className="animate-fade-in relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent mb-6 transition-colors">
                <ArrowLeft size={20} /> Back to discover
            </Link>

            {/* Header Section */}
            <div className="glass rounded-3xl overflow-hidden shadow-xl mb-12">
                <div className="h-48 md:h-64 bg-gradient-to-r from-orange-400 to-accent relative">
                    <img
                        src={family.image_url || 'https://images.unsplash.com/photo-1555507036-ab1e4006aaeb?w=1000&q=80'}
                        className="w-full h-full object-cover mix-blend-overlay opacity-60"
                        alt="Cover"
                    />
                </div>

                <div className="p-8 md:px-12 md:py-8 relative">
                    <div className="absolute -top-16 left-8 md:left-12 w-32 h-32 bg-white rounded-full p-2 shadow-xl border-4 border-white/50 backdrop-blur-sm">
                        <div className="w-full h-full bg-orange-100 rounded-full flex items-center justify-center text-4xl overflow-hidden">
                            <img src={family.image_url || 'https://images.unsplash.com/photo-1555507036-ab1e4006aaeb?w=200&q=80'} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="mt-16 md:mt-0 md:ml-40">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{family.name}</h1>

                        <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                            <span className="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-full font-medium shadow-sm">
                                <MapPin size={16} className="text-accent" /> {family.location}
                            </span>
                            <span className="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-full font-medium shadow-sm">
                                <Phone size={16} className="text-accent" /> +{family.contact_number}
                            </span>
                        </div>

                        <div className="bg-white/50 rounded-2xl p-4 border border-white/40 shadow-inner">
                            <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold">
                                <Info size={18} className="text-accent" /> About the Family
                            </div>
                            <p className="text-gray-600 leading-relaxed font-light">
                                {family.bio || "This home-based family business hasn't added a bio yet, but their food speaks for itself!"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dishes Grid */}
            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b border-orange-200 pb-4">
                Menu <span className="text-accent">({family.dishes?.length || 0})</span>
            </h2>

            {family.dishes && family.dishes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-16">
                    {family.dishes.map((dish) => (
                        <DishCard
                            key={dish.id}
                            dish={{
                                ...dish,
                                family_name: family.name,
                                family_contact: family.contact_number
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500">This family hasn't listed any dishes yet.</p>
                </div>
            )}
        </div>
    );
};

export default FamilyProfile;
