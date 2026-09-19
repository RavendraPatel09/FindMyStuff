import React from 'react';
import { X, Calendar, MapPin, Tag, User, Phone, Mail, MessageCircle } from 'lucide-react';
import SocialSharing from './SocialSharing';

// Select a representative image based on item name/category (mirrors ItemCard logic)
const getImageForItem = (item) => {
  const name = (item?.name || '').toLowerCase();
  const cat = (item?.category || '').toLowerCase();

  const mapping = [
    { keys: ['backpack', 'bag', 'rucksack'], url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=900&fit=crop&auto=format&q=80' },
    { keys: ['earphone', 'earphones', 'earbud', 'earbuds', 'headphone', 'headphones'], url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=900&fit=crop&auto=format&q=80' },
    { keys: ['tiffin', 'lunch', 'box', 'lunchbox'], url: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=1200&h=900&fit=crop&auto=format&q=80' },
    { keys: ['key', 'keys', 'keychain'], url: 'https://images.unsplash.com/photo-1562158070-0b6f8d3a2ee4?w=1200&h=900&fit=crop&auto=format&q=80' },
    { keys: ['tie', 'necktie'], url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&h=900&fit=crop&auto=format&q=80' },
    { keys: ['glasses', 'spectacle', 'spectacles', 'goggles'], url: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1200&h=900&fit=crop&auto=format&q=80' },
  ];

  for (const m of mapping) {
    if (m.keys.some(k => name.includes(k))) return m.url;
  }
  for (const m of mapping) {
    if (m.keys.some(k => cat.includes(k))) return m.url;
  }
  if (item?.image) return item.image;
  return 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1200&h=900&fit=crop&auto=format&q=80';
};

const Modal = ({ item, isOpen, onClose, onStartChat, onReport }) => {
  if (!isOpen || !item) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'found':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      case 'claimed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
          <button
            onClick={onClose}
            className="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-full shadow-2xl hover:shadow-glow transition-all duration-300 flex items-center justify-center group bg-red-500 hover:bg-red-600"
            tabIndex="0"
          >
            <div style={{ opacity: 1, transform: 'none' }}>
              <X className="w-7 h-7" />
            </div>
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6 relative rounded-lg overflow-hidden">
            <img 
              src={getImageForItem(item)} 
              alt={item.name}
              loading="lazy"
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1200&h=900&fit=crop&auto=format&q=80'; }}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
            <span className="absolute bottom-3 left-3 px-2 py-1 text-xs font-semibold rounded-full bg-white/80 text-gray-800 backdrop-blur-md">
              {item.category}
            </span>
          </div>
          
          <div className="flex items-center space-x-3 mb-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(item.status)}`}>
              {item.status.toUpperCase()}
            </span>
            <span className="text-gray-500 text-sm">
              {item.status === 'lost' ? 'Lost Item' : 'Found Item'}
            </span>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{item.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Item Details</h3>
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-500">Date:</span>
                  <p className="font-medium">{new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-500">Location:</span>
                  <p className="font-medium">{item.location}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Tag className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-500">Category:</span>
                  <p className="font-medium capitalize">{item.category}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-500">Reported by:</span>
                  <p className="font-medium">{item.reportedBy}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-500">Email:</span>
                  <p className="font-medium text-blue-600">{item.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-500">Phone:</span>
                  <p className="font-medium">{item.phone}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button 
                onClick={() => {
                  // Create mailto link
                  window.location.href = `mailto:${item.email}?subject=Found Your Lost Item: ${item.name}&body=Hi ${item.reportedBy},%0D%0A%0D%0AI saw your listing for "${item.name}" on FindMyStuff. I believe I may have information about your item.%0D%0A%0D%0APlease let me know if you'd like to discuss further.%0D%0A%0D%0ABest regards`;
                }}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </button>
              
              <button 
                onClick={() => {
                  // Create tel link
                  window.location.href = `tel:${item.phone}`;
                }}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </button>
            </div>

            {/* Secure Chat */}
            <div>
              <button
                onClick={() => onStartChat && onStartChat(item)}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Start Secure Chat</span>
              </button>
            </div>
            
            {/* Additional Actions */}
            <div className="flex gap-3">
              <SocialSharing item={item} className="flex-1" buttonClassName="w-full justify-center" />
              
              <button 
                onClick={() => {
                  // Add to favorites/watchlist
                  const favorites = JSON.parse(localStorage.getItem('findmystuff-favorites') || '[]');
                  if (!favorites.includes(item.id)) {
                    favorites.push(item.id);
                    localStorage.setItem('findmystuff-favorites', JSON.stringify(favorites));
                    alert('Added to your watchlist!');
                  }
                }}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              >
                <span>⭐</span>
                <span>Watch</span>
              </button>
              
              <button
                onClick={() => onReport && onReport(item)}
                className="px-4 py-2 border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
