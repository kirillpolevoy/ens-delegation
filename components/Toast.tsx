'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!mounted) return null;

  const toastContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[99999] px-5 py-3 rounded-xl bg-emerald-500/95 backdrop-blur-xl border border-emerald-400/30 shadow-2xl flex items-center gap-3 max-w-md"
          style={{ pointerEvents: 'auto' }}
        >
          <CheckCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
          <span className="text-white font-medium text-sm">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            type="button"
            style={{ pointerEvents: 'auto' }}
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(toastContent, document.body);
}
