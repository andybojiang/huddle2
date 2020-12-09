import { Dialog, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import useParticipants from '../../../hooks/useParticipants/useParticipants';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '525px',
      minHeight: '400px',
      [theme.breakpoints.down('xs')]: {
        width: 'calc(100vw - 32px)',
      },
      '& .inputSelect': {
        width: 'calc(100% - 35px)',
      },
    },
    button: {
      float: 'right',
    },
    paper: {
      [theme.breakpoints.down('xs')]: {
        margin: '16px',
      },
      padding: '2%',
      height: '45vh',
      width: '45vh',
    },
    titleContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '15%',
    },
    title: {},
    formContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'scroll',
      height: '70%',
    },
    participantRow: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
    name: {
      width: '20%',
    },
    huddle: {
      width: '80%',
    },
    submitContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '15%',
    },
    submitButton: {
      color: 'black',
      backgroundColor: 'white',
    },
  })
);

export default function BreakoutDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const classes = useStyles();
  const { participants } = useParticipants();

  console.log(participants);

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
      <div className={classes.titleContainer}>
        <h1 className={classes.title}>Set Breakouts</h1>
      </div>

      <div className={classes.formContainer}>
        {participants.map(participant => {
          return (
            <div className={classes.participantRow}>
              <p className={classes.name}>{participant.identity}</p>
              <select className={classes.huddle}>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option selected value="coconut">
                  Coconut
                </option>
                <option value="mango">Mango</option>
              </select>
            </div>
          );
        })}
      </div>

      <div className={classes.submitContainer}>
        <Button className={classes.submitButton}>Submit</Button>
      </div>
    </Dialog>
  );
}
