import React, { useState, useEffect } from 'react';
// import { RemoteParticipant } from 'twilio-video';
// import useParticipants from '../useParticipants/useParticipants';
// import useVideoContext from '../useVideoContext/useVideoContext';

// interface State {
//   state: any;
//   joined: boolean;
//   counter: number;
//   huddle: number;
// }

// export default function useAPI() {
//   const participants: RemoteParticipant[] = useParticipants();
//   const { room } = useVideoContext();
//   const localParticipant = room.localParticipant;

//   const [state, setState] = useState<State>({
//     state: {},
//     joined: false,
//     counter: 0,
//     huddle: -1,
//   });

//   if (!state.joined) {
//     // console.log('Joining room...');
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//     };
//     var url = 'https://huddle-video.herokuapp.com/room/join?first=andy&last=jiang&username=da;sdf';
//     url += '&id=' + room.sid;
//     url += '&user_id=' + localParticipant.sid;

//     fetch(url, requestOptions)
//       .then(response => response.json())
//       .then(data => updateState(data));
//   }

//   function updateState(data: any) {
//     if (data.state_counter !== state.counter) {
//       // console.log(data);
//       var newState: {
//         [key: string]: any;
//       } = {};
//       participants.map(p => {
//         const huddleID: string = data.users[p.sid];
//         if (newState[huddleID] === undefined) {
//           newState[huddleID] = [];
//         }
//         newState[huddleID].push(p);
//       });
//       const huddleID: string = data.huddle_id;
//       if (newState[huddleID] === undefined) {
//         newState[huddleID] = [];
//       }
//       newState[huddleID].push(localParticipant);

//       // console.log('new state...');
//       // console.log(newState);

//       setState({
//         state: newState,
//         joined: true,
//         counter: data.state_counter,
//         huddle: parseInt(data.huddle_id),
//       });
//     }
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const requestOptions = {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//       };
//       var url = 'https://huddle-video.herokuapp.com/room/state';
//       url += '?id=' + room.sid;
//       url += '&user_id=' + localParticipant.sid;
//       fetch(url, requestOptions)
//         .then(response => response.json())
//         .then(data => updateState(data));
//     }, 1000);
//     return () => clearInterval(interval);
//   });

//   async function joinHuddle(huddle: string) {
//     if (parseInt(huddle) != state.huddle) {
//       // console.log('Joining huddle...');
//       const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//       };

//       var url = 'https://huddle-video.herokuapp.com/huddle/join';
//       url += '?id=' + room.sid;
//       url += '&user_id=' + localParticipant.sid;
//       url += '&new_huddle_id=' + huddle;
//       fetch(url, requestOptions)
//         .then(response => response.json())
//         .then(data => updateState(data));
//     }
//   }

//   async function addHuddle() {
//     if (Object.keys(state.state).length < 6 && state.state[state.huddle].length > 1) {
//       // console.log('Adding huddle...');
//       const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//       };

//       var url = 'https://huddle-video.herokuapp.com/huddle/create';
//       url += '?id=' + room.sid;
//       url += '&user_id=' + localParticipant.sid;
//       fetch(url, requestOptions)
//         .then(response => response.json())
//         .then(data => updateState(data));
//     }
//   }

//   async function deleteUser() {
//     const requestOptions = {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//     };

//     var url = 'https://huddle-video.herokuapp.com/room/leave';
//     url += '?id=' + room.sid;
//     url += '&user_id=' + localParticipant.sid;
//     fetch(url, requestOptions);
//   }

//   return {
//     room: room,
//     state: state,
//     participants: participants,
//     localParticipant: localParticipant,
//     joinHuddle: joinHuddle,
//     addHuddle: addHuddle,
//     deleteUser: deleteUser,
//   };
// }
