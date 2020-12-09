import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Chat from '@material-ui/icons/Chat';
import { styled } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      color: 'white',
      backgroundColor: '#f2aab2 !important',
      height: '55px',
      width: '55px',
      top: '15px',
      right: '15px',
      boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.14) !important',
    },
    container: {
      display: 'flex',
      position: 'absolute',
      right: '2%',
      top: '3%',
      transform: 'translate(50%, 30px)',
      zIndex: 3,
    },
    maxWidth: {
      maxWidth: 'none',
    },
    notifications: {
      backgroundColor: 'red',
      position: 'absolute',
      width: '19px',
      height: '19px',
      borderRadius: '50%',
      fontSize: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      right: '38px',
      top: '2px',
    },
  })
);

interface ToggleChatButtonProps {
  openChat: () => void;
  unread: boolean;
}

export default function ToggleChatButton({ openChat, unread }: ToggleChatButtonProps) {
  const classes = useStyles();
  // const [messages, setMessages] = useState<Chat[]>([]);
  // console.log(messages.length);
  // const messagesPresent = messages.length !== 0;

  const UnreadIndicator = styled('div')({
    height: '16px',
    width: '16px',
    borderRadius: '50%',
    backgroundColor: 'red',
    position: 'absolute',
    right: '38px',
    top: '2px',
  });

  return (
    <>
      <div className={classes.container}>
        <Tooltip title="Open Chat" placement="bottom" PopperProps={{ disablePortal: true }} onClick={openChat}>
          <Fab className={classes.fab} onClick={openChat}>
            <Chat />
            {unread ? <UnreadIndicator /> : <div></div>}
          </Fab>
        </Tooltip>
      </div>
    </>
  );
}
