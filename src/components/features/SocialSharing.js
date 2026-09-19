import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Link2, Check, MessageCircle, Linkedin, Instagram } from 'lucide-react';

const SocialSharing = ({ item, className = '', buttonClassName = '' }) => {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const shareData = {
    title: `${item?.status === 'lost' ? 'Lost' : 'Found'}: ${item?.name || 'Item'}`,
    text: `${item?.status === 'lost' ? 'Lost' : 'Found'} ${item?.name || 'item'} at ${item?.location || 'campus'}. ${item?.description?.slice(0, 100) || ''}...`,
    url: window.location.href
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareData.text} ${shareData.url}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
    instagram: `https://www.instagram.com/`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      setShowShareMenu(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleNativeShare}
        className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl ${buttonClassName}`}
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>

      {showShareMenu && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-100 p-2 z-50 min-w-[200px]">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => window.open(shareLinks.twitter, '_blank')}
              className="flex items-center space-x-2 p-3 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Twitter className="w-5 h-5 text-blue-400" />
              <span className="text-sm">Twitter</span>
            </button>
            <button
              onClick={() => window.open(shareLinks.facebook, '_blank')}
              className="flex items-center space-x-2 p-3 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              <span className="text-sm">Facebook</span>
            </button>
            <button
              onClick={() => window.open(shareLinks.whatsapp, '_blank')}
              className="flex items-center space-x-2 p-3 hover:bg-green-50 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">WhatsApp</span>
            </button>
            <button
              onClick={() => window.open(shareLinks.linkedin, '_blank')}
              className="flex items-center space-x-2 p-3 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Linkedin className="w-5 h-5 text-blue-700" />
              <span className="text-sm">LinkedIn</span>
            </button>
          </div>
          <div className="mt-2 pt-2 border-t">
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center justify-center space-x-2 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-5 h-5 text-gray-600" />
                  <span className="text-sm">Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
      
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default SocialSharing;
