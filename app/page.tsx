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

  const handleStep2Success = (hash: string) => {
    setTxHash(hash);
    setCurrentStep(3);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 magic-gradient" />
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-ens-blue/20 rounded-full blur-3xl"
          animate={{
            y: [0, 100, 0],
            x: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, -100, 0],
            x: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <StepIndicator currentStep={currentStep} totalSteps={3} />

        <div className="glass-card p-8 md:p-12 min-h-[600px]">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <Step1Connect key="step1" onContinue={handleStep1Continue} />
            )}
            {currentStep === 2 && (
              <Step2Understand key="step2" onSuccess={handleStep2Success} />
            )}
            {currentStep === 3 && (
              <Step3Done key="step3" txHash={txHash} />
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.footer
          className="text-center mt-8 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Built with ♥ for ENS governance
        </motion.footer>
      </div>
    </main>
  );
}
