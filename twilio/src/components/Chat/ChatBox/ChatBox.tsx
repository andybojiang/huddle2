import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import Linkify from 'react-linkify';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      '*::-webkit-scrollbar': {
        backgroundColor: 'rgba(0,0,0,0)',
      },
    },
    '*::-webkit-scrollbar': {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    container: {
      position: 'absolute',
      right: '15px',
      // transform: 'translate(50%, 30px)',
      top: '7%',
      backgroundColor: '#EDAAB7',
      width: '270px',
      height: '85%',
      display: 'flex',
      flexDirection: 'column',
      padding: '1vh 1vw',
      margin: '1vh',
      borderRadius: '15px',
      boxShadow: '4px 4px 17px rgba(0, 0, 0, 0.13)',
      '*::-webkit-scrollbar': {
        display: 'none',
      },
      overflowX: 'hidden',
      zIndex: 3,
    },
    topBar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '20px',
      marginLeft: '5px',
    },
    closeButton: {
      height: '5vh',
      width: '20px !important',
    },
    closeIcon: {},
    title: {
      height: '5%',
      alignSelf: 'center',
    },
    messageListContainer: {
      height: '85%',
      overflowY: 'scroll',
      marginLeft: '14px',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    senderContainer: {
      height: '10%',
      display: 'flex',
      justifyContent: 'center',
    },
    messageContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      marginTop: '5%',
      marginRight: '7%',
      marginLeft: '7%',
    },
    textField: {
      width: '90%',
    },
    messageData: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0px',
    },
    messageBody: {
      margin: '0px',
    },
    h1: {
      margin: '0px',
      textAlign: 'center',
      color: '#ffffff',
    },
    h2: {
      margin: '0px',
    },
    p: {
      margin: '0px',
    },
  })
);

export interface ChatProps {
  username: string;
  body: string;
}

interface ChatBoxProps {
  closeChat: () => void;
  sendMessage: (body: string) => void;
  messages?: ChatProps[];
}

export default function ChatBox({ closeChat, sendMessage, messages }: ChatBoxProps) {
  const { room } = useVideoContext();
  const localParticipant = room.localParticipant;

  const classes = useStyles();
  const [body, setBody] = useState<string>('');

  const messagesEndRef = useRef(document.createElement('div'));

  // useEffect(() => {
  //   messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  // });

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  function handleSubmit(e: any) {
    if (e.keyCode === 13) {
      sendMessage(body);
      setBody('');
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.topBar}>
        <Button onClick={closeChat} className={classes.closeButton}>
          <Close className={classes.closeIcon} />
        </Button>
        <h1 className={classes.h1}>Chat</h1>
      </div>

      <div className={classes.messageListContainer} ref={messagesEndRef}>
        {messages !== undefined &&
          messages
            .slice(0)
            .reverse()
            .map(message => (
              <div className={classes.messageContainer}>
                <div className={classes.messageData}>
                  <h2 className={classes.h2}>{message.username}</h2>
                  {/* <p>8:00 p.m.</p> */}
                </div>
                <div className={classes.messageBody}>
                  <Linkify>{message.body}</Linkify>
                </div>
              </div>
            ))}
      </div>
      <div className={classes.senderContainer}>
        {/* <form onSubmit={handleSubmit}> */}
        <TextField
          id="menu-name"
          label="Message"
          className={classes.textField}
          value={body}
          onKeyDown={handleSubmit}
          onChange={handleNameChange}
          margin="dense"
          autoComplete="off"
        />
        {/* </form> */}
      </div>
    </div>
  );
}
