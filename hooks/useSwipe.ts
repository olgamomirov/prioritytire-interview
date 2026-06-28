import React, { useRef } from "react";

type SwipeActions = {
  next: () => void;
  prev: () => void;
  minDistance?: number;
};

export function useSwipe({ next, prev, minDistance = 50 }: SwipeActions) {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
    touchEndX.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const delta = touchStartX.current - touchEndX.current;

    if (Math.abs(delta) > minDistance) {
      if (delta > 0) {
        next();
      } else {
        prev();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
