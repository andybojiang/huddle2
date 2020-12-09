import { RemoteParticipant } from 'twilio-video';
import { useEffect, useState } from 'react';
import { IState } from '../index';
import useParticipants from '../../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import useRoomState from '../../../hooks/useRoomState/useRoomState';

// DO NOT USE THIS HOOK ANYWHERE ELSE, ONLY USED IN APIPROVIDER

interface IData {
  // TODO, make the type of data explicit
}

export default function useAPIHook() {
  // const [participants]: RemoteParticipant[] = useParticipants();
  const roomState = useRoomState();
  const { participants, disconnection, disconnectionProcessed } = useParticipants();
  const { room } = useVideoContext();
  const localParticipant = room.localParticipant;

  const [state, setState] = useState<IState>({
    state: {},
    joined: false,
    counter: 0,
    huddle: -1,
    bot_url: '',
    bot_name: '',
  });

  if (roomState !== 'disconnected' && !state.joined) {
    console.log('Joining room...');
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    var url = 'https://huddle-video.herokuapp.com/room/join?first=andy&last=jiang&username=da;sdf';
    url += '&id=' + room.sid;
    url += '&user_id=' + localParticipant.sid;

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => updateState(data));
  }

  // make SURE useAPIHook is only called inside a CONNECTED ROOM
  // IMPORTANT!!!
  // I need to add redux here
  // TODO: Wrap this component in redux
  useEffect(() => {
    if (roomState !== 'disconnected') {
      const interval = setInterval(() => {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        var url = 'https://huddle-video.herokuapp.com/room/state';
        url += '?id=' + room.sid;
        url += '&user_id=' + localParticipant.sid;
        fetch(url, requestOptions)
          .then(response => response.json())
          .then(data => updateState(data));
      }, 500);
      return () => clearInterval(interval);
    }
  });

  // IMPORTANT!!!
  function updateState(data: any) {
    console.log('updating state ...');

    // Only updates state if theres actually a change to the state
    if (data.state_counter !== state.counter || disconnection) {
      // console.log(data);
      var newState: {
        [key: string]: {
          participants: any;
          name?: string;
        };
      } = {};

      // Lots of for loops
      participants.map(p => {
        const huddleID: string = data.users[p.sid];
        if (newState[huddleID] === undefined) {
          newState[huddleID] = {
            participants: [],
            name: undefined,
          };
        }
        newState[huddleID].participants.push(p);
      });

      const huddleID: string = data.huddle_id;

      if (newState[huddleID] === undefined) {
        newState[huddleID] = {
          participants: [],
          name: undefined,
        };
      }
      newState[huddleID].participants.push(localParticipant);

      Object.keys(data.named_huddles).map(id => {
        if (newState[id] === undefined) {
          newState[id] = {
            participants: [],
            name: undefined,
          };
        }

        newState[id].name = data.named_huddles[id];
      });

      console.log(newState);
      disconnectionProcessed();

      setState({
        state: newState,
        joined: true,
        counter: data.state_counter,
        huddle: parseInt(data.huddle_id),
        bot_url: data.bot_url,
        bot_name: data.bot_name,
      });
    }
  }

  return [state, updateState] as const;
}
