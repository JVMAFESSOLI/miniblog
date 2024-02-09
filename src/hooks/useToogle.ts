import { useState } from "react";

type useToogleHook = {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
};

export const useToogle = (): useToogleHook => {
  const [isVisible, setIsVisible] = useState(false);

  const hide = () => setIsVisible(false);

  const show = () => setIsVisible(false);

  return {
    hide,
    show,
    isVisible,
  };
};
