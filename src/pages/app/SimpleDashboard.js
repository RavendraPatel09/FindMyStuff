import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/ui/SearchBar';
import EnhancedFloatingActionButton from '../components/layout/EnhancedFloatingActionButton';
import { Search, Filter, Plus } from 'lucide-react';

const SimpleDashboard = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  useEffect(() => {
    const sampleItems = [
      {
        id: 1,
        name: 'iPhone 13 Pro',
        category: 'Electronics',
        status: 'lost',
        location: 'Library',
        date: '2024-01-15',
        description: 'Black iPhone 13 Pro with cracked screen protector',
        image: '/api/placeholder/300/200'
      },
      {
        id: 2,
        name: 'Blue Backpack',
        category: 'Bags',
        status: 'found',
        location: 'Student Center',
        date: '2024-01-14',
        description: 'Navy blue Jansport backpack with laptop inside',
        image: '/api/placeholder/300/200'
      },
      {
        id: 3,
        name: 'Car Keys',
        category: 'Keys',
        status: 'lost',
        location: 'Parking Lot B',
        date: '2024-01-13',
        description: 'Honda keys with red keychain',
        image: '/api/placeholder/300/200'
      },
      {
        id: 4,
        name: 'Textbook - Biology',
        category: 'Books',
        status: 'found',
        location: 'Science Building',
        date: '2024-01-12',
        description: 'Campbell Biology textbook, 12th edition',
        image: '/api/placeholder/300/200'
      }
    ];
    setItems(sampleItems);
    setFilteredItems(sampleItems);
  }, []);

  // Filter items
  useEffect(() => {
    let filtered = items;
    
    if (activeFilter !== 'all') {
      filtered = filtered.filter(item => item.status === activeFilter);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredItems(filtered);
  }, [items, activeFilter, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-4">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Browse Items
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find lost items or help others by reporting what you've found
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="mb-4">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              All Items ({items.length})
            </button>
            <button
              onClick={() => setActiveFilter('lost')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeFilter === 'lost'
                  ? 'bg-red-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Lost ({items.filter(item => item.status === 'lost').length})
            </button>
            <button
              onClick={() => setActiveFilter('found')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeFilter === 'found'
                  ? 'bg-green-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Found ({items.filter(item => item.status === 'found').length})
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-gray-400 dark:text-gray-500">
                  <Search className="w-12 h-12" />
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    item.status === 'lost'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{item.location}</span>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
                
                <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No items found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}

        {/* Enhanced Floating Action Button */}
        <EnhancedFloatingActionButton />
      </div>
    </div>
  );
};

export default SimpleDashboard;
