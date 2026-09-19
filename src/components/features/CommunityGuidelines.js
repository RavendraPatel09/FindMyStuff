import React, { useState } from 'react';
import { BookOpen, Camera, Edit3, MapPin, Shield, Users, CheckCircle, XCircle, AlertCircle, HelpCircle, X } from 'lucide-react';

const CommunityGuidelines = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('guidelines');

  const guidelines = [
    {
      icon: <Edit3 className="w-5 h-5" />,
      title: 'Write Clear Descriptions',
      description: 'Include color, brand, size, and unique features. Be specific about distinguishing marks or damage.',
      dos: ['Mention brand names', 'Include colors and patterns', 'Note any damage or wear'],
      donts: ['Use vague terms like "stuff" or "things"', 'Skip important details', 'Write in all caps']
    },
    {
      icon: <Camera className="w-5 h-5" />,
      title: 'Take Quality Photos',
      description: 'Good photos help items get recognized faster. Use natural light when possible.',
      dos: ['Take clear, well-lit photos', 'Show multiple angles', 'Include close-ups of unique features'],
      donts: ['Use blurry or dark photos', 'Include personal information in photos', 'Use stock images']
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Provide Accurate Location',
      description: 'Be specific about where the item was found or lost. Include building names and room numbers.',
      dos: ['Name specific buildings', 'Include floor/room numbers', 'Mention nearby landmarks'],
      donts: ['Give vague locations', 'Share personal addresses', 'Guess if unsure']
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Protect Privacy',
      description: 'Never share sensitive personal information. Use the anonymous posting option when needed.',
      dos: ['Use anonymous posting for sensitive items', 'Verify ownership before sharing', 'Report suspicious behavior'],
      donts: ['Share phone numbers publicly', 'Post credit card details', 'Include passwords or PINs']
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Be Respectful',
      description: 'Treat all community members with respect. Report inappropriate content.',
      dos: ['Be patient and helpful', 'Thank finders', 'Follow up promptly'],
      donts: ['Use offensive language', 'Make false claims', 'Spam multiple posts']
    }
  ];

  const tips = {
    reporting: [
      'Report within 24 hours for best results',
      'Check similar items before posting',
      'Update status when item is found',
      'Delete posts after recovery'
    ],
    searching: [
      'Use specific keywords',
      'Check daily for new items',
      'Set up alerts for your items',
      'Browse by category and location'
    ],
    safety: [
      'Meet in public places',
      'Bring a friend if possible',
      'Verify item ownership',
      'Trust your instincts'
    ]
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Community Guidelines & Tips</h2>
                <p className="text-sm opacity-90 mt-1">Help make FindMyStuff better for everyone</p>
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

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('guidelines')}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              activeTab === 'guidelines'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Guidelines
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              activeTab === 'tips'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Pro Tips
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              activeTab === 'faq'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            FAQ
          </button>
        </div>

        <div className="overflow-y-auto max-h-[60vh] p-6">
          {activeTab === 'guidelines' && (
            <div className="space-y-6">
              {guidelines.map((guideline, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-3 rounded-lg">
                      {guideline.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {guideline.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{guideline.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-800">Do's</span>
                          </div>
                          <ul className="space-y-1">
                            {guideline.dos.map((item, i) => (
                              <li key={i} className="text-sm text-green-700 flex items-start">
                                <span className="mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-red-50 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <XCircle className="w-5 h-5 text-red-600" />
                            <span className="font-medium text-red-800">Don'ts</span>
                          </div>
                          <ul className="space-y-1">
                            {guideline.donts.map((item, i) => (
                              <li key={i} className="text-sm text-red-700 flex items-start">
                                <span className="mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Reporting Tips
                </h3>
                <ul className="space-y-2">
                  {tips.reporting.map((tip, index) => (
                    <li key={index} className="flex items-start text-blue-800">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Searching Tips
                </h3>
                <ul className="space-y-2">
                  {tips.searching.map((tip, index) => (
                    <li key={index} className="flex items-start text-green-800">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Safety Tips
                </h3>
                <ul className="space-y-2">
                  {tips.safety.map((tip, index) => (
                    <li key={index} className="flex items-start text-purple-800">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                  How long should I wait before reporting an item as lost?
                </h3>
                <p className="text-gray-600">
                  Report immediately! The sooner you post, the higher the chances of recovery. Most items are found within the first 48 hours.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                  What if I find a duplicate post of my item?
                </h3>
                <p className="text-gray-600">
                  Our system automatically detects potential duplicates. If you see one, use the report feature to flag it, and we'll merge the posts.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                  Can I post anonymously?
                </h3>
                <p className="text-gray-600">
                  Yes! Use the anonymous posting option when creating your post. Your identity will be hidden, but you can still communicate through our secure messaging system.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                  How do I verify someone owns the item they're claiming?
                </h3>
                <p className="text-gray-600">
                  Ask for specific details not shown in the post, like hidden marks, contents, or purchase information. Meet in a safe, public location for the exchange.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t">
          <p className="text-center text-sm text-gray-600">
            By using FindMyStuff, you agree to follow these community guidelines. 
            <button className="text-blue-600 hover:underline ml-1">
              Learn more
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityGuidelines;
