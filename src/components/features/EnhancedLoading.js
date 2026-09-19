import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, Heart, Star, Target, Shield } from 'lucide-react';

const EnhancedLoading = ({ 
  type = 'default', 
  message = 'Loading...', 
  fullScreen = false,
  className = '' 
}) => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const [loadingText, setLoadingText] = useState(message);

  const icons = [Search, Zap, Heart, Star, Target, Shield];
  
  const loadingMessages = [
    'Searching through items...',
    'Connecting with campus community...',
    'Analyzing matches...',
    'Almost there...',
    'Finalizing results...',
  ];

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 800);

    const messageInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2000);

    return () => {
      clearInterval(iconInterval);
      clearInterval(messageInterval);
    };
  }, []);

  const LoadingSpinner = () => (
    <div className="relative">
      {/* Main spinning ring */}
      <motion.div
        className="w-16 h-16 border-4 border-primary-200 dark:border-primary-800 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-t-primary-600 dark:border-t-primary-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Inner pulsing circle */}
      <motion.div
        className="absolute inset-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIcon}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="text-white"
          >
            {React.createElement(icons[currentIcon], { size: 20 })}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Orbiting particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary-500 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            marginLeft: -4,
            marginTop: -4,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div
            className="w-2 h-2 bg-primary-500 rounded-full"
            style={{
              transform: `translateX(${30 + i * 8}px)`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );

  const PulseLoader = () => (
    <div className="flex space-x-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-4 h-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );

  const WaveLoader = () => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-8 bg-gradient-to-t from-primary-500 to-secondary-500 rounded-full"
          animate={{
            scaleY: [1, 2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );

  const BouncingBalls = () => (
    <div className="flex space-x-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-4 h-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full shadow-lg"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );

  const renderLoader = () => {
    switch (type) {
      case 'pulse':
        return <PulseLoader />;
      case 'wave':
        return <WaveLoader />;
      case 'bounce':
        return <BouncingBalls />;
      default:
        return <LoadingSpinner />;
    }
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`flex flex-col items-center justify-center space-y-6 ${className}`}
    >
      {/* Loader */}
      <div className="relative">
        {renderLoader()}
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Loading text */}
      <div className="text-center space-y-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg font-medium text-gray-900 dark:text-white"
          >
            {loadingText}
          </motion.p>
        </AnimatePresence>
        
        {/* Animated dots */}
        <div className="flex justify-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary-500 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress bar (optional) */}
      <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.5) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.5) 0%, transparent 50%)`,
            }}
          />
        </div>
        
        <div className="relative z-10">
          {content}
        </div>
      </motion.div>
    );
  }

  return content;
};

// Loading overlay component
export const LoadingOverlay = ({ isLoading, children, ...props }) => (
  <div className="relative">
    {children}
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-40"
        >
          <EnhancedLoading {...props} />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default EnhancedLoading;
