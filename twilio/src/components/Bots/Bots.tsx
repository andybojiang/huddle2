import React from 'react';

import ToggleBotsButton from './ToggleBotsButton/ToggleBotsButton';
import BotBox from './BotBox/BotBox';
import useBotsToggle from '../../hooks/useBotsToggle/useBotsToggle';

export default function Bots() {
  const [botsOpen, setBotsOpen] = useBotsToggle();

  function openBots() {
    setBotsOpen(true);
  }

  function closeBots() {
    setBotsOpen(false);
  }

  return <>{botsOpen ? <BotBox closeBots={closeBots} /> : <ToggleBotsButton openBots={openBots} />}</>;
}
