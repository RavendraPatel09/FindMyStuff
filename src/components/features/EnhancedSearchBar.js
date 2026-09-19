import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Camera, X, Sparkles, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import VoiceSearch from './VoiceSearch';
import AISearchSuggestions from './AISearchSuggestions';

const EnhancedSearchBar = ({ 
  onSearch, 
  onFilterChange, 
  placeholder,
  showFilters = true,
  showVoiceSearch = true,
  showImageSearch = true,
  className = '' 
}) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    dateRange: '',
    status: 'all'
  });
  const [imagePreview, setImagePreview] = useState(null);
  const searchRef = useRef(null);
  const fileInputRef = useRef(null);

  const categories = [
    'Electronics', 'Personal Items', 'Clothing', 'Books', 'Sports Equipment', 
    'Jewelry', 'Bags', 'Documents', 'Keys', 'Other'
  ];

  const locations = [
    'Library', 'Cafeteria', 'Gym', 'Parking Lot', 'Classroom', 
    'Dormitory', 'Student Center', 'Lab', 'Auditorium', 'Campus Grounds'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery, filters);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleVoiceResult = (transcript, confidence) => {
    setQuery(transcript);
    if (confidence > 0.7) {
      handleSearch(transcript);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        // Here you would typically send the image to an AI service for analysis
        console.log('Image uploaded for search:', file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      location: '',
      dateRange: '',
      status: 'all'
    };
    setFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value && value !== 'all');

  return (
    <div ref={searchRef} className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Main Search Bar */}
      <motion.div
        className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border transition-all duration-300 ${
          isActive 
            ? 'border-primary-500 shadow-primary-500/25' 
            : 'border-gray-200 dark:border-gray-700'
        }`}
        whileFocus={{ scale: 1.02 }}
      >
        <div className="flex items-center p-4">
          {/* Search Icon */}
          <motion.div
            animate={{ rotate: isActive ? 360 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Search className="w-6 h-6 text-gray-400 mr-4" />
          </motion.div>

          {/* Input Field */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setIsActive(true);
              setShowSuggestions(true);
            }}
            onKeyPress={handleKeyPress}
            placeholder={placeholder || t('search')}
            className="flex-1 text-lg bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />

          {/* Clear Button */}
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={() => setQuery('')}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-2"
              >
                <X className="w-4 h-4 text-gray-400" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Image Search */}
            {showImageSearch && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title="Search by image"
              >
                <Camera className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>
            )}

            {/* Voice Search */}
            {showVoiceSearch && (
              <VoiceSearch 
                onResult={handleVoiceResult}
                onError={(error) => console.error('Voice search error:', error)}
              />
            )}

            {/* Filters Toggle */}
            {showFilters && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`p-2 rounded-lg transition-colors relative ${
                  hasActiveFilters || showAdvancedFilters
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
                }`}
                title="Advanced filters"
              >
                <Filter className="w-5 h-5" />
                {hasActiveFilters && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full"
                  />
                )}
              </motion.button>
            )}

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSearch()}
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-lg"
            >
              {t('search')}
            </motion.button>
          </div>
        </div>

        {/* Image Preview */}
        <AnimatePresence>
          {imagePreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-center space-x-4">
                <img 
                  src={imagePreview} 
                  alt="Search preview" 
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Searching by image...
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Sparkles className="w-4 h-4 text-primary-500" />
                    <span className="text-xs text-primary-600 dark:text-primary-400">
                      AI analyzing image
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setImagePreview(null)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Advanced Filters
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Any time</option>
                  <option value="today">Today</option>
                  <option value="week">This week</option>
                  <option value="month">This month</option>
                  <option value="3months">Last 3 months</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Items</option>
                  <option value="lost">Lost Items</option>
                  <option value="found">Found Items</option>
                  <option value="returned">Returned Items</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Suggestions */}
      <AnimatePresence>
        {showSuggestions && (
          <AISearchSuggestions
            query={query}
            onSuggestionSelect={(suggestion) => {
              setQuery(suggestion.text);
              handleSearch(suggestion.text);
            }}
            onSearch={(searchText) => {
              setQuery(searchText);
              handleSearch(searchText);
            }}
          />
        )}
      </AnimatePresence>

      {/* Hidden file input for image search */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default EnhancedSearchBar;
