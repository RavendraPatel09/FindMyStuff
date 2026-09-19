import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Target, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  MapPin, 
  Star,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const AIMatchingEngine = ({ item, onMatchFound, className = "" }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matches, setMatches] = useState([]);
  const [confidence, setConfidence] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('idle');

  // Mock AI analysis stages
  const analysisStages = [
    { id: 'scanning', label: 'Scanning database...', icon: Brain, duration: 1000 },
    { id: 'matching', label: 'AI pattern matching...', icon: Target, duration: 1500 },
    { id: 'ranking', label: 'Ranking results...', icon: TrendingUp, duration: 800 },
    { id: 'complete', label: 'Analysis complete!', icon: Sparkles, duration: 500 }
  ];

  // Mock matches data
  const mockMatches = [
    {
      id: 1,
      title: 'Black iPhone 13 Pro',
      location: 'Library - 2nd Floor',
      timeAgo: '2 hours ago',
      confidence: 95,
      matchReasons: ['Color match', 'Model match', 'Location proximity'],
      image: '/api/placeholder/80/80',
      reporter: 'Sarah Chen',
      status: 'found'
    },
    {
      id: 2,
      title: 'Dark Blue Phone Case',
      location: 'Student Center',
      timeAgo: '5 hours ago',
      confidence: 78,
      matchReasons: ['Similar description', 'Recent report'],
      image: '/api/placeholder/80/80',
      reporter: 'Mike Johnson',
      status: 'found'
    },
    {
      id: 3,
      title: 'Apple iPhone (Black)',
      location: 'Cafeteria',
      timeAgo: '1 day ago',
      confidence: 65,
      matchReasons: ['Brand match', 'Color similarity'],
      image: '/api/placeholder/80/80',
      reporter: 'Emma Davis',
      status: 'found'
    }
  ];

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setMatches([]);
    setConfidence(0);

    for (let i = 0; i < analysisStages.length; i++) {
      setAnalysisStage(analysisStages[i].id);
      await new Promise(resolve => setTimeout(resolve, analysisStages[i].duration));
      
      if (i === analysisStages.length - 1) {
        setMatches(mockMatches);
        setConfidence(95);
      }
    }

    setIsAnalyzing(false);
    setAnalysisStage('complete');
  };

  const MatchCard = ({ match, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 group cursor-pointer"
      whileHover={{ y: -2 }}
      onClick={() => onMatchFound?.(match)}
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
              <span className="text-2xl">📱</span>
            </div>
          </div>
          <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
            match.confidence >= 90 ? 'bg-green-500' : 
            match.confidence >= 70 ? 'bg-yellow-500' : 'bg-gray-500'
          }`}>
            {match.confidence}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {match.title}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {match.confidence}% match
            </span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{match.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{match.timeAgo}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {match.matchReasons.map((reason, i) => (
              <span
                key={i}
                className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full"
              >
                {reason}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Reported by {match.reporter}
            </span>
            <button className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium group-hover:translate-x-1 transition-transform">
              <span>Contact</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI Matching Engine
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Powered by advanced machine learning
              </p>
            </div>
          </div>
          
          {!isAnalyzing && matches.length === 0 && (
            <button
              onClick={startAnalysis}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-glow flex items-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>Find Matches</span>
            </button>
          )}
        </div>
      </div>

      {/* Analysis Progress */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-primary-50/50 to-purple-50/50 dark:from-primary-900/10 dark:to-purple-900/10"
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                {analysisStages.map((stage, index) => {
                  const StageIcon = stage.icon;
                  const isActive = stage.id === analysisStage;
                  const isComplete = analysisStages.findIndex(s => s.id === analysisStage) > index;
                  
                  return (
                    <motion.div
                      key={stage.id}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-primary-500 text-white' :
                        isComplete ? 'bg-green-500 text-white' :
                        'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      }`}
                      animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ repeat: isActive ? Infinity : 0, duration: 1 }}
                    >
                      {isComplete ? <CheckCircle className="w-5 h-5" /> : <StageIcon className="w-5 h-5" />}
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {analysisStages.find(s => s.id === analysisStage)?.label}
                  </span>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <Sparkles className="w-4 h-4 text-primary-500" />
                  </motion.div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((analysisStages.findIndex(s => s.id === analysisStage) + 1) / analysisStages.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <div className="p-6">
        <AnimatePresence>
          {matches.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{matches.length}</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Matches Found</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{confidence}%</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Best Match</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">2.3s</div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">Analysis Time</div>
                </div>
              </div>

              {/* Match Results */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Potential Matches
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Sorted by confidence
                  </span>
                </div>
                
                <div className="space-y-3">
                  {matches.map((match, index) => (
                    <MatchCard key={match.id} match={match} index={index} />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={startAnalysis}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  <Zap className="w-4 h-4" />
                  <span>Re-analyze</span>
                </button>
                
                <div className="flex space-x-3">
                  <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    Refine Search
                  </button>
                  <button className="px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-glow">
                    View All Results
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isAnalyzing && matches.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Ready to Find Matches
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our AI will analyze your item and find the best possible matches from our database
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Visual similarity</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Location proximity</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Time correlation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Pattern matching</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIMatchingEngine;
