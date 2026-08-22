'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true when viewport < breakpoint (default 768px).
 * Starts false so SSR and first client render match (no hydration mismatch),
 * then syncs from a real media query — fires correctly on rotate/resize.
 */
export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    onChange(mq); // sync immediately on mount
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [breakpoint]);

  return isMobile;
}
