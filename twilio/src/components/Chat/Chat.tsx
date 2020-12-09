import React from 'react';

import { useState, useEffect } from 'react';
import ToggleChatButton from './ToggleChatButton/ToggleChatButton';
import ChatBox from './ChatBox/ChatBox';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

export interface ChatProps {
  username: string;
  body: string;
}

export default function Chat() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatProps[]>();
  const [read, setRead] = useState<boolean>();

  const { room } = useVideoContext();
  const localParticipant = room.localParticipant;

  function openChat() {
    setChatOpen(true);
    setRead(true);
  }

  function closeChat() {
    setChatOpen(false);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      var url = 'https://huddle-video.herokuapp.com/messages/get';
      url += '?id=' + room.sid;

      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          if ((messages == undefined || data.length > messages.length) && !chatOpen && read) {
            setRead(false);
          }
          setMessages(data);
        });
    }, 500);
    return () => clearInterval(interval);
  });

  const sendMessage = (body: string) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    var url = 'https://huddle-video.herokuapp.com/messages/send';
    url += '?id=' + room.sid;
    url += '&username=' + localParticipant.identity;
    url += '&body=' + body;
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => setMessages(data));
  };

  return (
    <>
      {chatOpen ? (
        <ChatBox closeChat={closeChat} sendMessage={sendMessage} messages={messages} />
      ) : (
        <ToggleChatButton openChat={openChat} unread={!read} />
      )}
    </>
  );
}
