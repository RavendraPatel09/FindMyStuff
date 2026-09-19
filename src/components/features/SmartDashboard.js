import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  MapPin, 
  Users, 
  Zap, 
  Bell, 
  Search,
  Plus,
  Filter,
  Calendar,
  Target,
  Award,
  Activity,
  Eye,
  MessageCircle
} from 'lucide-react';
import { useNotification } from './NotificationSystem';

const SmartDashboard = ({ user, className = "" }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('week');
  const [isLoading, setIsLoading] = useState(false);
  const { success, info } = useNotification();

  // Mock dashboard data
  const dashboardData = {
    overview: {
      totalItems: 156,
      myReports: 8,
      successfulMatches: 23,
      responseRate: 94,
      trends: {
        items: '+12%',
        matches: '+8%',
        response: '+3%'
      }
    },
    recentActivity: [
      {
        id: 1,
        type: 'match_found',
        title: 'Your lost iPhone has a potential match!',
        description: 'Sarah found a black iPhone 13 Pro in the library',
        time: '2 minutes ago',
        priority: 'high',
        action: 'Contact Sarah'
      },
      {
        id: 2,
        type: 'item_reported',
        title: 'New item reported in your area',
        description: 'Someone found AirPods near the cafeteria',
        time: '15 minutes ago',
        priority: 'medium',
        action: 'View Details'
      },
      {
        id: 3,
        type: 'success_story',
        title: 'Match successful!',
        description: 'Your reported wallet was claimed by its owner',
        time: '1 hour ago',
        priority: 'low',
        action: 'View Feedback'
      }
    ],
    quickStats: [
      { label: 'Active Searches', value: 12, icon: Search, color: 'blue' },
      { label: 'Items Watching', value: 5, icon: Eye, color: 'green' },
      { label: 'Pending Matches', value: 3, icon: Target, color: 'orange' },
      { label: 'Messages', value: 7, icon: MessageCircle, color: 'purple' }
    ],
    hotspots: [
      { name: 'Main Library', items: 45, trend: '+5' },
      { name: 'Student Center', items: 32, trend: '+2' },
      { name: 'Cafeteria', items: 28, trend: '-1' },
      { name: 'Gym Complex', items: 19, trend: '+3' }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'alerts', label: 'Smart Alerts', icon: Bell }
  ];

  const StatCard = ({ stat, index }) => {
    const colors = {
      blue: 'from-blue-500 to-cyan-500',
      green: 'from-green-500 to-emerald-500',
      orange: 'from-orange-500 to-red-500',
      purple: 'from-purple-500 to-pink-500'
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 group cursor-pointer"
        whileHover={{ y: -2 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[stat.color]} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
            <stat.icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </motion.div>
    );
  };

  const ActivityItem = ({ activity, index }) => {
    const priorityColors = {
      high: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20',
      medium: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20',
      low: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
    };

    const typeIcons = {
      match_found: Target,
      item_reported: Plus,
      success_story: Award
    };

    const TypeIcon = typeIcons[activity.type] || Bell;

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`p-4 rounded-2xl border-2 ${priorityColors[activity.priority]} hover:shadow-md transition-all duration-200 group cursor-pointer`}
        whileHover={{ x: 4 }}
      >
        <div className="flex items-start space-x-4">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0`}>
            <TypeIcon className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {activity.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {activity.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {activity.time}
              </span>
              <button 
                onClick={() => info(`Action: ${activity.action}`)}
                className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                {activity.action}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardData.quickStats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h3>
            <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {dashboardData.recentActivity.map((activity, index) => (
              <ActivityItem key={activity.id} activity={activity} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Campus Hotspots
          </h3>
          
          <div className="space-y-4">
            {dashboardData.hotspots.map((hotspot, index) => (
              <div key={hotspot.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {hotspot.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {hotspot.items}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    hotspot.trend.startsWith('+') 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  }`}>
                    {hotspot.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const QuickActions = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-6 border border-primary-200 dark:border-primary-800"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Report Lost', icon: Plus, color: 'from-red-500 to-red-600' },
          { label: 'Report Found', icon: Search, color: 'from-green-500 to-green-600' },
          { label: 'Browse Items', icon: Eye, color: 'from-blue-500 to-blue-600' },
          { label: 'Set Alert', icon: Bell, color: 'from-purple-500 to-purple-600' }
        ].map((action, index) => (
          <motion.button
            key={action.label}
            onClick={() => success(`${action.label} action triggered!`)}
            className={`p-4 bg-gradient-to-br ${action.color} text-white rounded-xl hover:shadow-lg transition-all duration-200 group`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <action.icon className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name || 'Student'}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Here's what's happening with your lost & found activity
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Time Range Selector */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200/50 dark:border-gray-700/50">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap relative ${
                activeTab === tab.id
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <TabIcon className="w-5 h-5" />
              <span>{tab.label}</span>
              
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'activity' && (
              <div className="text-center py-12">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Activity Feed
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Detailed activity tracking coming soon
                </p>
              </div>
            )}
            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Advanced Analytics
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive analytics dashboard coming soon
                </p>
              </div>
            )}
            {activeTab === 'alerts' && (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Smart Alerts
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  AI-powered notification system coming soon
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Quick Actions Footer */}
      <div className="p-6 border-t border-gray-200/50 dark:border-gray-700/50">
        <QuickActions />
      </div>
    </div>
  );
};

export default SmartDashboard;
