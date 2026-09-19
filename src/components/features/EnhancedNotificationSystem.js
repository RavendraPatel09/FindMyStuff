import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X, Zap, Heart, Star, Gift } from 'lucide-react';

const NotificationContext = createContext();

export const useEnhancedNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useEnhancedNotification must be used within EnhancedNotificationProvider');
  }
  return context;
};

const notificationIcons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  achievement: Star,
  celebration: Gift,
  energy: Zap,
  love: Heart,
};

const notificationStyles = {
  success: {
    bg: 'from-green-500 to-emerald-600',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-white',
    glow: 'shadow-green-500/25',
  },
  error: {
    bg: 'from-red-500 to-rose-600',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-white',
    glow: 'shadow-red-500/25',
  },
  info: {
    bg: 'from-blue-500 to-cyan-600',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-white',
    glow: 'shadow-blue-500/25',
  },
  achievement: {
    bg: 'from-purple-500 to-pink-600',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-white',
    glow: 'shadow-purple-500/25',
  },
  celebration: {
    bg: 'from-yellow-500 to-orange-600',
    border: 'border-yellow-200 dark:border-yellow-800',
    text: 'text-white',
    glow: 'shadow-yellow-500/25',
  },
  energy: {
    bg: 'from-indigo-500 to-purple-600',
    border: 'border-indigo-200 dark:border-indigo-800',
    text: 'text-white',
    glow: 'shadow-indigo-500/25',
  },
  love: {
    bg: 'from-pink-500 to-rose-600',
    border: 'border-pink-200 dark:border-pink-800',
    text: 'text-white',
    glow: 'shadow-pink-500/25',
  },
};

const Notification = ({ notification, onClose }) => {
  const Icon = notificationIcons[notification.type] || Info;
  const style = notificationStyles[notification.type] || notificationStyles.info;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.8 }}
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${style.bg} ${style.text} shadow-2xl ${style.glow} border ${style.border} backdrop-blur-md`}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, currentColor 0%, transparent 50%)`,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <div className="relative p-4 flex items-start space-x-3">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0"
        >
          <Icon className="w-6 h-6" />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          {notification.title && (
            <motion.h4 
              className="font-semibold text-sm mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {notification.title}
            </motion.h4>
          )}
          <motion.p 
            className="text-sm opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {notification.message}
          </motion.p>
          
          {notification.action && (
            <motion.button
              onClick={notification.action.onClick}
              className="mt-2 text-xs font-medium underline hover:no-underline transition-all duration-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {notification.action.label}
            </motion.button>
          )}
        </div>
        
        <motion.button
          onClick={() => onClose(notification.id)}
          className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Progress Bar */}
      {notification.duration && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: notification.duration / 1000, ease: 'linear' }}
        />
      )}

      {/* Sparkle Effects for Special Notifications */}
      {(notification.type === 'achievement' || notification.type === 'celebration') && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export const EnhancedNotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      duration: 5000,
      ...notification,
    };

    setNotifications(prev => [...prev, newNotification]);

    if (newNotification.duration) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Enhanced notification methods
  const success = useCallback((message, options = {}) => {
    return addNotification({ type: 'success', message, ...options });
  }, [addNotification]);

  const error = useCallback((message, options = {}) => {
    return addNotification({ type: 'error', message, ...options });
  }, [addNotification]);

  const info = useCallback((message, options = {}) => {
    return addNotification({ type: 'info', message, ...options });
  }, [addNotification]);

  const achievement = useCallback((message, options = {}) => {
    return addNotification({ 
      type: 'achievement', 
      message, 
      title: '🎉 Achievement Unlocked!',
      duration: 8000,
      ...options 
    });
  }, [addNotification]);

  const celebration = useCallback((message, options = {}) => {
    return addNotification({ 
      type: 'celebration', 
      message, 
      title: '🎊 Celebration!',
      duration: 6000,
      ...options 
    });
  }, [addNotification]);

  const energy = useCallback((message, options = {}) => {
    return addNotification({ 
      type: 'energy', 
      message, 
      title: '⚡ Power Up!',
      ...options 
    });
  }, [addNotification]);

  const love = useCallback((message, options = {}) => {
    return addNotification({ 
      type: 'love', 
      message, 
      title: '💖 Special Message',
      ...options 
    });
  }, [addNotification]);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    info,
    achievement,
    celebration,
    energy,
    love,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-[9999] space-y-3 max-w-sm w-full">
        <AnimatePresence mode="popLayout">
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
              onClose={removeNotification}
            />
          ))}
        </AnimatePresence>
        
        {notifications.length > 1 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={clearAll}
            className="w-full p-2 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Clear All ({notifications.length})
          </motion.button>
        )}
      </div>
    </NotificationContext.Provider>
  );
};

export default EnhancedNotificationProvider;
