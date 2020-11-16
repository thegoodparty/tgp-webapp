import { useLayoutEffect, useState } from 'react';

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', () => {
      debounce(updateSize, 100);
    });
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  let timeoutId;
  const debounce = (callback, delay) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };

  return size;
}
