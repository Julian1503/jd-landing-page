"use client";
import { useEffect } from "react";

export const useScrollLock = (): void => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
};
