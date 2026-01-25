'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <div key={step} className="flex items-center gap-4">
            <motion.div
              className={`
                relative w-12 h-12 rounded-full flex items-center justify-center
                transition-all duration-300
                ${isCompleted ? 'bg-ens-blue' : isCurrent ? 'bg-ens-blue/20 border-2 border-ens-blue' : 'bg-gray-800 border-2 border-gray-700'}
              `}
              animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                >
                  <Check className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <span className="text-lg font-semibold">{step}</span>
              )}

              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-ens-blue"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>

            {step < totalSteps && (
              <div className={`w-16 h-0.5 ${isCompleted ? 'bg-ens-blue' : 'bg-gray-700'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
