import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Apps from '@material-ui/icons/Apps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      color: 'white',
      backgroundColor: '#A3B0F6 !important',
      height: '55px',
      width: '55px',
      top: '15px',
      left: '15px',
      boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.14) !important',
    },
    container: {
      display: 'flex',
      position: 'absolute',
      transform: 'translate(0%, 30px)',
      top: '3%',
      zIndex: 3,
    },
    maxWidth: {
      maxWidth: 'none',
    },
  })
);

interface ToggleBotsButtonProps {
  openBots: () => void;
}

export default function ToggleBotsButton({ openBots }: ToggleBotsButtonProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Tooltip title="Open Bots" placement="bottom" PopperProps={{ disablePortal: true }} onClick={openBots}>
        <Fab className={classes.fab} onClick={openBots}>
          <Apps />
        </Fab>
      </Tooltip>
    </div>
  );
}
