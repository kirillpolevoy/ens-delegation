'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-3 md:gap-5 mb-4 md:mb-6">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => {
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <div key={step} className="flex items-center gap-3 md:gap-6">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className={`
                  relative w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center
                  transition-all duration-500
                  border-2
                  ${isCompleted
                    ? 'bg-gradient-to-br from-ens-blue to-ens-purple border-ens-blue shadow-lg shadow-ens-blue/50'
                    : isCurrent
                    ? 'bg-gradient-to-br from-ens-blue/20 to-ens-purple/10 border-ens-blue'
                    : 'bg-space-700/50 border-space-700'
                  }
                `}
                animate={isCurrent ? {
                  boxShadow: [
                    '0 0 20px rgba(82, 152, 255, 0.3)',
                    '0 0 40px rgba(82, 152, 255, 0.5)',
                    '0 0 20px rgba(82, 152, 255, 0.3)',
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                  >
                    <Check className="w-5 h-5 md:w-7 md:h-7 text-white" strokeWidth={3} />
                  </motion.div>
                ) : (
                  <span className={`text-base md:text-xl font-bold mono ${isCurrent ? 'text-ens-blue glow-text' : 'text-gray-400'}`}>
                    {step}
                  </span>
                )}

                {isCurrent && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-ens-blue"
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-ens-blue/20"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.3,
                      }}
                    />
                  </>
                )}
              </motion.div>

              {/* Floating particles around current step */}
              {isCurrent && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-ens-blue rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        x: [0, (Math.cos((i * 2 * Math.PI) / 3) * 40)],
                        y: [0, (Math.sin((i * 2 * Math.PI) / 3) * 40)],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>

            {step < totalSteps && (
              <motion.div
                className="relative h-[2px] md:h-[3px] w-12 md:w-24 overflow-hidden rounded-full bg-space-700/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              >
                {isCompleted && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-ens-blue to-ens-purple"
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
