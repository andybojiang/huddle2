import React from 'react';
import useAPIContext from '../../../hooks/useAPIContext/useAPIContext';
import Huddle from './Huddle';

interface Position {
  left: number;
  top: number;
}

const huddlePositions: Position[][] = [
  [{ left: 1 / 2, top: 1 / 2 }],
  [
    { left: 1 / 2, top: 1 / 2 },
    { left: 1 / 4, top: 1 / 2 },
  ],
  [
    { left: 1 / 2, top: 1 / 2 },
    { left: 1 / 5, top: 1 / 2 },
    { left: 4 / 5, top: 1 / 2 },
  ],
  [
    { left: 1 / 2, top: 1 / 2 },
    { left: 1 / 5, top: 1 / 3 },
    { left: 1 / 5, top: 2 / 3 },
    { left: 4 / 5, top: 1 / 2 },
  ],
  [
    { left: 1 / 2, top: 1 / 2 },
    { left: 1 / 4, top: 1 / 4 },
    { left: 1 / 4, top: 3 / 4 },
    { left: 3 / 4, top: 1 / 4 },
    { left: 3 / 4, top: 3 / 4 },
  ],
  [
    { left: 1 / 2, top: 1 / 2 },
    { left: 3 / 9, top: 1 / 6 },
    { left: 1 / 5, top: 1 / 2 },
    { left: 1 / 3, top: 4 / 5 },
    { left: 2 / 3, top: 4 / 5 },
    { left: 2 / 3, top: 1 / 3 },
  ],
  [
    { left: 1 / 2, top: 1 / 2 },
    { left: 1 / 3, top: 1 / 5 },
    { left: 1 / 5, top: 1 / 2 },
    { left: 1 / 3, top: 4 / 5 },
    { left: 2 / 3, top: 4 / 5 },
    { left: 4 / 5, top: 1 / 2 },
    { left: 2 / 3, top: 1 / 5 },
  ],
  [
    { left: 1 / 2, top: 1 / 2 },
    { left: 1 / 3, top: 1 / 5 },
    { left: 1 / 4, top: 1 / 2 },
    { left: 1 / 3, top: 4 / 5 },
    { left: 6 / 10, top: 4 / 5 },
    { left: 3 / 4, top: 7 / 10 },
    { left: 4 / 6, top: 1 / 4 },
    { left: 7 / 10, top: 1 / 6 },
  ],
];

export default function HuddleZoomedOut() {
  const { state, joinHuddle, isSharing, toggleZoomed } = useAPIContext();
  const huddleList = Object.keys(state.state);
  let num: number = 1;

  // NESTED FOR LOOPS HERE
  return (
    <>
      {huddleList.map(huddleID => {
        const huddleParticipants: [] = state.state[huddleID].participants;

        let pos;
        if (parseInt(huddleID) === state.huddle) {
          pos = huddlePositions[huddleList.length - 1][0];
        } else {
          pos = huddlePositions[huddleList.length - 1][num++];
        }

        return (
          <Huddle
            participants={huddleParticipants}
            name={state.state[huddleID].name}
            position={pos}
            huddleID={huddleID}
            onClick={joinHuddle}
            inHuddle={parseInt(huddleID) === state.huddle}
            isSharing={isSharing}
            bot={state.bot_url}
            toggleZoomed={toggleZoomed}
          />
        );
      })}
    </>
  );
}
