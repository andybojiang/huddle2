import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

import useAPIContext from '../../../hooks/useAPIContext/useAPIContext';
import Popup from 'reactjs-popup';

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
    noMaxWidth: {
      maxWidth: 'none',
    },
    fieldContainer: {
      position: 'absolute',
      height: '5vh',
      width: '10vw',
      backgroundColor: '#CDADD3',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      top: '10vh',
      zIndex: 1,
      borderRadius: '5%/15%',
      display: 'flex',
      justifyContent: 'center',
      padding: '2%',
    },
    field: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
    },
  })
);

/* <Fab className={classes.fab} onClick={() => props.onClick(!props.zoomed)} data-cy-audio-toggle>
        {props.zoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
      </Fab> */

export default function AddHuddleButton() {
  const classes = useStyles();
  const { emptyHuddle, zoomed, isSharing } = useAPIContext();
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  function onClick() {
    setFormOpen(!formOpen);
  }

  console.log('should not run when state changes!!');

  const disableAddHuddleButton = zoomed || isSharing;

  let tooltipMessage;
  if (zoomed) {
    tooltipMessage = 'Cannot add huddle while zoomed in';
  } else if (isSharing) {
    tooltipMessage = 'Cannot add huddle while sharing screen';
  } else {
    tooltipMessage = 'Add huddle';
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      emptyHuddle(name);
    }
  }

  return (
    // <div className={classes.container}>
    <Tooltip
      title={tooltipMessage}
      classes={{ tooltip: classes.noMaxWidth }}
      placement="bottom"
      PopperProps={{ disablePortal: true }}
      // onClick={addHuddle}
      style={{ cursor: zoomed ? 'not-allowed' : 'pointer' }}
    >
      <>
        <Fab onClick={onClick} className={classes.fab} disabled={disableAddHuddleButton} data-cy-audio-toggle>
          <AddCircleOutlineIcon />
        </Fab>

        {formOpen && (
          <div className={classes.fieldContainer}>
            <input autoFocus className={classes.field} onChange={handleNameChange} onKeyDown={handleKeyDown} />
          </div>
        )}
      </>
    </Tooltip>
    // </div>
  );
}
