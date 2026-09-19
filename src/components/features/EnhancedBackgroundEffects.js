import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const EnhancedBackgroundEffects = ({ className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  // Generate floating geometric shapes
  const shapes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)],
    size: Math.random() * 60 + 20,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 30 + 15,
    delay: Math.random() * 3,
  }));

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Mouse Follower Effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-60"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating Geometric Shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute opacity-20 ${
            shape.type === 'circle' 
              ? 'rounded-full bg-gradient-to-br from-cyan-400 to-blue-500' 
              : shape.type === 'square'
              ? 'bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg'
              : 'bg-gradient-to-br from-green-400 to-emerald-500'
          }`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.initialX}%`,
            top: `${shape.initialY}%`,
            clipPath: shape.type === 'triangle' 
              ? 'polygon(50% 0%, 0% 100%, 100% 100%)' 
              : 'none',
          }}
          animate={{
            rotate: [0, 360],
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'linear',
          }}
        />
      ))}

      {/* Pulsing Rings */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-blue-400/30 rounded-full"
            style={{
              width: 200 + i * 100,
              height: 200 + i * 100,
              left: '50%',
              top: '50%',
              marginLeft: -(100 + i * 50),
              marginTop: -(100 + i * 50),
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'][i]
              } 0%, transparent 70%)`,
              left: `${20 + i * 15}%`,
              top: `${30 + Math.sin(i) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Animated Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default EnhancedBackgroundEffects;
