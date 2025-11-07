"use client";
import { useState, useCallback } from "react";
import { MobileNavigationItem, MobileNavigationState } from "@/components/ui/navbar/NavbarMobile";

export function useNavbarNavigation() {
  const [navigationState, setNavigationState] = useState<MobileNavigationState>({
    currentItem: null,
    history: [],
  });

  const navigateToSubmenu = useCallback((item: MobileNavigationItem) => {
    setNavigationState((prev) => ({
      currentItem: item,
      history: prev.currentItem ? [...prev.history, prev.currentItem] : [],
    }));
  }, []);

  const navigateBack = useCallback(() => {
    setNavigationState((prev) => {
      if (prev.history.length === 0) {
        return { currentItem: null, history: [] };
      }

      const newHistory = [...prev.history];
      const previousItem = newHistory.pop();

      return {
        currentItem: previousItem || null,
        history: newHistory,
      };
    });
  }, []);

  const resetNavigation = useCallback(() => {
    setNavigationState({ currentItem: null, history: [] });
  }, []);

  return {
    navigationState,
    navigateToSubmenu,
    navigateBack,
    resetNavigation,
  };
}