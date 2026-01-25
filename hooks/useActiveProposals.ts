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
        // Use our Next.js API route to avoid CORS issues
        const response = await fetch('/api/proposals');

        if (!response.ok) {
          throw new Error('Failed to fetch proposals');
        }

        const data = await response.json();
        setCount(data?.count || 0);
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
