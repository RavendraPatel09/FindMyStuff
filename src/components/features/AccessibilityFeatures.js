import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, EyeOff, Type, Palette, Volume2, VolumeX, 
  MousePointer, Keyboard, Settings, X, Check, Moon, Sun,
  Bell, BellOff, Save, Minimize2, Sparkles, Lightbulb,
  Zap, ZapOff, Globe, Languages, Shield, Wifi, Database,
  Clock, Smartphone, Monitor, Palette as PaletteIcon
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AccessibilityFeatures = () => {
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggleSettings = () => {
      setIsOpen(prev => !prev);
    };

    window.addEventListener('toggleSettings', handleToggleSettings);
    return () => {
      window.removeEventListener('toggleSettings', handleToggleSettings);
    };
  }, []);
  const [settings, setSettings] = useState({
    // Accessibility Settings
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: false,
    colorBlindFriendly: false,
    // Website Features
    darkMode: false,
    notifications: true,
    autoSave: true,
    compactMode: false,
    showAnimations: true,
    soundEffects: false,
    autoComplete: true,
    showTips: true,
    // New Useful Features
    offlineMode: false,
    dataSync: true,
    privacyMode: false,
    autoRefresh: true,
    mobileOptimized: true,
    desktopNotifications: true,
    colorScheme: 'auto' // 'light', 'dark', 'auto'
  });

  useEffect(() => {
    // Load saved settings
    const saved = localStorage.getItem('findmyitem-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
    
    // Initialize dark mode from system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!saved) {
      setSettings(prev => ({ ...prev, darkMode: prefersDark }));
    }
  }, []);

  useEffect(() => {
    // Apply settings to document
    const root = document.documentElement;
    const body = document.body;
    
    // Accessibility Settings
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
    
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    if (settings.colorBlindFriendly) {
      root.classList.add('colorblind-friendly');
    } else {
      root.classList.remove('colorblind-friendly');
    }
    
    if (settings.keyboardNavigation) {
      root.classList.add('keyboard-navigation');
    } else {
      root.classList.remove('keyboard-navigation');
    }
    
    // Website Features
    if (settings.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    if (settings.compactMode) {
      root.classList.add('compact-mode');
    } else {
      root.classList.remove('compact-mode');
    }
    
    if (!settings.showAnimations) {
      root.classList.add('no-animations');
    } else {
      root.classList.remove('no-animations');
    }
    
    // Handle notifications permission
    if (settings.notifications && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
    
    // Auto-save functionality
    if (settings.autoSave) {
      root.setAttribute('data-autosave', 'true');
    } else {
      root.removeAttribute('data-autosave');
    }

    // Save settings
    localStorage.setItem('findmyitem-settings', JSON.stringify(settings));
  }, [settings]);

  const showNotification = (message, type = 'success') => {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white text-sm font-medium z-50 transition-all duration-300 ${
      type === 'success' ? 'bg-green-500' : 'bg-blue-500'
    }`;
    notification.textContent = message;
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(-50%) translateY(-20px)';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(-50%) translateY(-20px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const toggleSetting = (key) => {
    const newValue = !settings[key];
    setSettings(prev => ({
      ...prev,
      [key]: newValue
    }));
    
    // Show notification for certain settings
    const settingNames = {
      darkMode: 'Dark Mode',
      notifications: 'Notifications',
      autoSave: 'Auto Save',
      compactMode: 'Compact Mode',
      showAnimations: 'Animations',
      soundEffects: 'Sound Effects',
      highContrast: 'High Contrast',
      largeText: 'Large Text',
      reducedMotion: 'Reduced Motion',
      keyboardNavigation: 'Keyboard Navigation',
      colorBlindFriendly: 'Color Blind Mode',
      autoComplete: 'Auto Complete',
      showTips: 'Show Tips'
    };
    
    const settingName = settingNames[key] || key;
    showNotification(`${settingName} ${newValue ? 'enabled' : 'disabled'}`);
    
    // Special handling for notifications
    if (key === 'notifications' && newValue && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('FindMyStuff', {
              body: 'Notifications are now enabled!',
              icon: '/favicon.ico'
            });
          }
        });
      } else if (Notification.permission === 'granted') {
        new Notification('FindMyStuff', {
          body: 'Notifications are now enabled!',
          icon: '/favicon.ico'
        });
      }
    }
    
    // Special handling for sound effects
    if (key === 'soundEffects' && newValue) {
      // Play a test sound (if available)
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7bVlHgU5kdXzzHkpBSl+zO/eizEIHWq+8+OWT');
        audio.volume = 0.3;
        audio.play().catch(() => {}); // Ignore errors if audio can't play
      } catch (e) {
        // Ignore audio errors
      }
    }
  };

  const accessibilityOptions = [
    {
      key: 'highContrast',
      icon: Eye,
      title: 'High Contrast',
      description: 'Increase contrast for better visibility',
      color: 'from-blue-500 to-blue-600',
      category: 'accessibility'
    },
    {
      key: 'largeText',
      icon: Type,
      title: 'Large Text',
      description: 'Increase text size for better readability',
      color: 'from-green-500 to-green-600',
      category: 'accessibility'
    },
    {
      key: 'reducedMotion',
      icon: MousePointer,
      title: 'Reduced Motion',
      description: 'Minimize animations and transitions',
      color: 'from-purple-500 to-purple-600',
      category: 'accessibility'
    },
    {
      key: 'keyboardNavigation',
      icon: Keyboard,
      title: 'Keyboard Navigation',
      description: 'Enhanced keyboard navigation support',
      color: 'from-indigo-500 to-indigo-600',
      category: 'accessibility'
    },
    {
      key: 'colorBlindFriendly',
      icon: Palette,
      title: 'Color Blind Friendly',
      description: 'Adjust colors for color blindness',
      color: 'from-pink-500 to-pink-600',
      category: 'accessibility'
    }
  ];

  const websiteOptions = [
    {
      key: 'darkMode',
      icon: settings.darkMode ? Moon : Sun,
      title: 'Dark Mode',
      description: 'Switch between light and dark themes',
      color: 'from-gray-600 to-gray-800',
      category: 'appearance'
    },
    {
      key: 'notifications',
      icon: settings.notifications ? Bell : BellOff,
      title: 'Notifications',
      description: 'Enable browser notifications for updates',
      color: 'from-yellow-500 to-orange-500',
      category: 'features'
    },
    {
      key: 'autoSave',
      icon: Save,
      title: 'Auto Save',
      description: 'Automatically save your progress',
      color: 'from-emerald-500 to-teal-500',
      category: 'features'
    },
    {
      key: 'compactMode',
      icon: Minimize2,
      title: 'Compact Mode',
      description: 'Reduce spacing for more content',
      color: 'from-cyan-500 to-blue-500',
      category: 'appearance'
    },
    {
      key: 'showAnimations',
      icon: settings.showAnimations ? Sparkles : ZapOff,
      title: 'Animations',
      description: 'Enable smooth animations and effects',
      color: 'from-violet-500 to-purple-500',
      category: 'appearance'
    },
    {
      key: 'soundEffects',
      icon: settings.soundEffects ? Volume2 : VolumeX,
      title: 'Sound Effects',
      description: 'Enable audio feedback for actions',
      color: 'from-rose-500 to-pink-500',
      category: 'features'
    },
    {
      key: 'autoComplete',
      icon: Zap,
      title: 'Auto Complete',
      description: 'Smart suggestions while typing',
      color: 'from-amber-500 to-yellow-500',
      category: 'features'
    },
    {
      key: 'showTips',
      icon: Lightbulb,
      title: 'Show Tips',
      description: 'Display helpful tips and hints',
      color: 'from-lime-500 to-green-500',
      category: 'features'
    },
    {
      key: 'offlineMode',
      icon: Wifi,
      title: 'Offline Mode',
      description: 'Enable offline functionality',
      color: 'from-gray-500 to-gray-600',
      category: 'features'
    },
    {
      key: 'dataSync',
      icon: Database,
      title: 'Data Sync',
      description: 'Sync data across devices',
      color: 'from-blue-500 to-indigo-500',
      category: 'features'
    },
    {
      key: 'privacyMode',
      icon: Shield,
      title: 'Privacy Mode',
      description: 'Enhanced privacy protection',
      color: 'from-red-500 to-pink-500',
      category: 'features'
    },
    {
      key: 'autoRefresh',
      icon: Clock,
      title: 'Auto Refresh',
      description: 'Automatically refresh content',
      color: 'from-teal-500 to-cyan-500',
      category: 'features'
    },
    {
      key: 'mobileOptimized',
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Optimize for mobile devices',
      color: 'from-purple-500 to-violet-500',
      category: 'appearance'
    },
    {
      key: 'desktopNotifications',
      icon: Monitor,
      title: 'Desktop Notifications',
      description: 'Show notifications on desktop',
      color: 'from-orange-500 to-red-500',
      category: 'features'
    }
  ];

  return (
    <>
      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20, y: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20, y: -10 }}
              className="fixed top-20 right-4 w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 max-h-[calc(100vh-6rem)] overflow-y-auto"
              style={{ transformOrigin: 'top right' }}
            >
              {/* Header */}
              <div className="relative p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Settings className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {t('settings') || 'Settings'}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Customize your experience
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200 group"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" />
                  </motion.button>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-2 right-2 w-16 h-16 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-2xl -z-10 animate-pulse"></div>
                <div className="absolute bottom-2 left-2 w-12 h-12 bg-gradient-to-tr from-indigo-400/30 to-blue-400/30 rounded-full blur-xl -z-10 animate-bounce"></div>
              </div>

              {/* Options */}
              <div className="p-4">
                {/* Website Features Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center uppercase tracking-wide">
                    <Settings className="w-4 h-4 mr-2 text-purple-500" />
                    {t('websiteFeatures') || 'Website Features'}
                  </h3>
                  <div className="space-y-2">
                    {websiteOptions.map((option, index) => {
                      const IconComponent = option.icon;
                      const isEnabled = settings[option.key];
                      
                      return (
                        <motion.div
                          key={option.key}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (accessibilityOptions.length + index) * 0.05 }}
                          className={`p-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                            isEnabled
                              ? 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500'
                              : 'border-l-4 border-transparent'
                          }`}
                          onClick={() => toggleSetting(option.key)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 bg-gradient-to-br ${option.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <IconComponent className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                {option.title}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {option.description}
                              </p>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                              isEnabled
                                ? 'border-primary-500 bg-primary-500'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}>
                              {isEnabled && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Check className="w-2.5 h-2.5 text-white" />
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Language Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center uppercase tracking-wide">
                    <Globe className="w-4 h-4 mr-2 text-green-500" />
                    {t('language') || 'Language'}
                  </h3>
                  <div className="space-y-2">
                    {availableLanguages.map((language, index) => (
                      <motion.div
                        key={language.code}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (websiteOptions.length + index) * 0.05 }}
                        className={`p-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                          currentLanguage === language.code
                            ? 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500'
                            : 'border-l-4 border-transparent'
                        }`}
                        onClick={() => {
                          changeLanguage(language.code);
                          showNotification(`Language changed to ${language.name}`);
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-lg">{language.flag}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                              {language.name}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {language.code.toUpperCase()}
                            </p>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                            currentLanguage === language.code
                              ? 'border-primary-500 bg-primary-500'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {currentLanguage === language.code && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Check className="w-2.5 h-2.5 text-white" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/30 rounded-b-2xl">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Auto-saved
                  </p>
                  <button
                    onClick={() => {
                      setSettings({
                        // Accessibility Settings
                        highContrast: false,
                        largeText: false,
                        reducedMotion: false,
                        screenReader: false,
                        keyboardNavigation: false,
                        colorBlindFriendly: false,
                        // Website Features
                        darkMode: false,
                        notifications: true,
                        autoSave: true,
                        compactMode: false,
                        showAnimations: true,
                        soundEffects: false,
                        autoComplete: true,
                        showTips: true,
                        // New Useful Features
                        offlineMode: false,
                        dataSync: true,
                        privacyMode: false,
                        autoRefresh: true,
                        mobileOptimized: true,
                        desktopNotifications: true,
                        colorScheme: 'auto'
                      });
                      showNotification('All settings reset to defaults');
                    }}
                    className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-medium"
                  >
                    Reset All
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityFeatures;
