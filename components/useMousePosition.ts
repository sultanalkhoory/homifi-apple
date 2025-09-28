'use client';

import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition {
  // Initialize with center position to avoid jarring initial animations
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  });

  useEffect(() => {
    // Skip if not in browser environment
    if (typeof window === 'undefined') return;
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Add event listener for mouse movement
    window.addEventListener('mousemove', updateMousePosition);
    
    // Clean up on component unmount
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  return mousePosition;
}
