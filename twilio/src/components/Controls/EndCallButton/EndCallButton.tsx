import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import CallEnd from '@material-ui/icons/CallEnd';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import useAPIContext from '../../../hooks/useAPIContext/useAPIContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      color: 'red !important',
      height: '55px',
      width: '55px',
      backgroundColor: '#F2F2F2 !important',
      boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.14) !important',
    },
  })
);
export default function EndCallButton() {
  const classes = useStyles();
  const { room } = useVideoContext();
  const { deleteUser } = useAPIContext();

  function leaveRoom() {
    deleteUser();
    room.disconnect();
  }

  return (
    <Tooltip title={'End Call'} onClick={leaveRoom} placement="top" PopperProps={{ disablePortal: true }}>
      <Fab className={classes.fab} color="primary">
        <CallEnd />
      </Fab>
    </Tooltip>
  );
}
