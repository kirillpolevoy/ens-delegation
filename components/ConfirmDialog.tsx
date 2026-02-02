'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log('=== ConfirmDialog State ===');
    console.log('isOpen:', isOpen);
    console.log('mounted:', mounted);
    console.log('onConfirm type:', typeof onConfirm);
    console.log('onCancel type:', typeof onCancel);
  }, [isOpen, mounted, onConfirm, onCancel]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998]"
            onClick={(e) => {
              console.log('=== BACKDROP CLICKED ===');
              console.log('Target:', e.target);
              onCancel();
            }}
            style={{ pointerEvents: 'auto' }}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[99999] w-full max-w-md"
            onClick={(e) => {
              console.log('=== DIALOG CONTAINER CLICKED ===');
              console.log('Target:', e.target);
              e.stopPropagation();
            }}
            style={{ pointerEvents: 'auto' }}
          >
            <div
              className="holographic-card p-6 m-4"
              style={{ pointerEvents: 'auto' }}
              onClick={(e) => {
                console.log('=== HOLOGRAPHIC CARD CLICKED ===');
                console.log('Target:', e.target);
              }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-amber-400" strokeWidth={2.5} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white text-center mb-2">
                {title}
              </h3>

              {/* Message */}
              <p className="text-gray-300 text-center mb-6 leading-relaxed">
                {message}
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onMouseEnter={() => console.log('Cancel button HOVER')}
                  onMouseDown={() => console.log('Cancel button MOUSE DOWN')}
                  onClick={(e) => {
                    console.log('=== Cancel CLICKED ===');
                    console.log('Event:', e);
                    console.log('Target:', e.target);
                    console.log('CurrentTarget:', e.currentTarget);
                    e.stopPropagation();
                    console.log('Calling onCancel...');
                    onCancel();
                    console.log('onCancel called');
                  }}
                  className="flex-1 py-3 px-4 rounded-lg bg-space-700/50 hover:bg-space-700 text-gray-300 hover:text-white font-medium transition-all border border-space-600 cursor-pointer"
                  type="button"
                  style={{ pointerEvents: 'auto', zIndex: 100000 }}
                >
                  {cancelText}
                </button>
                <button
                  onMouseEnter={() => console.log('Confirm button HOVER')}
                  onMouseDown={() => console.log('Confirm button MOUSE DOWN')}
                  onClick={(e) => {
                    console.log('=== Confirm CLICKED ===');
                    console.log('Event:', e);
                    console.log('Target:', e.target);
                    console.log('CurrentTarget:', e.currentTarget);
                    e.stopPropagation();
                    console.log('Calling onConfirm...');
                    onConfirm();
                    console.log('onConfirm called');
                  }}
                  className="flex-1 py-3 px-4 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-semibold transition-all cursor-pointer"
                  type="button"
                  style={{ pointerEvents: 'auto', zIndex: 100000 }}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
