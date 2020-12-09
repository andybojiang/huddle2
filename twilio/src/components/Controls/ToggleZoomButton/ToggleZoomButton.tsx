import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import Tooltip from '@material-ui/core/Tooltip';

import useAPIContext from '../../../hooks/useAPIContext/useAPIContext';

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
    //   right: '50%',
    //   transform: 'translate(50%, 30px)',
    //   top: '3%',
    // },
    noMaxWidth: {
      maxWidth: 'none',
    },
  })
);

/* <Fab className={classes.fab} onClick={() => props.onClick(!props.zoomed)} data-cy-audio-toggle>
        {props.zoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
      </Fab> */

export default function ToggleZoomButton() {
  const classes = useStyles();
  const { zoomed, toggleZoomed } = useAPIContext();

  return (
    // <div className={classes.container}>
    <Tooltip
      title={zoomed ? 'Zoom out' : 'Zoom in'}
      classes={{ tooltip: classes.noMaxWidth }}
      placement="bottom"
      PopperProps={{ disablePortal: true }}
      onClick={toggleZoomed}
    >
      <Fab className={classes.fab} data-cy-audio-toggle>
        {zoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
      </Fab>
    </Tooltip>
    // </div>
  );
}
