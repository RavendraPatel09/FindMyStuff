import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Clock, TrendingUp, MapPin, Tag, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AISearchSuggestions = ({ query, onSuggestionSelect, onSearch, className = '' }) => {
  const { t } = useLanguage();
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingItems, setTrendingItems] = useState([]);
  const debounceRef = useRef(null);

  // Mock AI suggestions based on query
  const generateAISuggestions = (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) return [];

    const mockSuggestions = [
      { type: 'item', text: `${searchQuery} phone`, category: 'Electronics', confidence: 0.95 },
      { type: 'item', text: `${searchQuery} laptop`, category: 'Electronics', confidence: 0.88 },
      { type: 'item', text: `${searchQuery} keys`, category: 'Personal', confidence: 0.82 },
      { type: 'item', text: `${searchQuery} wallet`, category: 'Personal', confidence: 0.79 },
      { type: 'location', text: `${searchQuery} in library`, location: 'Library', confidence: 0.76 },
      { type: 'location', text: `${searchQuery} in cafeteria`, location: 'Cafeteria', confidence: 0.73 },
      { type: 'category', text: `${searchQuery} electronics`, category: 'Electronics', confidence: 0.70 },
      { type: 'user', text: `${searchQuery} reported by students`, user: 'Students', confidence: 0.67 }
    ];

    return mockSuggestions
      .filter(s => s.text.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 6)
      .sort((a, b) => b.confidence - a.confidence);
  };

  // Load recent searches from localStorage
  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem('findmyitem-recent-searches') || '[]');
    setRecentSearches(recent.slice(0, 5));

    // Mock trending items
    setTrendingItems([
      { text: 'iPhone 13', count: 45, trend: 'up' },
      { text: 'MacBook Pro', count: 32, trend: 'up' },
      { text: 'Car keys', count: 28, trend: 'stable' },
      { text: 'Wallet', count: 24, trend: 'down' },
      { text: 'Backpack', count: 19, trend: 'up' }
    ]);
  }, []);

  // Debounced search suggestions
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (query && query.length >= 2) {
        setIsLoading(true);
        // Simulate API delay
        setTimeout(() => {
          setSuggestions(generateAISuggestions(query));
          setIsLoading(false);
        }, 300);
      } else {
        setSuggestions([]);
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  const handleSuggestionClick = (suggestion) => {
    // Save to recent searches
    const recent = JSON.parse(localStorage.getItem('findmyitem-recent-searches') || '[]');
    const updated = [suggestion.text, ...recent.filter(r => r !== suggestion.text)].slice(0, 10);
    localStorage.setItem('findmyitem-recent-searches', JSON.stringify(updated));
    setRecentSearches(updated.slice(0, 5));

    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    }
  };

  const handleRecentSearchClick = (searchText) => {
    if (onSearch) {
      onSearch(searchText);
    }
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'location': return MapPin;
      case 'category': return Tag;
      case 'user': return User;
      default: return Search;
    }
  };

  if (!query && recentSearches.length === 0 && trendingItems.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 ${className}`}
    >
      {/* AI Suggestions */}
      {query && query.length >= 2 && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              AI Suggestions
            </span>
          </div>
          
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3 p-2">
                  <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="w-12 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              <AnimatePresence>
                {suggestions.map((suggestion, index) => {
                  const IconComponent = getSuggestionIcon(suggestion.type);
                  return (
                    <motion.button
                      key={suggestion.text}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-left group"
                    >
                      <IconComponent className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {suggestion.text}
                        </div>
                        {suggestion.category && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            in {suggestion.category}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-xs text-primary-500 font-medium">
                          {Math.round(suggestion.confidence * 100)}%
                        </div>
                        <div className="w-2 h-2 bg-primary-500 rounded-full opacity-60" />
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* Recent Searches */}
      {!query && recentSearches.length > 0 && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              Recent Searches
            </span>
          </div>
          <div className="space-y-1">
            {recentSearches.map((search, index) => (
              <motion.button
                key={search}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleRecentSearchClick(search)}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-left group"
              >
                <Search className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                <span className="text-sm text-gray-900 dark:text-white">{search}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Trending Items */}
      {!query && trendingItems.length > 0 && (
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              Trending Items
            </span>
          </div>
          <div className="space-y-1">
            {trendingItems.map((item, index) => (
              <motion.button
                key={item.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleRecentSearchClick(item.text)}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-left group"
              >
                <div className={`w-2 h-2 rounded-full ${
                  item.trend === 'up' ? 'bg-green-500' : 
                  item.trend === 'down' ? 'bg-red-500' : 'bg-gray-400'
                }`} />
                <span className="text-sm text-gray-900 dark:text-white flex-1">{item.text}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{item.count}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AISearchSuggestions;
