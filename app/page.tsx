'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StepIndicator } from '@/components/StepIndicator';
import { Step1Connect } from '@/components/WizardSteps/Step1Connect';
import { Step2Understand } from '@/components/WizardSteps/Step2Understand';
import { Step3Done } from '@/components/WizardSteps/Step3Done';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [txHash, setTxHash] = useState<string>('');

  const handleStep1Continue = () => {
    setCurrentStep(2);
  };

  const handleAlreadyDelegated = () => {
    setCurrentStep(3);
  };

  const handleStep2Success = (hash: string) => {
    setTxHash(hash);
    setCurrentStep(3);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-space-900">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 magic-gradient" />

        {/* Cyber grid */}
        <div className="absolute inset-0 cyber-grid" />

        {/* Scan line effect */}
        <div className="scan-line" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(82, 152, 255, 0.4) 0%, transparent 70%)',
          }}
          animate={{
            y: [0, 100, 0],
            x: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)',
            x: '-50%',
            y: '-50%',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-4 md:py-6 max-w-3xl relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <StepIndicator currentStep={currentStep} totalSteps={3} />
        </motion.div>

        <motion.div
          className="holographic-card p-4 sm:p-5 md:p-6 relative mt-3 md:mt-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <Step1Connect
                key="step1"
                onContinue={handleStep1Continue}
                onAlreadyDelegated={handleAlreadyDelegated}
              />
            )}
            {currentStep === 2 && (
              <Step2Understand key="step2" onSuccess={handleStep2Success} />
            )}
            {currentStep === 3 && (
              <Step3Done key="step3" txHash={txHash} />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="text-center mt-4 md:mt-6 text-gray-500 text-sm relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2">
            <motion.span
              className="inline-block"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ♥
            </motion.span>
            <span className="mono font-medium">Built with care for ENS governance</span>
          </div>

          {/* Decorative line */}
          <motion.div
            className="w-24 h-[1px] bg-gradient-to-r from-transparent via-ens-blue/30 to-transparent mx-auto mt-2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          />
        </motion.footer>
      </div>
    </main>
  );
}
