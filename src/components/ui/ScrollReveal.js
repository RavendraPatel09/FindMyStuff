import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollReveal = ({ children, animation = 'fade', delay = 0, className = '' }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const animations = {
    fade: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    },
    discover: {
      hidden: { 
        opacity: 0,
        scale: 0.9,
        filter: 'blur(10px)'
      },
      visible: { 
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    },
    slide: {
      hidden: { 
        opacity: 0,
        x: -40,
        filter: 'blur(5px)'
      },
      visible: { 
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 0.5,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    },
    spotlight: {
      hidden: { 
        opacity: 0,
        scale: 0.8,
        boxShadow: '0 0 0 rgba(66, 153, 225, 0)'
      },
      visible: { 
        opacity: 1,
        scale: 1,
        boxShadow: '0 0 30px rgba(66, 153, 225, 0.2)',
        transition: {
          duration: 0.6,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={animations[animation]}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;