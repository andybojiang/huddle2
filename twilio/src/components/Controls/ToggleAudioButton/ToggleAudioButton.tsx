import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Tooltip from '@material-ui/core/Tooltip';

import useLocalAudioToggle from '../../../hooks/useLocalAudioToggle/useLocalAudioToggle';

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

export default function ToggleAudioButton(props: { disabled?: boolean }) {
  const classes = useStyles();
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();

  return (
    <Tooltip
      title={isAudioEnabled ? 'Mute Audio' : 'Unmute Audio'}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab className={classes.fab} onClick={toggleAudioEnabled} disabled={props.disabled} data-cy-audio-toggle>
        {isAudioEnabled ? <Mic /> : <MicOff />}
      </Fab>
    </Tooltip>
  );
}
