import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, Clock, TrendingUp, Mic, Camera, Tag, Zap, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSearch, onFilterChange, showAdvanced = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  const categories = [
    { value: 'all', label: 'All Items', icon: '📋' },
    { value: 'electronics', label: 'Electronics', icon: '📱' },
    { value: 'books', label: 'Books', icon: '📚' },
    { value: 'clothing', label: 'Clothing', icon: '👕' },
    { value: 'accessories', label: 'Accessories', icon: '⌚' },
    { value: 'keys', label: 'Keys', icon: '🔑' },
    { value: 'bags', label: 'Bags', icon: '🎒' },
    { value: 'other', label: 'Other', icon: '📦' }
  ];

  const quickFilters = [
    { label: 'Electronics', icon: '📱', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
    { label: 'Clothing', icon: '👕', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
    { label: 'Books', icon: '📚', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
    { label: 'Keys', icon: '🔑', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' },
    { label: 'Bags', icon: '🎒', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
  ];

  const mockSuggestions = [
    { type: 'item', text: 'iPhone 13 Pro', icon: '📱' },
    { type: 'location', text: 'Library - 2nd Floor', icon: '📍' },
    { type: 'category', text: 'Electronics', icon: '🔌' },
    { type: 'recent', text: 'Black backpack', icon: '🎒' },
    { type: 'trending', text: 'AirPods', icon: '🎧' },
  ];

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = mockSuggestions.filter(s => 
        s.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, selectedCategory);
    setShowSuggestions(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange(category);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.text);
    setShowSuggestions(false);
    onSearch(suggestion.text, selectedCategory);
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsRecording(true);
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Search Container */}
      <motion.div 
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSearch} className="relative">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input with Suggestions */}
            <motion.div 
              className="flex-1 relative"
              initial={false}
              animate={{ width: "100%" }}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for lost items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-24 py-4 text-lg bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 focus:border-primary-500 dark:focus:border-primary-400 dark:text-white transition-all duration-200"
              />
              
              {/* Action Buttons */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                {showAdvanced && (
                  <>
                    <motion.button
                      type="button"
                      onClick={handleVoiceSearch}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-lg transition-colors ${
                        isRecording 
                          ? 'bg-red-100 text-red-600 animate-pulse' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400'
                      }`}
                      title="Voice Search"
                    >
                      <Mic className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 transition-colors"
                      title="Image Search"
                    >
                      <Camera className="w-4 h-4" />
                    </motion.button>
                  </>
                )}
                
                <AnimatePresence>
                  {searchTerm && (
                    <motion.button
                      type="button"
                      className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                      onClick={() => setSearchTerm("")}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Search Suggestions */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
                  >
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <span className="text-lg">{suggestion.icon}</span>
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">{suggestion.text}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{suggestion.type}</p>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Category Filter */}
            <div className="relative min-w-[200px]">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full pl-10 pr-8 py-4 border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 focus:border-primary-500 dark:focus:border-primary-400 appearance-none dark:text-white transition-all duration-200"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Advanced Filters Toggle */}
            {showAdvanced && (
              <motion.button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-4 rounded-xl font-medium transition-all duration-200 ${
                  showFilters 
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                title="Advanced Filters"
              >
                <Filter className="w-5 h-5" />
              </motion.button>
            )}
            
            {/* Search Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-glow"
            >
              Search
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Quick Filter Pills */}
      {showAdvanced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {quickFilters.map((filter, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(filter.label.toLowerCase())}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${filter.color}`}
            >
              <span className="mr-1">{filter.icon}</span>
              {filter.label}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary-500" />
                  Advanced Filters
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Location
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white">
                    <option value="">All Locations</option>
                    <option value="library">Library</option>
                    <option value="cafeteria">Cafeteria</option>
                    <option value="gym">Gymnasium</option>
                    <option value="parking">Parking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Date Range
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white">
                    <option value="">Any Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white">
                    <option value="">All Items</option>
                    <option value="lost">Lost Items</option>
                    <option value="found">Found Items</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  Clear All Filters
                </button>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-glow"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
