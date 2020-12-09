import React, { useState } from 'react';

export default function useZoomToggle() {
  const [zoomed, setZoomed] = useState(false);
  const toggleZoomed = () => {
    setZoomed(!zoomed);
  };
  return [zoomed, toggleZoomed] as const;
}
