import React, { useState } from 'react';
import { EyeOff, Eye, Shield, AlertCircle, Check, User, Lock } from 'lucide-react';
import DuplicateDetectionService from '../services/DuplicateDetection';

const AnonymousPostingForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    status: 'lost',
    image: null,
    isAnonymous: true,
    contactMethod: 'in-app', // 'in-app', 'email', 'none'
    alternateContact: ''
  });

  const [duplicateWarning, setDuplicateWarning] = useState(null);
  const [privacyLevel, setPrivacyLevel] = useState('high'); // 'high', 'medium', 'low'

  const categories = [
    'Electronics', 'Clothing', 'Books', 'Bags', 'Keys', 
    'Jewelry', 'Sports Equipment', 'Documents', 'Other'
  ];

  const locations = [
    'Library', 'Cafeteria', 'Gymnasium', 'Computer Lab', 
    'Lecture Hall', 'Parking Lot', 'Student Center', 'Dormitory'
  ];

  const privacySettings = {
    high: {
      label: 'Maximum Privacy',
      description: 'Completely anonymous. Contact only through secure in-app messaging.',
      icon: <Lock className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    medium: {
      label: 'Balanced Privacy',
      description: 'Show first name only. Allow email contact.',
      icon: <Shield className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    low: {
      label: 'Minimal Privacy',
      description: 'Show full name. Allow all contact methods.',
      icon: <User className="w-5 h-5" />,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const checkForDuplicate = async () => {
    const result = await DuplicateDetectionService.checkForDuplicate(formData);
    if (result.hasDuplicates) {
      setDuplicateWarning(result.topMatch);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check for duplicates before submitting
    await checkForDuplicate();
    
    // Prepare submission data based on privacy level
    let submissionData = { ...formData };
    
    switch(privacyLevel) {
      case 'high':
        submissionData.reportedBy = 'Anonymous';
        submissionData.email = 'hidden';
        submissionData.phone = 'hidden';
        break;
      case 'medium':
        submissionData.reportedBy = 'Anonymous User';
        submissionData.email = formData.alternateContact || 'hidden';
        submissionData.phone = 'hidden';
        break;
      case 'low':
        // In real app, would use actual user data
        submissionData.reportedBy = 'Current User';
        submissionData.email = formData.alternateContact || 'user@example.com';
        submissionData.phone = 'Available on request';
        break;
      default:
        break;
    }
    
    submissionData.privacyLevel = privacyLevel;
    submissionData.id = `anon-${Date.now()}`;
    submissionData.createdAt = new Date().toISOString();
    
    // Save to localStorage
    const existingItems = JSON.parse(localStorage.getItem('lostAndFoundItems') || '[]');
    localStorage.setItem('lostAndFoundItems', JSON.stringify([...existingItems, submissionData]));
    
    if (onSubmit) {
      onSubmit(submissionData);
    }
    
    alert('Item posted anonymously! You can track and communicate through the secure messaging system.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <EyeOff className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Anonymous Posting</h2>
                <p className="text-sm opacity-90 mt-1">Your identity will be protected</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Privacy Level Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Select Privacy Level</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(privacySettings).map(([level, settings]) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setPrivacyLevel(level)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    privacyLevel === level 
                      ? `border-blue-500 ${settings.bgColor}` 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`flex items-center space-x-2 mb-2 ${settings.color}`}>
                    {settings.icon}
                    <span className="font-medium">{settings.label}</span>
                  </div>
                  <p className="text-xs text-gray-600 text-left">{settings.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Duplicate Warning */}
          {duplicateWarning && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Potential duplicate detected ({duplicateWarning.score}% match)
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Similar item: {duplicateWarning.item.name}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Blue Backpack"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <select
                required
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select location</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                onBlur={checkForDuplicate}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Add details about the item (avoid personal information)..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="lost"
                    checked={formData.status === 'lost'}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="text-blue-600"
                  />
                  <span>Lost</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="found"
                    checked={formData.status === 'found'}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="text-blue-600"
                  />
                  <span>Found</span>
                </label>
              </div>
            </div>

            {privacyLevel === 'medium' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alternative Contact (Optional)
                </label>
                <input
                  type="email"
                  value={formData.alternateContact}
                  onChange={(e) => handleChange('alternateContact', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="anonymous@email.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This email will be shown instead of your real email
                </p>
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Ensure no personal information is visible in the photo
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Privacy Protection Active</p>
                <ul className="text-xs text-blue-700 mt-1 space-y-1">
                  <li className="flex items-center">
                    <Check className="w-3 h-3 mr-1" />
                    Your real name will not be displayed
                  </li>
                  <li className="flex items-center">
                    <Check className="w-3 h-3 mr-1" />
                    Communication through secure messaging only
                  </li>
                  <li className="flex items-center">
                    <Check className="w-3 h-3 mr-1" />
                    You can delete your post anytime
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2"
            >
              <EyeOff className="w-5 h-5" />
              <span>Post Anonymously</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnonymousPostingForm;
