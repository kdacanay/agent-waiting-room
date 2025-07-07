// src/components/PageTransition.js
import { motion } from 'framer-motion';
import React from 'react';

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  );
}
