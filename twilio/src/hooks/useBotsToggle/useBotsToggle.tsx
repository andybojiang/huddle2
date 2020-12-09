import { useState } from 'react';

export default function useBotsToggle() {
  const [botsOpen, setBotsOpen] = useState(false);

  return [botsOpen, setBotsOpen] as const;
}
