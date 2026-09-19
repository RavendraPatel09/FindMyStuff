import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Search, 
  Filter, 
  Layers, 
  Zap, 
  Clock, 
  TrendingUp,
  Eye,
  Navigation,
  Maximize2,
  Minimize2
} from 'lucide-react';

const InteractiveCampusMap = ({ onLocationSelect, className = "" }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [viewMode, setViewMode] = useState('heatmap'); // heatmap, recent, all
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const mapRef = useRef(null);

  // Mock campus locations with lost/found data
  const campusLocations = [
    {
      id: 'library',
      name: 'Main Library',
      x: 30,
      y: 25,
      type: 'academic',
      lostItems: 45,
      foundItems: 38,
      recentActivity: 12,
      hotspotLevel: 'high',
      description: 'Most common: Electronics, Books, ID Cards'
    },
    {
      id: 'cafeteria',
      name: 'Student Cafeteria',
      x: 60,
      y: 40,
      type: 'dining',
      lostItems: 32,
      foundItems: 28,
      recentActivity: 8,
      hotspotLevel: 'high',
      description: 'Most common: Wallets, Phones, Bags'
    },
    {
      id: 'gym',
      name: 'Sports Complex',
      x: 80,
      y: 60,
      type: 'recreation',
      lostItems: 28,
      foundItems: 25,
      recentActivity: 6,
      hotspotLevel: 'medium',
      description: 'Most common: Water bottles, Towels, Keys'
    },
    {
      id: 'parking-a',
      name: 'Parking Lot A',
      x: 15,
      y: 70,
      type: 'parking',
      lostItems: 18,
      foundItems: 15,
      recentActivity: 4,
      hotspotLevel: 'medium',
      description: 'Most common: Car keys, Parking passes'
    },
    {
      id: 'student-center',
      name: 'Student Center',
      x: 45,
      y: 55,
      type: 'social',
      lostItems: 35,
      foundItems: 30,
      recentActivity: 10,
      hotspotLevel: 'high',
      description: 'Most common: Laptops, Chargers, Headphones'
    },
    {
      id: 'computer-lab',
      name: 'Computer Lab',
      x: 25,
      y: 45,
      type: 'academic',
      lostItems: 22,
      foundItems: 20,
      recentActivity: 5,
      hotspotLevel: 'medium',
      description: 'Most common: USB drives, Cables, Mice'
    },
    {
      id: 'auditorium',
      name: 'Main Auditorium',
      x: 70,
      y: 25,
      type: 'academic',
      lostItems: 15,
      foundItems: 12,
      recentActivity: 3,
      hotspotLevel: 'low',
      description: 'Most common: Notebooks, Pens, Jackets'
    }
  ];

  const getHotspotColor = (level) => {
    switch (level) {
      case 'high': return 'from-red-500 to-orange-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-blue-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getLocationSize = (location) => {
    switch (location.hotspotLevel) {
      case 'high': return 'w-6 h-6';
      case 'medium': return 'w-5 h-5';
      case 'low': return 'w-4 h-4';
      default: return 'w-4 h-4';
    }
  };

  const LocationPin = ({ location }) => (
    <motion.div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10`}
      style={{ left: `${location.x}%`, top: `${location.y}%` }}
      onMouseEnter={() => setHoveredLocation(location)}
      onMouseLeave={() => setHoveredLocation(null)}
      onClick={() => {
        setSelectedLocation(location);
        onLocationSelect?.(location);
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className={`${getLocationSize(location)} bg-gradient-to-br ${getHotspotColor(location.hotspotLevel)} rounded-full shadow-lg border-2 border-white flex items-center justify-center`}>
        <MapPin className="w-3 h-3 text-white" />
      </div>
      
      {/* Pulse animation for high activity */}
      {location.hotspotLevel === 'high' && (
        <div className={`absolute inset-0 ${getLocationSize(location)} bg-gradient-to-br ${getHotspotColor(location.hotspotLevel)} rounded-full animate-ping opacity-30`} />
      )}
      
      {/* Activity indicator */}
      {location.recentActivity > 5 && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white animate-pulse" />
      )}
    </motion.div>
  );

  const LocationTooltip = ({ location }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="absolute z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 min-w-[280px]"
      style={{ 
        left: `${location.x}%`, 
        top: `${location.y - 15}%`,
        transform: 'translateX(-50%) translateY(-100%)'
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{location.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{location.type}</p>
        </div>
        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${getHotspotColor(location.hotspotLevel)}`} />
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-lg font-bold text-red-600 dark:text-red-400">{location.lostItems}</div>
          <div className="text-xs text-red-700 dark:text-red-300">Lost Items</div>
        </div>
        <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-lg font-bold text-green-600 dark:text-green-400">{location.foundItems}</div>
          <div className="text-xs text-green-700 dark:text-green-300">Found Items</div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{location.description}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{location.recentActivity} recent reports</span>
        </span>
        <span className="capitalize font-medium">{location.hotspotLevel} activity</span>
      </div>
      
      {/* Tooltip arrow */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800" />
    </motion.div>
  );

  return (
    <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden ${isFullscreen ? 'fixed inset-4 z-50' : ''} ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Campus Heatmap
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Real-time lost & found activity
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
              {[
                { id: 'heatmap', icon: TrendingUp, label: 'Heatmap' },
                { id: 'recent', icon: Clock, label: 'Recent' },
                { id: 'all', icon: Eye, label: 'All' }
              ].map((mode) => {
                const ModeIcon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      viewMode === mode.id
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <ModeIcon className="w-4 h-4" />
                    <span className="hidden sm:block">{mode.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 overflow-hidden">
        {/* Campus Background */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Buildings */}
            <rect x="20" y="20" width="15" height="20" fill="currentColor" className="text-gray-600" />
            <rect x="40" y="15" width="20" height="25" fill="currentColor" className="text-gray-600" />
            <rect x="65" y="18" width="18" height="22" fill="currentColor" className="text-gray-600" />
            <rect x="15" y="50" width="25" height="15" fill="currentColor" className="text-gray-600" />
            <rect x="50" y="45" width="30" height="20" fill="currentColor" className="text-gray-600" />
            
            {/* Paths */}
            <path d="M0 40 Q50 35 100 40" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-400" />
            <path d="M40 0 Q45 50 40 100" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-400" />
          </svg>
        </div>

        {/* Location Pins */}
        {campusLocations.map((location) => (
          <LocationPin key={location.id} location={location} />
        ))}

        {/* Heatmap Overlay */}
        {viewMode === 'heatmap' && (
          <div className="absolute inset-0 pointer-events-none">
            {campusLocations.map((location) => (
              <div
                key={`heatmap-${location.id}`}
                className={`absolute rounded-full opacity-30 bg-gradient-radial ${getHotspotColor(location.hotspotLevel)}`}
                style={{
                  left: `${location.x - 10}%`,
                  top: `${location.y - 10}%`,
                  width: `${20 + (location.lostItems / 2)}%`,
                  height: `${20 + (location.lostItems / 2)}%`,
                }}
              />
            ))}
          </div>
        )}

        {/* Tooltips */}
        <AnimatePresence>
          {hoveredLocation && (
            <LocationTooltip location={hoveredLocation} />
          )}
        </AnimatePresence>
      </div>

      {/* Legend & Stats */}
      <div className="p-6 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Legend */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Activity Levels</h3>
            <div className="space-y-2">
              {[
                { level: 'high', label: 'High Activity', color: 'from-red-500 to-orange-500' },
                { level: 'medium', label: 'Medium Activity', color: 'from-yellow-500 to-orange-500' },
                { level: 'low', label: 'Low Activity', color: 'from-green-500 to-blue-500' }
              ].map((item) => (
                <div key={item.level} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${item.color}`} />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Campus Overview</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <div className="text-xl font-bold text-red-600 dark:text-red-400">
                  {campusLocations.reduce((sum, loc) => sum + loc.lostItems, 0)}
                </div>
                <div className="text-xs text-red-700 dark:text-red-300">Total Lost</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  {campusLocations.reduce((sum, loc) => sum + loc.foundItems, 0)}
                </div>
                <div className="text-xs text-green-700 dark:text-green-300">Total Found</div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Location Details */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border border-primary-200 dark:border-primary-800"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-primary-900 dark:text-primary-100">
                  {selectedLocation.name}
                </h4>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-primary-700 dark:text-primary-300 mb-4">
                {selectedLocation.description}
              </p>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                  View Items Here
                </button>
                <button className="px-4 py-2 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg transition-colors text-sm font-medium">
                  Set Alert
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveCampusMap;
