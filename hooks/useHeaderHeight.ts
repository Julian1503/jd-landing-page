"use client";

import { useEffect, useState } from "react";

type UseHeaderHeightOptions = {
  fallback?: number;
  selector?: string;
};

type UseHeaderHeightReturn = number;

export const useHeaderHeight = (
  options: UseHeaderHeightOptions = {}
): UseHeaderHeightReturn => {
  const { fallback = 65, selector = "header" } = options;
  const [headerHeight, setHeaderHeight] = useState<number>(fallback);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>(selector);
    if (!header) return;

    let rafId: number;
    const updateHeight = (): void => {
      rafId = requestAnimationFrame(() => {
        setHeaderHeight(header.getBoundingClientRect().height);
      });
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    
    resizeObserver.observe(header);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [selector]);

  return headerHeight;
};