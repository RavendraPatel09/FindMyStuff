import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Eye, MessageCircle, Star } from 'lucide-react';
import { useNotification } from './NotificationSystem';

const SmartMatchNotifier = ({ items = [] }) => {
  const [matches, setMatches] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const { success, info } = useNotification();

  // Smart matching algorithm based on keywords and categories
  const findPotentialMatches = (items) => {
    const lostItems = items.filter(item => item.status === 'lost');
    const foundItems = items.filter(item => item.status === 'found');
    const potentialMatches = [];

    lostItems.forEach(lostItem => {
      foundItems.forEach(foundItem => {
        const matchScore = calculateMatchScore(lostItem, foundItem);
        if (matchScore > 0.6) { // 60% match threshold
          potentialMatches.push({
            id: `${lostItem.id}-${foundItem.id}`,
            lostItem,
            foundItem,
            score: matchScore,
            reasons: getMatchReasons(lostItem, foundItem)
          });
        }
      });
    });

    return potentialMatches.sort((a, b) => b.score - a.score);
  };

  const calculateMatchScore = (lostItem, foundItem) => {
    let score = 0;
    
    // Category match (40% weight)
    if (lostItem.category === foundItem.category) {
      score += 0.4;
    }
    
    // Name similarity (30% weight)
    const nameSimilarity = calculateStringSimilarity(lostItem.name, foundItem.name);
    score += nameSimilarity * 0.3;
    
    // Description similarity (20% weight)
    const descSimilarity = calculateStringSimilarity(lostItem.description, foundItem.description);
    score += descSimilarity * 0.2;
    
    // Location proximity (10% weight)
    if (lostItem.location === foundItem.location) {
      score += 0.1;
    }
    
    return score;
  };

  const calculateStringSimilarity = (str1, str2) => {
    const words1 = str1.toLowerCase().split(' ');
    const words2 = str2.toLowerCase().split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  };

  const getMatchReasons = (lostItem, foundItem) => {
    const reasons = [];
    
    if (lostItem.category === foundItem.category) {
      reasons.push(`Same category: ${lostItem.category}`);
    }
    
    const commonWords = lostItem.name.toLowerCase().split(' ')
      .filter(word => foundItem.name.toLowerCase().includes(word));
    if (commonWords.length > 0) {
      reasons.push(`Similar names: "${commonWords.join(', ')}"`);
    }
    
    if (lostItem.location === foundItem.location) {
      reasons.push(`Same location: ${lostItem.location}`);
    }
    
    return reasons;
  };

  useEffect(() => {
    if (items.length > 0) {
      const potentialMatches = findPotentialMatches(items);
      if (potentialMatches.length > 0) {
        setMatches(potentialMatches.slice(0, 3)); // Show top 3 matches
        setShowNotification(true);
      }
    }
  }, [items]);

  const handleContactOwner = (match) => {
    success(`Contact request sent to ${match.foundItem.reportedBy}!`);
    setShowNotification(false);
  };

  const handleViewDetails = (match) => {
    info(`Viewing details for ${match.foundItem.name}`);
  };

  const handleDismiss = () => {
    setShowNotification(false);
  };

  return (
    <AnimatePresence>
      {showNotification && matches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-20 right-4 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <h3 className="font-semibold">Potential Matches Found!</h3>
              </div>
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-green-100 mt-1">
              We found {matches.length} potential match{matches.length > 1 ? 'es' : ''} for lost items
            </p>
          </div>

          {/* Matches List */}
          <div className="max-h-96 overflow-y-auto">
            {matches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {match.foundItem.name}
                      </h4>
                      <span className="text-xs font-medium px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                        {Math.round(match.score * 100)}% match
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      Found by {match.foundItem.reportedBy} at {match.foundItem.location}
                    </p>
                    
                    <div className="space-y-1 mb-3">
                      {match.reasons.slice(0, 2).map((reason, idx) => (
                        <p key={idx} className="text-xs text-gray-500 dark:text-gray-400">
                          • {reason}
                        </p>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleContactOwner(match)}
                        className="flex-1 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-medium rounded-lg hover:shadow-lg transition-all duration-200"
                      >
                        <MessageCircle className="w-3 h-3 inline mr-1" />
                        Contact
                      </button>
                      <button
                        onClick={() => handleViewDetails(match)}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Eye className="w-3 h-3 inline mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-50 dark:bg-gray-900/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Matches are automatically detected using AI
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SmartMatchNotifier;
