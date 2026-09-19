import React, { useState } from 'react';
import { Upload, Plus, X, Save, AlertTriangle, CheckCircle, Camera, FileText, Package, Trash2 } from 'lucide-react';
import DuplicateDetectionService from '../services/DuplicateDetection';

const BatchPosting = ({ isOpen, onClose, onSubmit }) => {
  const [items, setItems] = useState([{
    id: Date.now(),
    name: '',
    category: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    status: 'lost',
    image: null,
    isAnonymous: false
  }]);
  
  const [duplicateWarnings, setDuplicateWarnings] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = [
    'Electronics', 'Clothing', 'Books', 'Bags', 'Keys', 
    'Jewelry', 'Sports Equipment', 'Documents', 'Other'
  ];

  const locations = [
    'Library', 'Cafeteria', 'Gymnasium', 'Computer Lab', 
    'Lecture Hall', 'Parking Lot', 'Student Center', 'Dormitory'
  ];

  const handleAddItem = () => {
    setItems([...items, {
      id: Date.now(),
      name: '',
      category: '',
      description: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      status: 'lost',
      image: null,
      isAnonymous: false
    }]);
  };

  const handleRemoveItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
      const newWarnings = { ...duplicateWarnings };
      delete newWarnings[id];
      setDuplicateWarnings(newWarnings);
    }
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleImageUpload = (id, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleItemChange(id, 'image', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const checkForDuplicates = async () => {
    setIsChecking(true);
    const warnings = {};
    
    for (const item of items) {
      if (item.name && item.description) {
        const result = await DuplicateDetectionService.checkForDuplicate(item);
        if (result.hasDuplicates) {
          warnings[item.id] = result.topMatch;
        }
      }
    }
    
    setDuplicateWarnings(warnings);
    setIsChecking(false);
  };

  const handleSubmitBatch = async () => {
    // Validate all items
    const validItems = items.filter(item => 
      item.name && item.category && item.location
    );

    if (validItems.length === 0) {
      alert('Please fill in at least one complete item');
      return;
    }

    // Simulate upload progress
    setUploadProgress(0);
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 20;
      });
    }, 200);

    setTimeout(() => {
      // Save items to localStorage
      const existingItems = JSON.parse(localStorage.getItem('lostAndFoundItems') || '[]');
      const newItems = validItems.map(item => ({
        ...item,
        id: `batch-${Date.now()}-${Math.random()}`,
        reportedBy: item.isAnonymous ? 'Anonymous' : 'Current User',
        createdAt: new Date().toISOString()
      }));
      
      localStorage.setItem('lostAndFoundItems', JSON.stringify([...existingItems, ...newItems]));
      
      if (onSubmit) {
        onSubmit(newItems);
      }
      
      alert(`Successfully posted ${validItems.length} items!`);
      onClose();
    }, 1200);
  };

  const handleUseTemplate = (template) => {
    let templateItems = [];
    
    switch(template) {
      case 'classroom':
        templateItems = [
          { name: 'Student Notebook', category: 'Books', location: 'Lecture Hall A' },
          { name: 'Calculator', category: 'Electronics', location: 'Lecture Hall A' },
          { name: 'Water Bottle', category: 'Other', location: 'Lecture Hall A' }
        ];
        break;
      case 'gym':
        templateItems = [
          { name: 'Gym Bag', category: 'Bags', location: 'Gymnasium' },
          { name: 'Towel', category: 'Clothing', location: 'Gymnasium' },
          { name: 'Sports Shoes', category: 'Sports Equipment', location: 'Gymnasium' }
        ];
        break;
      case 'library':
        templateItems = [
          { name: 'Textbook', category: 'Books', location: 'Library' },
          { name: 'Laptop Charger', category: 'Electronics', location: 'Library' },
          { name: 'Reading Glasses', category: 'Other', location: 'Library' }
        ];
        break;
      default:
        break;
    }

    const newItems = templateItems.map((template, index) => ({
      id: Date.now() + index,
      ...template,
      description: `Found ${template.name} in ${template.location}`,
      date: new Date().toISOString().split('T')[0],
      status: 'found',
      image: null,
      isAnonymous: false
    }));

    setItems(newItems);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Batch Posting</h2>
                <p className="text-sm opacity-90 mt-1">Upload multiple items at once</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <button
                onClick={() => handleUseTemplate('classroom')}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                📚 Classroom Template
              </button>
              <button
                onClick={() => handleUseTemplate('gym')}
                className="px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
              >
                🏃 Gym Template
              </button>
              <button
                onClick={() => handleUseTemplate('library')}
                className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
              >
                📖 Library Template
              </button>
            </div>
            <button
              onClick={checkForDuplicates}
              disabled={isChecking}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium disabled:opacity-50"
            >
              {isChecking ? 'Checking...' : 'Check for Duplicates'}
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[50vh] p-6">
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-400 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Item #{index + 1}</h3>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    disabled={items.length === 1}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {duplicateWarnings[item.id] && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-yellow-800">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Potential duplicate found ({duplicateWarnings[item.id].score}% match)
                      </span>
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
                      value={item.name}
                      onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Blue Backpack"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={item.category}
                      onChange={(e) => handleItemChange(item.id, 'category', e.target.value)}
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
                      value={item.location}
                      onChange={(e) => handleItemChange(item.id, 'location', e.target.value)}
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
                      value={item.date}
                      onChange={(e) => handleItemChange(item.id, 'date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="2"
                      placeholder="Add details about the item..."
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <input
                          type="file"
                          id={`image-${item.id}`}
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(item.id, e.target.files[0])}
                        />
                        <label
                          htmlFor={`image-${item.id}`}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
                        >
                          <Camera className="w-4 h-4" />
                          <span className="text-sm">
                            {item.image ? 'Change Photo' : 'Add Photo'}
                          </span>
                        </label>
                      </div>

                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`status-${item.id}`}
                          value="lost"
                          checked={item.status === 'lost'}
                          onChange={() => handleItemChange(item.id, 'status', 'lost')}
                          className="text-blue-600"
                        />
                        <span className="text-sm">Lost</span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`status-${item.id}`}
                          value="found"
                          checked={item.status === 'found'}
                          onChange={() => handleItemChange(item.id, 'status', 'found')}
                          className="text-blue-600"
                        />
                        <span className="text-sm">Found</span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={item.isAnonymous}
                          onChange={(e) => handleItemChange(item.id, 'isAnonymous', e.target.checked)}
                          className="text-blue-600"
                        />
                        <span className="text-sm">Post Anonymously</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddItem}
            className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 text-gray-600"
          >
            <Plus className="w-5 h-5" />
            <span>Add Another Item</span>
          </button>
        </div>

        <div className="p-6 bg-gray-50 border-t">
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">Uploading... {uploadProgress}%</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{items.length}</span> items to post
              {Object.keys(duplicateWarnings).length > 0 && (
                <span className="ml-2 text-yellow-600">
                  • {Object.keys(duplicateWarnings).length} potential duplicates
                </span>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitBatch}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Post All Items</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchPosting;
