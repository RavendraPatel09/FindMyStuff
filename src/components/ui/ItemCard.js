import React from 'react';
import { Calendar, MapPin, Tag, User } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

// Select a representative image based on item name/category
const getImageForItem = (item) => {
  const name = (item?.name || '').toLowerCase();
  const cat = (item?.category || '').toLowerCase();

  // Keyword → image mapping (high-quality Unsplash images with stable topics)
  const mapping = [
    {
      keys: ['backpack', 'bag', 'rucksack'],
      url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=900&fit=crop&auto=format&q=80'
    },
    {
      keys: ['earphone', 'earphones', 'earbud', 'earbuds', 'headphone', 'headphones'],
      url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=900&fit=crop&auto=format&q=80'
    },
    {
      keys: ['tiffin', 'lunch', 'box', 'lunchbox'],
      url: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=1200&h=900&fit=crop&auto=format&q=80'
    },
    {
      keys: ['key', 'keys', 'keychain'],
      url: 'https://images.unsplash.com/photo-1562158070-0b6f8d3a2ee4?w=1200&h=900&fit=crop&auto=format&q=80'
    },
    {
      keys: ['tie', 'necktie'],
      url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&h=900&fit=crop&auto=format&q=80'
    },
    {
      keys: ['glasses', 'spectacle', 'spectacles', 'goggles'],
      url: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1200&h=900&fit=crop&auto=format&q=80'
    },
  ];

  // Try direct mapping by name keywords first
  for (const m of mapping) {
    if (m.keys.some(k => name.includes(k))) return m.url;
  }

  // Try mapping by category if name didn't match
  for (const m of mapping) {
    if (m.keys.some(k => cat.includes(k))) return m.url;
  }

  // Fallback: if item already has an image, keep it; else generic placeholder
  if (item?.image) return item.image;

  return 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1200&h=900&fit=crop&auto=format&q=80'; // generic lost item
};

const ItemCard = ({ item, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'found':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      case 'claimed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <ScrollReveal animation={item.status === 'found' ? 'spotlight' : 'discover'}>
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-pointer overflow-hidden"
        onClick={() => onClick(item)}
        whileHover={{ 
          y: -5,
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        whileTap={{ scale: 0.98 }}
      >
      {/* Image area with auto-selected image based on name/category */}
      <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
        <img
          src={getImageForItem(item)}
          alt={item.name}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1200&h=900&fit=crop&auto=format&q=80'; }}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* Subtle gradient and category chip for polish */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
        <span className="absolute bottom-2 left-2 px-2 py-1 text-[10px] font-semibold rounded-full bg-white/80 dark:bg-gray-900/70 text-gray-800 dark:text-gray-200 backdrop-blur-md">
          {item.category}
        </span>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">
            {item.name}
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
            {item.status.toUpperCase()}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>
        
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(item.date).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{item.location}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4" />
            <span>{item.category}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>By {item.reportedBy}</span>
          </div>
        </div>
      </div>
      </motion.div>
    </ScrollReveal>
  );
};export default ItemCard;
