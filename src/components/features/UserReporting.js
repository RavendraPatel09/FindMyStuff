import React, { useState } from 'react';
import { Flag, Shield, AlertTriangle, Ban, CheckCircle, X, User, FileText } from 'lucide-react';

const UserReporting = ({ isOpen, onClose, targetUser, targetItem }) => {
  const [reportType, setReportType] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [description, setDescription] = useState('');
  const [blockUser, setBlockUser] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const reportTypes = [
    { value: 'spam', label: 'Spam or Misleading', icon: <AlertTriangle className="w-4 h-4" /> },
    { value: 'inappropriate', label: 'Inappropriate Content', icon: <Ban className="w-4 h-4" /> },
    { value: 'harassment', label: 'Harassment or Abuse', icon: <Shield className="w-4 h-4" /> },
    { value: 'duplicate', label: 'Duplicate Posting', icon: <FileText className="w-4 h-4" /> },
    { value: 'fraud', label: 'Suspected Fraud', icon: <Flag className="w-4 h-4" /> },
    { value: 'other', label: 'Other Issue', icon: <AlertTriangle className="w-4 h-4" /> }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save report to localStorage
    const reports = JSON.parse(localStorage.getItem('userReports') || '[]');
    const newReport = {
      id: Date.now(),
      type: reportType,
      reason: reportReason,
      description,
      targetUser,
      targetItem,
      reportedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    reports.push(newReport);
    localStorage.setItem('userReports', JSON.stringify(reports));
    
    // Handle user blocking
    if (blockUser && targetUser) {
      const blockedUsers = JSON.parse(localStorage.getItem('blockedUsers') || '[]');
      if (!blockedUsers.includes(targetUser)) {
        blockedUsers.push(targetUser);
        localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
      }
    }
    
    setSubmitted(true);
    
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const getBlockedUsers = () => {
    return JSON.parse(localStorage.getItem('blockedUsers') || '[]');
  };

  const unblockUser = (username) => {
    const blockedUsers = JSON.parse(localStorage.getItem('blockedUsers') || '[]');
    const updated = blockedUsers.filter(user => user !== username);
    localStorage.setItem('blockedUsers', JSON.stringify(updated));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full">
        <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Flag className="w-6 h-6" />
              <h2 className="text-xl font-bold">Report & Block</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6">
            {targetUser && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>Reporting user: <strong>{targetUser}</strong></span>
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {reportTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setReportType(type.value)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      reportType === type.value
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {type.icon}
                      <span className="text-sm font-medium">{type.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason *
              </label>
              <input
                type="text"
                required
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Brief reason for reporting..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Details
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="3"
                placeholder="Provide more context (optional)..."
              />
            </div>

            {targetUser && (
              <div className="mb-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={blockUser}
                    onChange={(e) => setBlockUser(e.target.checked)}
                    className="text-red-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Block this user (prevent them from contacting you)
                  </span>
                </label>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Important</p>
                  <ul className="space-y-1 text-xs">
                    <li>• False reports may result in account suspension</li>
                    <li>• All reports are reviewed by moderators</li>
                    <li>• You may be contacted for additional information</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!reportType || !reportReason}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Report
              </button>
            </div>
          </form>
        ) : (
          <div className="p-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Report Submitted</h3>
            <p className="text-sm text-gray-600">
              Thank you for helping keep our community safe.
              {blockUser && ' The user has been blocked.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Blocked Users Management Component
export const BlockedUsersManager = ({ isOpen, onClose }) => {
  const [blockedUsers, setBlockedUsers] = useState([]);

  React.useEffect(() => {
    if (isOpen) {
      setBlockedUsers(JSON.parse(localStorage.getItem('blockedUsers') || '[]'));
    }
  }, [isOpen]);

  const handleUnblock = (username) => {
    const updated = blockedUsers.filter(user => user !== username);
    setBlockedUsers(updated);
    localStorage.setItem('blockedUsers', JSON.stringify(updated));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full">
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Ban className="w-6 h-6" />
              <h2 className="text-xl font-bold">Blocked Users</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {blockedUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Ban className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No blocked users</p>
            </div>
          ) : (
            <div className="space-y-2">
              {blockedUsers.map((username) => (
                <div key={username} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{username}</span>
                  </div>
                  <button
                    onClick={() => handleUnblock(username)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Unblock
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserReporting;
