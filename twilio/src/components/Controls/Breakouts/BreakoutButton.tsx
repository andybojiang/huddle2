import React, { useState, useRef, useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuContainer from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import BreakoutDialog from './BreakoutDialog';
import { useAppState } from '../../../state';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      color: 'white',
      backgroundColor: '#cdadd4 !important',
      height: '55px',
      width: '55px',
      top: '15px',
      boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.14) !important',
    },
    // container: {
    //   display: 'flex',
    //   position: 'absolute',
    //   top: '6%',
    // },
    noMaxWidth: {
      maxWidth: 'none',
    },
  })
);

export default function BreakoutButton() {
  const [breakoutOpen, setBreakoutOpen] = useState(false);
  const classes = useStyles();

  function openBreakout() {
    setBreakoutOpen(true);
  }

  function closeBreakout() {
    setBreakoutOpen(false);
  }

  return (
    <>
      <Tooltip
        title={'Set Huddles'}
        classes={{ tooltip: classes.noMaxWidth }}
        placement="bottom"
        PopperProps={{ disablePortal: true }}
        onClick={openBreakout}
      >
        <Fab className={classes.fab} disabled={false} data-cy-audio-toggle>
          <Menu />
        </Fab>
      </Tooltip>
      <BreakoutDialog open={breakoutOpen} onClose={closeBreakout} />
    </>
  );
}
