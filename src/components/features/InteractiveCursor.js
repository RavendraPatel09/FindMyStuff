import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      
      // Add to trail
      setTrail(prev => {
        const newTrail = [...prev, { ...newPosition, id: Date.now() }];
        return newTrail.slice(-8); // Keep only last 8 positions
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target.matches('button, a, [role="button"], input, textarea, select')) {
        setIsHovering(true);
        setCursorVariant('button');
      } else if (target.matches('h1, h2, h3, h4, h5, h6')) {
        setIsHovering(true);
        setCursorVariant('text');
      } else if (target.matches('img, video')) {
        setIsHovering(true);
        setCursorVariant('media');
      } else {
        setIsHovering(false);
        setCursorVariant('default');
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorVariant('default');
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Add hover detection for interactive elements
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      mixBlendMode: 'difference',
    },
    button: {
      scale: 1.5,
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
      mixBlendMode: 'difference',
    },
    text: {
      scale: 0.8,
      backgroundColor: 'rgba(168, 85, 247, 0.8)',
      mixBlendMode: 'difference',
    },
    media: {
      scale: 2,
      backgroundColor: 'rgba(249, 115, 22, 0.8)',
      mixBlendMode: 'difference',
    },
  };

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Trail Effect */}
      {trail.map((position, index) => (
        <motion.div
          key={position.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: position.x - 2,
            top: position.y - 2,
            width: 4,
            height: 4,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ 
            opacity: 0,
            scale: 0.5,
          }}
          transition={{ 
            duration: 0.6,
            ease: 'easeOut',
          }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: `rgba(59, 130, 246, ${0.6 - (index * 0.1)})`,
              filter: 'blur(0.5px)',
            }}
          />
        </motion.div>
      ))}

      {/* Main Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          width: 20,
          height: 20,
        }}
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      >
        {/* Inner dot */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white"
          animate={{
            scale: isClicking ? 0.8 : 1,
            rotate: isHovering ? 180 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        />

        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/50"
          animate={{
            scale: isClicking ? 1.5 : isHovering ? 1.2 : 1,
            opacity: isClicking ? 0.5 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        />

        {/* Click ripple effect */}
        {isClicking && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        )}

        {/* Hover particles */}
        {isHovering && (
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${50 + Math.cos((i * 60) * Math.PI / 180) * 15}%`,
                  top: `${50 + Math.sin((i * 60) * Math.PI / 180) * 15}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Cursor glow effect */}
      <motion.div
        className="fixed pointer-events-none z-[9997] rounded-full"
        style={{
          left: mousePosition.x - 25,
          top: mousePosition.y - 25,
          width: 50,
          height: 50,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 25,
        }}
      />
    </>
  );
};

export default InteractiveCursor;
