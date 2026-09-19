import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const VoiceSearch = ({ onResult, onError, className = '' }) => {
  const { t, currentLanguage } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = getLanguageCode(currentLanguage);

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setConfidence(0);
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
            setConfidence(result[0].confidence);
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        const fullTranscript = finalTranscript || interimTranscript;
        setTranscript(fullTranscript);

        if (finalTranscript && onResult) {
          onResult(finalTranscript, result[0].confidence);
        }
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        if (onError) {
          onError(event.error);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [currentLanguage, onResult, onError]);

  const getLanguageCode = (lang) => {
    const languageMap = {
      'en': 'en-US',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'hi': 'hi-IN'
    };
    return languageMap[lang] || 'en-US';
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.lang = getLanguageCode(currentLanguage);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <div className={`flex items-center space-x-2 text-gray-500 dark:text-gray-400 ${className}`}>
        <MicOff className="w-5 h-5" />
        <span className="text-sm">{t('voiceNotSupported')}</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleListening}
        className={`relative p-3 rounded-full transition-all duration-300 shadow-lg ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/25'
            : 'bg-primary-500 hover:bg-primary-600 text-white shadow-primary-500/25'
        }`}
        disabled={!isSupported}
      >
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div
              key="listening"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <Loader2 className="w-5 h-5 animate-spin" />
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <Mic className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse animation when listening */}
        {isListening && (
          <motion.div
            className="absolute inset-0 rounded-full bg-red-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.button>

      {/* Voice feedback overlay */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4 min-w-64 z-50"
          >
            <div className="flex items-center space-x-2 mb-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-red-500 rounded-full"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {t('listening')}
              </span>
            </div>
            
            {transcript && (
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  "{transcript}"
                </div>
                {confidence > 0 && (
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                      <motion.div
                        className="bg-primary-500 h-1 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${confidence * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {Math.round(confidence * 100)}%
                    </span>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              {t('speakNow')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {t('voiceSearch')}
      </div>
    </div>
  );
};

export default VoiceSearch;
