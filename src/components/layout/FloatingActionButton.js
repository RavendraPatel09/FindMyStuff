import React, { useState } from 'react';
import { Plus, X, Search, Camera, Upload, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingActionButton = ({ onAddItem, onQuickSearch, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Upload,
      label: 'Report Lost things',
      onClick: () => onAddItem?.('lost'),
      color: 'bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600',
      description: 'Lost something? Report it now'
    },
    {
      icon: Search,
      label: 'Report Found Item',
      onClick: () => onAddItem?.('found'),
      color: 'bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600',
      description: 'Found an item? Help someone'
    },
    {
      icon: Camera,
      label: 'Photo Search',
      onClick: () => console.log('Photo search'),
      color: 'bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600',
      description: 'Search using a photo'
    },
    {
      icon: MessageCircle,
      label: 'Quick Chat',
      onClick: () => console.log('Quick chat'),
      color: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700',
      description: 'Get help instantly'
    }
  ];

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Action Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="mb-4 space-y-3"
            >
              {actions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.8 }}
                  transition={{ 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="flex items-center justify-end"
                >
                  {/* Tooltip */}
                  <div className="mr-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{action.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{action.description}</p>
                  </div>
                  
                  {/* Action Button */}
                  <motion.button
                    onClick={() => {
                      action.onClick();
                      setIsOpen(false);
                    }}
                    className={`group flex items-center space-x-3 px-5 py-3 ${action.color} text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 min-w-[200px]`}
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <action.icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold">{action.label}</p>
                      <p className="text-xs opacity-80">{action.description}</p>
                    </div>
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-full shadow-2xl hover:shadow-glow transition-all duration-300 flex items-center justify-center group ${isOpen ? 'bg-red-500 hover:bg-red-600' : ''}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'plus'}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300" />
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Pulse animation when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-20"></div>
        )}
      </motion.button>
      
    </div>
  );
};

export default FloatingActionButton;