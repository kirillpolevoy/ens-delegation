'use client';

import { useState, useEffect } from 'react';

export function useActiveProposals() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProposals() {
      try {
        setIsLoading(true);
        // Agora API endpoint for ENS governance
        const response = await fetch('https://vote.ensdao.org/api/v1/proposals?filter=active');

        if (!response.ok) {
          throw new Error('Failed to fetch proposals');
        }

        const data = await response.json();
        setCount(data?.proposals?.length || 0);
        setError(null);
      } catch (err) {
        console.error('Error fetching proposals:', err);
        setError('Unable to fetch proposals');
        setCount(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProposals();
  }, []);

  return { count, isLoading, error };
}
