import React, { createContext, ReactNode, useState } from 'react';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useAPIHook from './useAPIHook/useAPIHook';
import useZoomToggle from './useZoomToggle/useZoomToggle';
import useScreenShareToggle from './useScreenShareToggle/useScreenShareToggle';

export interface IState {
  state: any;
  joined: boolean;
  counter: number;
  huddle: number;
  bot_url: string;
  bot_name: string;
}

interface IAPIContext {
  state: IState;
  joinHuddle: (huddle: string) => void;
  leaveHuddle: () => void;
  deleteUser: () => void;
  addBot: (name: string) => void;
  removeBot: () => void;
  emptyHuddle: (name: string) => void;
  nameHuddle: (huddle: string, name: string) => void;
  unnameHuddle: (huddle: string) => void;
  zoomed: boolean;
  toggleZoomed: () => void;
  isSharing: boolean;
  toggleScreenShare: () => void;
}

interface APIProviderProps {
  children: ReactNode;
}

export const APIContext = createContext<IAPIContext>(null!);

export function APIProvider({ children }: APIProviderProps) {
  const { room } = useVideoContext();
  const localParticipant = room.localParticipant;

  const [zoomed, toggleZoomed] = useZoomToggle();
  const [state, updateState] = useAPIHook();
  const [isSharing, toggleScreenShare] = useScreenShareToggle(state);

  async function joinHuddle(huddle: string) {
    if (parseInt(huddle) !== state.huddle) {
      // console.log('Joining huddle...');
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      };

      var url = 'https://huddle-video.herokuapp.com/huddle/join';
      url += '?id=' + room.sid;
      url += '&user_id=' + localParticipant.sid;
      url += '&new_huddle_id=' + huddle;
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => updateState(data));
    }
  }

  async function emptyHuddle(name: string) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    var url = 'https://huddle-video.herokuapp.com/huddle/empty';
    url += '?id=' + room.sid;
    url += '&name=' + name;

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => updateState(data));
  }

  async function nameHuddle(huddle: string, name: string) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    var url = 'https://huddle-video.herokuapp.com/huddle/name';
    url += '?id=' + room.sid;
    url += '&huddle_id=' + huddle;
    url += '&name=' + name;

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => updateState(data));
  }

  async function unnameHuddle(huddle: string) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    var url = 'https://huddle-video.herokuapp.com/huddle/unname';
    url += '?id=' + room.sid;
    url += '&huddle_id=' + huddle;

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => updateState(data));
  }

  async function deleteUser() {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    var url = 'https://huddle-video.herokuapp.com/room/leave';
    url += '?id=' + room.sid;
    url += '&user_id=' + localParticipant.sid;
    fetch(url, requestOptions);
  }

  async function leaveHuddle() {
    if (state.state[state.huddle].participants.length > 1 || state.state[state.huddle].name != undefined) {
      console.log('Adding huddle...');
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      };

      var url = 'https://huddle-video.herokuapp.com/huddle/create';
      url += '?id=' + room.sid;
      url += '&user_id=' + localParticipant.sid;
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => updateState(data));
    }
  }

  async function addBot(name: string) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    var url = 'https://huddle-video.herokuapp.com/bots/' + name;
    url += '?id=' + room.sid;
    url += '&user_id=' + localParticipant.sid;
    url += '&huddle_id=' + state.huddle;
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => updateState(data));
  }

  async function removeBot() {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    var url = 'https://huddle-video.herokuapp.com/bots/delete';
    url += '?id=' + room.sid;
    url += '&user_id=' + localParticipant.sid;
    url += '&huddle_id=' + state.huddle;
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => updateState(data));
  }

  // WILL RERENDER ALL CHILDREN IF ANY OF THESE VALUES CHANGE
  // IMPORTANT!!!!!
  return (
    <APIContext.Provider
      value={{
        state,
        joinHuddle,
        leaveHuddle,
        deleteUser,
        addBot,
        removeBot,
        emptyHuddle,
        nameHuddle,
        unnameHuddle,
        zoomed,
        toggleZoomed,
        isSharing,
        toggleScreenShare,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}
