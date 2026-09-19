import React, { useState } from 'react';
import { EyeOff, Package, BookOpen, Bell, Ban } from 'lucide-react';
import BatchPosting from './BatchPosting';
import AnonymousPostingForm from './AnonymousPostingForm';
import CommunityGuidelines from './CommunityGuidelines';
import { BlockedUsersManager } from './UserReporting';

const StickyQuickBar = () => {
  const [showBatchPosting, setShowBatchPosting] = useState(false);
  const [showAnonymousPosting, setShowAnonymousPosting] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [showBlockedUsers, setShowBlockedUsers] = useState(false);

  return (
    <>
      {/* Sticky Quick Actions Bar (exact visual as before) */}
      <section className="py-6 bg-gradient-to-r from-blue-600 to-purple-600 sticky top-0 z-20 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowAnonymousPosting(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300"
              >
                <EyeOff className="w-5 h-5" />
                <span>Post Anonymously</span>
              </button>
              <button
                onClick={() => setShowBatchPosting(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300"
              >
                <Package className="w-5 h-5" />
                <span>Batch Upload</span>
              </button>
              <button
                onClick={() => setShowGuidelines(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300"
              >
                <BookOpen className="w-5 h-5" />
                <span>Guidelines & Tips</span>
              </button>
            </div>
            <div className="flex items-center space-x-3 text-white">
              <Bell className="w-5 h-5" />
              <span className="text-sm">New: AI Duplicate Detection Active</span>
              <button
                onClick={() => setShowBlockedUsers(true)}
                className="ml-3 inline-flex items-center space-x-1 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-md transition-colors text-sm"
                title="Manage Blocked Users"
              >
                <Ban className="w-4 h-4" />
                <span>Blocked Users</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modals controlled by this bar */}
      <BatchPosting 
        isOpen={showBatchPosting}
        onClose={() => setShowBatchPosting(false)}
        onSubmit={(items) => {
          // In a real app, save to backend
          console.log('Batch items submitted:', items);
        }}
      />

      <AnonymousPostingForm
        isOpen={showAnonymousPosting}
        onClose={() => setShowAnonymousPosting(false)}
        onSubmit={(item) => {
          console.log('Anonymous item submitted:', item);
        }}
      />

      <CommunityGuidelines
        isOpen={showGuidelines}
        onClose={() => setShowGuidelines(false)}
      />

      <BlockedUsersManager
        isOpen={showBlockedUsers}
        onClose={() => setShowBlockedUsers(false)}
      />
    </>
  );
};

export default StickyQuickBar;
