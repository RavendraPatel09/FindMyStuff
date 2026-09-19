import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Bell, Filter, MapPin, Zap } from 'lucide-react';
import { useNotification } from './NotificationSystem';

const QuickActionBar = ({ onAction, activeFilters = {} }) => {
  const { success, info } = useNotification();

  const quickActions = [
    {
      id: 'report-lost',
      label: 'Report Lost',
      icon: Search,
      color: 'from-red-500 to-red-600',
      description: 'Report a lost item',
      action: () => {
        success('Report Lost Item feature activated!');
        onAction('report-lost');
      }
    },
    {
      id: 'report-found',
      label: 'Report Found',
      icon: Plus,
      color: 'from-green-500 to-green-600',
      description: 'Report a found item',
      action: () => {
        success('Report Found Item feature activated!');
        onAction('report-found');
      }
    },
    {
      id: 'set-alert',
      label: 'Set Alert',
      icon: Bell,
      color: 'from-yellow-500 to-orange-500',
      description: 'Get notified of matches',
      action: () => {
        info('Smart alerts activated! You\'ll be notified of potential matches.');
        onAction('set-alert');
      }
    },
    {
      id: 'nearby-items',
      label: 'Nearby Items',
      icon: MapPin,
      color: 'from-blue-500 to-blue-600',
      description: 'Find items near you',
      action: () => {
        info('Showing items near your location...');
        onAction('nearby-items');
      }
    }
  ];

  const quickFilters = [
    { label: 'Today', value: 'today', icon: '📅' },
    { label: 'Electronics', value: 'electronics', icon: '📱' },
    { label: 'Library', value: 'library', icon: '📚' },
    { label: 'Lost Only', value: 'lost', icon: '🔍' },
    { label: 'Found Only', value: 'found', icon: '✅' }
  ];

  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
            <Zap className="w-4 h-4 mr-2 text-primary-500" />
            Quick Actions
          </h3>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.id}
              onClick={action.action}
              className={`p-3 bg-gradient-to-br ${action.color} text-white rounded-xl hover:shadow-lg transition-all duration-200 group relative overflow-hidden`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <action.icon className="w-5 h-5 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-xs font-medium block">{action.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Quick Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
            <Filter className="w-4 h-4 mr-2 text-primary-500" />
            Quick Filters
          </h3>
          <button
            onClick={() => onAction('clear-filters')}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Clear All
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter, index) => (
            <motion.button
              key={filter.value}
              onClick={() => onAction('filter', filter.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeFilters[filter.value]
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="mr-1">{filter.icon}</span>
              {filter.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default QuickActionBar;
