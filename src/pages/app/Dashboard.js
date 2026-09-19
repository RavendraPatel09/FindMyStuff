import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/ui/SearchBar';
import ItemCard from '../components/ui/ItemCard';
import Modal from '../components/ui/Modal';
import FloatingActionButton from '../components/layout/FloatingActionButton';
import StaggeredGrid from '../components/ui/StaggeredGrid';
import ScrollReveal from '../components/ui/ScrollReveal';
import SmartDashboard from '../components/features/SmartDashboard';
import QuickActionsPanel from '../components/features/QuickActionsPanel';
import AIMatchingEngine from '../components/features/AIMatchingEngine';
import InteractiveCampusMap from '../components/features/InteractiveCampusMap';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import SmartMatchNotifier from '../components/features/SmartMatchNotifier';
import QuickActionBar from '../components/layout/QuickActionBar';
import { Plus, Filter, Camera, Upload, Search, Grid, BarChart3, Map, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MessagingSystem from '../components/features/MessagingSystem';
import UserReporting from '../components/features/UserReporting';

const Dashboard = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState('dashboard'); // dashboard, browse, map, ai
  const [activeFilters, setActiveFilters] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatItem, setChatItem] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Mock data for demonstration - final cleaned version
  const mockItems = [
    {
      id: 1,
      name: 'Canvas Backpack',
      description: 'Canvas backpack with laptop sleeve found near auditorium.',
      category: 'bag',
      status: 'found',
      date: '2025-09-01',
      location: 'Auditorium Entrance',
      reportedBy: 'Ananya Gupta',
      email: 'ananya.g@university.edu',
      phone: '+1 (555) 111-2233',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop'
    },
    {
      id: 2,
      name: 'Wire Earphone',
      description: 'Black wire earphone found in the computer lab.',
      category: 'electronics',
      status: 'found',
      date: '2025-09-02',
      location: 'Computer Lab',
      reportedBy: 'Rohit Mehta',
      email: 'rohit.mehta@university.edu',
      phone: '+1 (555) 987-6543',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop'
    },
    {
      id: 3,
      name: 'Tiffin Box',
      description: 'Silver tiffin box left in the cafeteria.',
      category: 'accessories',
      status: 'lost',
      date: '2025-09-03',
      location: 'Student Cafeteria',
      reportedBy: 'Meera Nair',
      email: 'meera.nair@university.edu',
      phone: '+1 (555) 456-7890',
      image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=800&h=600&fit=crop'
    },
    {
      id: 4,
      name: 'Keychain with Hostel Keys',
      description: 'Set of hostel keys attached to a red keychain.',
      category: 'keys',
      status: 'found',
      date: '2025-09-04',
      location: 'Parking Lot B',
      reportedBy: 'Kabir Sharma',
      email: 'kabir@university.edu',
      phone: '+1 (555) 234-5678',
      image: 'https://images.unsplash.com/photo-1562158070-0b6f8d3a2ee4?w=800&h=600&fit=crop'
    },
    {
      id: 5,
      name: 'Tie',
      description: 'Blue striped tie found in the auditorium.',
      category: 'clothing',
      status: 'found',
      date: '2025-09-05',
      location: 'Auditorium',
      reportedBy: 'Siddhi',
      email: 'siddhi@university.edu',
      phone: '+1 (555) 345-6789',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&h=600&fit=crop'
    },
    {
      id: 6,
      name: 'Round Glasses',
      description: 'Round prescription glasses found near cafeteria.',
      category: 'accessories',
      status: 'lost',
      date: '2025-09-06',
      location: 'Student Cafeteria',
      reportedBy: 'Priya Iyer',
      email: 'priya.iyer@university.edu',
      phone: '+1 (555) 678-9012',
      image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800&h=600&fit=crop'
    }
  ];
  // End of mockItems array
  const loadItems = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setItems(mockItems);
    setFilteredItems(mockItems);
    setIsLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSearch = (searchTerm, category) => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category && category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    setFilteredItems(filtered);
  };

  const handleFilterChange = (category) => {
    let filtered = items;

    if (category && category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    setFilteredItems(filtered);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleStartChat = (item) => {
    setChatItem(item);
    setIsChatOpen(true);
  };

  const handleReport = (item) => {
    setSelectedItem(item);
    setIsReportOpen(true);
  };

  const handleQuickAction = (action, value) => {
    switch (action) {
      case 'report-lost':
        console.log('Report lost item');
        break;
      case 'report-found':
        console.log('Report found item');
        break;
      case 'set-alert':
        console.log('Set alert for matches');
        break;
      case 'nearby-items':
        // Filter items by location (mock implementation)
        const nearbyItems = items.filter(item => 
          item.location.toLowerCase().includes('library') || 
          item.location.toLowerCase().includes('cafeteria')
        );
        setFilteredItems(nearbyItems);
        break;
      case 'filter':
        setActiveFilters(prev => ({
          ...prev,
          [value]: !prev[value]
        }));
        // Apply filter logic here
        let filtered = items;
        if (value === 'today') {
          const today = new Date().toISOString().split('T')[0];
          filtered = items.filter(item => item.date === today);
        } else if (value === 'electronics') {
          filtered = items.filter(item => item.category === 'electronics');
        } else if (value === 'lost' || value === 'found') {
          filtered = items.filter(item => item.status === value);
        }
        setFilteredItems(filtered);
        break;
      case 'clear-filters':
        setActiveFilters({});
        setFilteredItems(items);
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="container mx-auto">
          <LoadingSkeleton type="card" count={6} />
        </div>
      </div>
    );
  }

  const viewTabs = [
    { id: 'dashboard', label: 'Smart Dashboard', icon: BarChart3 },
    { id: 'browse', label: 'Browse Items', icon: Grid },
    { id: 'map', label: 'Campus Map', icon: Map },
    { id: 'ai', label: 'AI Matching', icon: Brain }
  ];

  const fabActions = [
    {
      label: 'Report Lost Item',
      icon: <Search className="w-5 h-5" />,
      onClick: () => console.log('Report Lost Item')
    },
    {
      label: 'Report Found Item',
      icon: <Camera className="w-5 h-5" />,
      onClick: () => console.log('Report Found Item')
    },
    {
      label: 'Upload Image',
      icon: <Upload className="w-5 h-5" />,
      onClick: () => console.log('Upload Image')
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex overflow-x-auto scrollbar-hide bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            {viewTabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap relative ${
                    activeView === tab.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <TabIcon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* View Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {activeView === 'dashboard' && (
              <div className="space-y-8">
                <SmartDashboard user={user} />
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <QuickActionsPanel 
                    onAction={(action) => console.log('Quick action:', action)}
                  />
                  <InteractiveCampusMap 
                    onLocationSelect={(location) => console.log('Location selected:', location)}
                    className="h-[600px]"
                  />
                </div>
              </div>
            )}

            {activeView === 'browse' && (
              <div className="space-y-8">
                {/* Quick Action Bar */}
                <QuickActionBar 
                  onAction={handleQuickAction}
                  activeFilters={activeFilters}
                />
                
                {/* Enhanced Search */}
                <SearchBar
                  onSearch={handleSearch}
                  onFilterChange={handleFilterChange}
                  showAdvanced={true}
                />

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Items', count: items.length, color: 'from-blue-500 to-cyan-500', icon: Grid },
                    { label: 'Found Items', count: items.filter(item => item.status === 'found').length, color: 'from-green-500 to-emerald-500', icon: Plus },
                    { label: 'Lost Items', count: items.filter(item => item.status === 'lost').length, color: 'from-red-500 to-pink-500', icon: Search },
                    { label: 'Success Rate', count: '94%', color: 'from-purple-500 to-indigo-500', icon: BarChart3 }
                  ].map((stat, index) => {
                    const StatIcon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-200 group"
                        whileHover={{ y: -4 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.count}</p>
                          </div>
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                            <StatIcon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Items Grid */}
                {filteredItems.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Filter className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No items found</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">Try adjusting your search criteria or check back later.</p>
                    <button
                      onClick={() => setFilteredItems(items)}
                      className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <StaggeredGrid>
                    {filteredItems.map(item => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        onClick={handleItemClick}
                      />
                    ))}
                  </StaggeredGrid>
                )}
              </div>
            )}

            {activeView === 'map' && (
              <InteractiveCampusMap 
                onLocationSelect={(location) => console.log('Location selected:', location)}
                className="h-[800px]"
              />
            )}

            {activeView === 'ai' && (
              <AIMatchingEngine 
                item={selectedItem}
                onMatchFound={(match) => console.log('Match found:', match)}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Item Detail Modal */}
        <Modal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={closeModal}
          onStartChat={handleStartChat}
          onReport={handleReport}
        />
      </div>
      
      {/* Enhanced FAB */}
      <FloatingActionButton 
        onAddItem={(type) => console.log('Add item:', type)}
        onQuickSearch={() => console.log('Quick search')}
      />
      
      {/* Smart Match Notifier */}
      <SmartMatchNotifier items={items} />

      {/* Secure Chat Modal */}
      {isChatOpen && (
        <MessagingSystem
          item={chatItem}
          currentUser={user?.name || 'You'}
          recipient={chatItem?.reportedBy}
          onClose={() => setIsChatOpen(false)}
        />
      )}

      {/* Reporting/Blocking Modal */}
      <UserReporting
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetUser={selectedItem?.reportedBy}
        targetItem={selectedItem}
      />
    </motion.div>
  );
};

export default Dashboard;
