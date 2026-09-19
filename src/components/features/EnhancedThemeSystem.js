import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EnhancedThemeContext = createContext();

export const useEnhancedTheme = () => {
  const context = useContext(EnhancedThemeContext);
  if (!context) {
    throw new Error('useEnhancedTheme must be used within EnhancedThemeProvider');
  }
  return context;
};

const themes = {
  light: {
    name: 'Light',
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: '#1F2937',
    },
    gradient: 'from-blue-50 to-indigo-100',
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: '#60A5FA',
      secondary: '#A78BFA',
      background: '#111827',
      surface: '#1F2937',
      text: '#F9FAFB',
    },
    gradient: 'from-gray-900 to-gray-800',
  },
  sunset: {
    name: 'Sunset',
    colors: {
      primary: '#F59E0B',
      secondary: '#EF4444',
      background: '#FEF3C7',
      surface: '#FEF9E7',
      text: '#92400E',
    },
    gradient: 'from-yellow-100 to-orange-200',
  },
  ocean: {
    name: 'Ocean',
    colors: {
      primary: '#0EA5E9',
      secondary: '#06B6D4',
      background: '#E0F7FA',
      surface: '#F0F9FF',
      text: '#0C4A6E',
    },
    gradient: 'from-cyan-50 to-blue-100',
  },
  forest: {
    name: 'Forest',
    colors: {
      primary: '#059669',
      secondary: '#10B981',
      background: '#ECFDF5',
      surface: '#F0FDF4',
      text: '#064E3B',
    },
    gradient: 'from-green-50 to-emerald-100',
  },
  purple: {
    name: 'Purple Dream',
    colors: {
      primary: '#8B5CF6',
      secondary: '#A855F7',
      background: '#FAF5FF',
      surface: '#F3E8FF',
      text: '#581C87',
    },
    gradient: 'from-purple-50 to-violet-100',
  },
};

export const EnhancedThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('enhanced-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;
    
    // Apply CSS custom properties
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Apply theme class
    root.className = root.className.replace(/theme-\w+/g, '');
    root.classList.add(`theme-${currentTheme}`);
    
    localStorage.setItem('enhanced-theme', currentTheme);
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName] && themeName !== currentTheme) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTheme(themeName);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const value = {
    currentTheme,
    themes,
    changeTheme,
    isTransitioning,
    currentThemeData: themes[currentTheme],
  };

  return (
    <EnhancedThemeContext.Provider value={value}>
      <motion.div
        className="min-h-screen transition-colors duration-300"
        animate={{
          opacity: isTransitioning ? 0.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    </EnhancedThemeContext.Provider>
  );
};

export const ThemeSelector = ({ className = '' }) => {
  const { currentTheme, themes, changeTheme } = useEnhancedTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-gray-700 dark:text-gray-200 hover:bg-white/20 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div 
          className="w-4 h-4 rounded-full border-2 border-white/50"
          style={{ backgroundColor: themes[currentTheme].colors.primary }}
        />
        <span className="text-sm font-medium">{themes[currentTheme].name}</span>
      </motion.button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 py-2 z-50 overflow-hidden"
          >
            {Object.entries(themes).map(([key, theme]) => (
              <motion.button
                key={key}
                onClick={() => {
                  changeTheme(key);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200 ${
                  currentTheme === key 
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-200'
                }`}
                whileHover={{ x: 4 }}
              >
                <div 
                  className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <div className="flex-1">
                  <div className="font-medium text-sm">{theme.name}</div>
                </div>
                {currentTheme === key && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-primary-500 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default EnhancedThemeProvider;
