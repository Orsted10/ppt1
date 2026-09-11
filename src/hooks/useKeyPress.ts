import { useEffect } from 'react';

export const useKeyPress = (targetKey: string, callback: () => void) => {
  useEffect(() => {
    const downHandler = (({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        callback();
      }
    }) as EventListener;

    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [targetKey, callback]);
};
