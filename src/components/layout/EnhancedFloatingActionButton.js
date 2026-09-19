import React, { useState } from 'react';
import { Plus, Upload, Search, Camera, MessageSquare, X } from 'lucide-react';
import { useNotification } from './NotificationSystem';
import PostItemModal from './PostItemModal';

const EnhancedFloatingActionButton = ({ className = "fixed bottom-6 right-6" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLostModal, setShowLostModal] = useState(false);
  const [showFoundModal, setShowFoundModal] = useState(false);
  const { success, info } = useNotification();

  const actions = [
    {
      id: 'lost',
      icon: Upload,
      label: 'Report Lost Item',
      color: 'bg-red-500 hover:bg-red-600',
      onClick: () => {
        setShowLostModal(true);
        setIsOpen(false);
      }
    },
    {
      id: 'found',
      icon: Search,
      label: 'Report Found Item',
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => {
        setShowFoundModal(true);
        setIsOpen(false);
      }
    },
    {
      id: 'photo',
      icon: Camera,
      label: 'Photo Search',
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => {
        info('Photo search feature coming soon!');
        setIsOpen(false);
      }
    },
    {
      id: 'chat',
      icon: MessageSquare,
      label: 'Quick Chat',
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => {
        info('Quick chat feature coming soon!');
        setIsOpen(false);
      }
    }
  ];

  return (
    <>
      <div className={`${className} z-30`}>
        {/* Action Buttons */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 space-y-3">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.id}
                  className="flex items-center justify-end animate-in slide-in-from-bottom duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {action.label}
                  </span>
                  <button
                    onClick={action.onClick}
                    className={`group w-12 h-12 ${action.color} text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl`}
                    title={action.label}
                  >
                    <Icon className="w-6 h-6 mx-auto" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 mx-auto" />
          ) : (
            <Plus className="w-6 h-6 mx-auto" />
          )}
        </button>

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-20 -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>

      {/* Modals */}
      <PostItemModal
        isOpen={showLostModal}
        onClose={() => setShowLostModal(false)}
        type="lost"
      />
      <PostItemModal
        isOpen={showFoundModal}
        onClose={() => setShowFoundModal(false)}
        type="found"
      />
    </>
  );
};

export default EnhancedFloatingActionButton;
