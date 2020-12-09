import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import Tooltip from '@material-ui/core/Tooltip';

import useScreenShareParticipant from '../../../hooks/useScreenShareParticipant/useScreenShareParticipant';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import useAPIContext from '../../../hooks/useAPIContext/useAPIContext';

export const SCREEN_SHARE_TEXT = 'Share Screen';
export const STOP_SCREEN_SHARE_TEXT = 'Stop Sharing Screen';
export const SHARE_IN_PROGRESS_TEXT = 'Cannot share screen when another user is sharing';
export const SHARE_NOT_SUPPORTED_TEXT = 'Screen sharing is not supported with this browser';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      color: '#A3B0F7',
      height: '55px',
      width: '55px',
      backgroundColor: 'white !important',
      boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.14) !important',
    },
  })
);

export default function ToggleScreenShareButton(props: { disabled?: boolean }) {
  const classes = useStyles();
  const screenShareParticipant = useScreenShareParticipant();
  const { state, isSharing, toggleScreenShare, zoomed, toggleZoomed } = useAPIContext();
  const { room } = useVideoContext();
  const disableScreenShareButton = screenShareParticipant && screenShareParticipant !== room.localParticipant;
  const isScreenShareSupported = navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
  const isDisabled = props.disabled || disableScreenShareButton || !isScreenShareSupported || state.bot_url !== null;

  let tooltipMessage = SCREEN_SHARE_TEXT;

  if (isSharing) {
    tooltipMessage = STOP_SCREEN_SHARE_TEXT;
  }

  if (disableScreenShareButton) {
    tooltipMessage = SHARE_IN_PROGRESS_TEXT;
  }

  if (!isScreenShareSupported) {
    tooltipMessage = SHARE_NOT_SUPPORTED_TEXT;
  }

  function onClick() {
    toggleScreenShare();
    if (!zoomed) {
      toggleZoomed();
    }
  }

  return (
    <Tooltip
      title={tooltipMessage}
      placement="top"
      PopperProps={{ disablePortal: true }}
      style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
    >
      <div>
        {/* The div element is needed because a disabled button will not emit hover events and we want to display
          a tooltip when screen sharing is disabled */}
        <Fab className={classes.fab} onClick={onClick} disabled={isDisabled}>
          {isSharing ? <StopScreenShare /> : <ScreenShare />}
        </Fab>
      </div>
    </Tooltip>
  );
}
