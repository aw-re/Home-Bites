import React from 'react';
import { MessageCircle, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

const DishCard = ({ dish }) => {
    // Format WhatsApp Link
    const waNumber = dish.family_contact || '966500000000'; // Fallback
    const message = `Hello! I saw your delicious *${dish.name}* on Home Bites and I would like to order it. \nPrice: SAR ${dish.price}`;
    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    return (
        <div className="glass-card overflow-hidden group flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={dish.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80'}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-accent shadow-sm">
                    {dish.category_name || "Dish"}
                </div>
                <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-white shadow-sm flex items-center gap-1">
                    SR {dish.price.toFixed(2)}
                </div>
            </div>

            <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-gray-800 line-clamp-1">{dish.name}</h3>
                </div>

                {dish.family_id && dish.family_name && (
                    <Link to={`/family/${dish.family_id}`} className="flex items-center gap-1 text-sm text-gray-500 hover:text-accent mb-3 transition-colors">
                        <ChefHat size={14} />
                        <span>{dish.family_name}</span>
                    </Link>
                )}

                <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
                    {dish.description}
                </p>

                <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                    <MessageCircle size={18} />
                    Order via WhatsApp
                </a>
            </div>
        </div>
    );
};

export default DishCard;
