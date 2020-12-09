import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import PinDrop from '@material-ui/icons/PinDrop';
import Tooltip from '@material-ui/core/Tooltip';

import useAPIContext from '../../../hooks/useAPIContext/useAPIContext';
import Popup from 'reactjs-popup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
    fab: {
      margin: theme.spacing(1),
      backgroundColor: '#cdadd4 !important',
      color: 'white',
      width: (window.innerHeight / 25).toString() + 'px',
      height: (window.innerHeight / 25).toString() + 'px',
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
      zIndex: 2,
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

interface PinHuddleButtonProps {
  position: any;
  huddleDiameter: number;
  huddleID: string;
  oldName?: string;
}

export default function PinHuddleButton({ position, huddleDiameter, huddleID }: PinHuddleButtonProps) {
  const classes = useStyles();
  const { nameHuddle, unnameHuddle, state } = useAPIContext();
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>(state.state[huddleID].name);

  function onClick() {
    if (state.state[huddleID].name !== undefined) {
      unnameHuddle(huddleID);
    } else {
      setFormOpen(!formOpen);
    }
  }

  let tooltipMessage;
  if (state.state[huddleID].name !== undefined) {
    tooltipMessage = 'Unpin Huddle';
  } else {
    tooltipMessage = 'Pin Huddle';
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      nameHuddle(huddleID, name);
      setFormOpen(false);
    }
  }

  return (
    <div
      className={classes.container}
      style={{
        right: window.innerWidth * (1 - position.left) - huddleDiameter / 2,
        bottom: window.innerHeight * (1 - position.top) - huddleDiameter / 2,
      }}
    >
      <Tooltip
        title={tooltipMessage}
        classes={{ tooltip: classes.noMaxWidth }}
        placement="bottom"
        PopperProps={{ disablePortal: true }}
      >
        <>
          <Fab onClick={onClick} className={classes.fab}>
            <PinDrop />
          </Fab>

          {formOpen && (
            <div className={classes.fieldContainer}>
              <input autoFocus className={classes.field} onChange={handleNameChange} onKeyDown={handleKeyDown} />
            </div>
          )}
        </>
      </Tooltip>
    </div>
  );
}
