import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Upload, 
  Camera, 
  Mic, 
  MapPin, 
  Clock, 
  Users, 
  TrendingUp,
  Zap,
  Star,
  Filter,
  Bell
} from 'lucide-react';

const QuickActionsPanel = ({ onAction, className = "" }) => {
  const [activeCategory, setActiveCategory] = useState('search');

  const actionCategories = {
    search: {
      title: 'Smart Search',
      icon: Search,
      color: 'from-blue-500 to-cyan-500',
      actions: [
        {
          icon: Search,
          title: 'Text Search',
          description: 'Search by keywords and descriptions',
          onClick: () => onAction?.('text-search')
        },
        {
          icon: Camera,
          title: 'Photo Search',
          description: 'Upload a photo to find similar items',
          onClick: () => onAction?.('photo-search')
        },
        {
          icon: Mic,
          title: 'Voice Search',
          description: 'Describe what you\'re looking for',
          onClick: () => onAction?.('voice-search')
        },
        {
          icon: MapPin,
          title: 'Location Search',
          description: 'Find items by campus location',
          onClick: () => onAction?.('location-search')
        }
      ]
    },
    report: {
      title: 'Report Items',
      icon: Upload,
      color: 'from-green-500 to-emerald-500',
      actions: [
        {
          icon: Upload,
          title: 'Report Lost Item',
          description: 'Lost something? Report it here',
          onClick: () => onAction?.('report-lost')
        },
        {
          icon: Star,
          title: 'Report Found Item',
          description: 'Help someone by reporting what you found',
          onClick: () => onAction?.('report-found')
        },
        {
          icon: Camera,
          title: 'Quick Photo Report',
          description: 'Snap and report instantly',
          onClick: () => onAction?.('quick-photo-report')
        }
      ]
    },
    trending: {
      title: 'Trending',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      actions: [
        {
          icon: TrendingUp,
          title: 'Popular Items',
          description: 'Most searched lost items',
          onClick: () => onAction?.('popular-items')
        },
        {
          icon: Clock,
          title: 'Recent Reports',
          description: 'Latest lost and found reports',
          onClick: () => onAction?.('recent-reports')
        },
        {
          icon: MapPin,
          title: 'Hotspots',
          description: 'Common locations for lost items',
          onClick: () => onAction?.('hotspots')
        },
        {
          icon: Users,
          title: 'Community Stats',
          description: 'See how your campus is doing',
          onClick: () => onAction?.('community-stats')
        }
      ]
    },
    tools: {
      title: 'Smart Tools',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      actions: [
        {
          icon: Bell,
          title: 'Smart Alerts',
          description: 'Set up intelligent notifications',
          onClick: () => onAction?.('smart-alerts')
        },
        {
          icon: Filter,
          title: 'Advanced Filters',
          description: 'Customize your search experience',
          onClick: () => onAction?.('advanced-filters')
        },
        {
          icon: Zap,
          title: 'AI Assistant',
          description: 'Get help finding your items',
          onClick: () => onAction?.('ai-assistant')
        }
      ]
    }
  };

  return (
    <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Quick Actions
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Everything you need at your fingertips
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200/50 dark:border-gray-700/50">
        {Object.entries(actionCategories).map(([key, category]) => {
          const IconComponent = category.icon;
          return (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap relative ${
                activeCategory === key
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span>{category.title}</span>
              
              {activeCategory === key && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Actions Grid */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {actionCategories[activeCategory].actions.map((action, index) => {
              const ActionIcon = action.icon;
              return (
                <motion.button
                  key={index}
                  onClick={action.onClick}
                  className="group p-4 rounded-2xl border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 text-left bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 hover:shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${actionCategories[activeCategory].color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                      <ActionIcon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {action.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-center text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            💡 Tip: Quick actions for faster access to all features
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;
