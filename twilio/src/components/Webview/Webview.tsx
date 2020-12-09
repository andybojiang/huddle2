import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import useAPIContext from '../../hooks/useAPIContext/useAPIContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    titleBar: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: '1.5em',
      color: 'black',
    },
    webview: {
      border: 'none',
      borderRadius: '25px',
      backgroundColor: '#CEAED4',
    },
    fab: {
      margin: theme.spacing(1),
      color: 'white !important',
      height: '4vh',
      width: '4vh',
      backgroundColor: 'red !important',
      boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.14) !important',
    },
  })
);

interface WebviewProps {
  name: string;
  url: string;
  size: number;
  aspectRatio: number;
}

export default function Webview({ name, url, size, aspectRatio }: WebviewProps) {
  const classes = useStyles();

  const { removeBot } = useAPIContext();

  return (
    <div className={classes.container}>
      <div className={classes.titleBar}>
        <Fab className={classes.fab} color="primary" onClick={removeBot}>
          <Close />
        </Fab>
        <p className={classes.title}>{name}</p>
      </div>
      <iframe
        className={classes.webview}
        style={{ width: size.toString() + 'px', height: (size / aspectRatio).toString() + 'px' }}
        src={url}
      />
    </div>
  );
}
