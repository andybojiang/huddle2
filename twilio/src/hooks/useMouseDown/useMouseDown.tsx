import { useState, useEffect } from 'react';

const useMouseDown = () => {
  const [mouseDown, setMouseDown] = useState(false);

  const updateMouseDown = (ev: any) => {
    setMouseDown(true);
  };

  const updateMouseUp = (ev: any) => {
    setMouseDown(false);
  };

  useEffect(() => {
    window.addEventListener('mousedown', updateMouseDown);
    window.addEventListener('mouseup', updateMouseUp);
    return () => {
      window.removeEventListener('mousedown', updateMouseDown);
      window.removeEventListener('mouseup', updateMouseUp);
    };
  }, []);

  return mouseDown;
};

export default useMouseDown;
