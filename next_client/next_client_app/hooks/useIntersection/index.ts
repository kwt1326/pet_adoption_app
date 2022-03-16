import React, { useState, useCallback, useEffect } from 'react';

export function useIntersection(
  onIntersect: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => Promise<void>
) {
  const [observerRef, setObserverRef] = useState<HTMLElement>();
  const checkIntersect = useCallback((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      onIntersect(entry, observer);
    }
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (observerRef) {
      observer = new IntersectionObserver(checkIntersect, { threshold: 0.1 });
      observer.observe(observerRef);
    }
    return () => observer && observer.disconnect();
  }, [checkIntersect, observerRef])

  return [observerRef, setObserverRef]
}
