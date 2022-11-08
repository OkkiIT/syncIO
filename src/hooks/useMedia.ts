import { useState, useEffect } from "react";

export enum SCREEN_TYPES {
  XS = "xs",
  M = "m",
  LG = "lg",
}

const MOBILE_SIZES = {
  MIN: 320,
  MAX: 767,
};

const TABLE_SIZES = {
  MIN: 768,
  MAX: 1200,
};

export function useMedia() {
  const [windowDimensions, setWindowDimensions] = useState<SCREEN_TYPES | null>(
    getDeviceTypeBySize
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getDeviceTypeBySize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const getDeviceTypeBySize = (): SCREEN_TYPES => {
  console.log("hi");
  const { innerWidth } = window;
  if (innerWidth <= MOBILE_SIZES.MAX) {
    return SCREEN_TYPES.XS;
  }
  if (TABLE_SIZES.MIN <= innerWidth && innerWidth <= TABLE_SIZES.MAX) {
    return SCREEN_TYPES.M;
  }
  return SCREEN_TYPES.LG;
};
