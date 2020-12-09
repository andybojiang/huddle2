import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import EndCallButton from './EndCallButton/EndCallButton';
import ToggleAudioButton from './ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from './ToggleVideoButton/ToggleVideoButton';
import ToggleScreenShareButton from './ToogleScreenShareButton/ToggleScreenShareButton';
import InviteLinkButton from './InviteLinkButton/InviteLinkButton';

import useIsUserActive from '../../hooks/useIsUserActive/useIsUserActive';
import useRoomState from '../../hooks/useRoomState/useRoomState';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      position: 'absolute',
      right: '50%',
      // transform: 'translate(50%, 30px)',
      bottom: '1vh',
      zIndex: 3,
      transition: 'opacity 1.2s, transform 1.2s, visibility 0s 1.2s',
      opacity: 0,
      visibility: 'hidden',
      maxWidth: 'min-content',
      '&.showControls, &:hover': {
        transition: 'opacity 0.6s, transform 0.6s, visibility 0s',
        opacity: 1,
        visibility: 'visible',
        transform: 'translate(50%, 0px)',
      },
      [theme.breakpoints.down('xs')]: {
        bottom: `${theme.sidebarMobileHeight + 3}px`,
      },
      background: 'linear-gradient(90deg, #B4B0E4 0%, #D4AEC5 98.94%);',
      borderRadius: '50px',
      color: 'green',
      paddingLeft: '1%',
      paddingRight: '1%',
      boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.07)',
      padding: '0.3vw',
    },
  })
);

export default function Controls() {
  const classes = useStyles();
  const roomState = useRoomState();
  const isReconnecting = roomState === 'reconnecting';
  const isUserActive = useIsUserActive();
  const showControls = isUserActive || roomState === 'disconnected';

  return (
    <div className={clsx(classes.container, { showControls })}>
      {roomState !== 'disconnected' && (
        <>
          <InviteLinkButton />
        </>
      )}
      <ToggleAudioButton disabled={isReconnecting} />
      <ToggleVideoButton disabled={isReconnecting} />
      {roomState !== 'disconnected' && (
        <>
          <ToggleScreenShareButton disabled={isReconnecting} />
          <EndCallButton />
        </>
      )}
    </div>
  );
}
