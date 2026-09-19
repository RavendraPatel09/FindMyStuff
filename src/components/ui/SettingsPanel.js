import React, { useState, useEffect } from 'react';
import { useNotification } from './NotificationSystem';
import { 
  Settings, X, Moon, Sun, Bell, Save, Minimize2, 
  Zap, Volume2, Search, HelpCircle, Wifi, Database,
  Shield, Clock, Smartphone, Monitor
} from 'lucide-react';

const SettingsPanel = ({ isOpen, onClose }) => {
  const { success } = useNotification();
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    autoSave: true,
    compactMode: false,
    animations: true,
    soundEffects: false,
    autoComplete: true,
    showTips: true,
    offlineMode: false,
    dataSync: true,
    privacyMode: false,
    autoRefresh: true,
    mobileOptimized: false,
    desktopNotifications: true
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('findmystuff-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleToggle = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    localStorage.setItem('findmystuff-settings', JSON.stringify(newSettings));
    success(`${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} ${newSettings[key] ? 'enabled' : 'disabled'}`);
  };

  const resetSettings = () => {
    const defaultSettings = {
      darkMode: false,
      notifications: true,
      autoSave: true,
      compactMode: false,
      animations: true,
      soundEffects: false,
      autoComplete: true,
      showTips: true,
      offlineMode: false,
      dataSync: true,
      privacyMode: false,
      autoRefresh: true,
      mobileOptimized: false,
      desktopNotifications: true
    };
    setSettings(defaultSettings);
    localStorage.setItem('findmystuff-settings', JSON.stringify(defaultSettings));
    success('Settings reset to defaults');
  };

  const features = [
    { key: 'darkMode', icon: settings.darkMode ? Sun : Moon, label: 'Dark Mode', description: 'Toggle dark/light theme' },
    { key: 'notifications', icon: Bell, label: 'Notifications', description: 'Show app notifications' },
    { key: 'autoSave', icon: Save, label: 'Auto Save', description: 'Automatically save changes' },
    { key: 'compactMode', icon: Minimize2, label: 'Compact Mode', description: 'Reduce spacing and padding' },
    { key: 'animations', icon: Zap, label: 'Animations', description: 'Enable smooth animations' },
    { key: 'soundEffects', icon: Volume2, label: 'Sound Effects', description: 'Play audio feedback' },
    { key: 'autoComplete', icon: Search, label: 'Auto Complete', description: 'Smart search suggestions' },
    { key: 'showTips', icon: HelpCircle, label: 'Show Tips', description: 'Display helpful hints' },
    { key: 'offlineMode', icon: Wifi, label: 'Offline Mode', description: 'Enable offline functionality' },
    { key: 'dataSync', icon: Database, label: 'Data Sync', description: 'Sync data across devices' },
    { key: 'privacyMode', icon: Shield, label: 'Privacy Mode', description: 'Enhanced privacy protection' },
    { key: 'autoRefresh', icon: Clock, label: 'Auto Refresh', description: 'Automatically refresh content' },
    { key: 'mobileOptimized', icon: Smartphone, label: 'Mobile Optimized', description: 'Optimize for mobile devices' },
    { key: 'desktopNotifications', icon: Monitor, label: 'Desktop Notifications', description: 'Show notifications on desktop' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Settings Grid */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.key}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {feature.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[feature.key]}
                      onChange={() => handleToggle(feature.key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              );
            })}
          </div>

          {/* Reset Button */}
          <div className="flex justify-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={resetSettings}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
