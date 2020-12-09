import React from 'react';
import { styled, createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { MemoParticipant } from '../../Participant/Participant';
import Webview from '../../Webview/Webview';

import useScreenShareParticipant from '../../../hooks/useScreenShareParticipant/useScreenShareParticipant';
import useAPIContext from '../../../hooks/useAPIContext/useAPIContext';
import { Participant } from 'twilio-video';
import SpatialIndicator from './SpacialIndicator';

import { nextSquareRoot } from '../../../utils/algorithms';

interface HuddleContentProps {}

export default function HuddleContent({}: HuddleContentProps) {
  const { state } = useAPIContext();
  const screenSharingParticipant = useScreenShareParticipant();
  const participants: any[] = state.state[state.huddle].participants;
  const huddleList = Object.keys(state.state);
  const size: number = (window.innerHeight * 1) / 5;

  const adjustedHuddleDiameter = (nextSquareRoot(participants.length) + Math.sqrt(2) - 1) * size;
  const gridTemplateColumns = 'repeat(' + Math.min(4, participants.length) + ', 1fr)';
  const border = 'null';

  const adjustedPosition = {
    left: adjustedHuddleDiameter / 2,
    top: adjustedHuddleDiameter / 2,
  };

  function onParticipantClick() {}
  // adjusting the center

  const Positioner = styled('div')({
    border: border,
    borderRadius: '0%',
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyItems: 'center',
    left: '0px !important',
    top: '0px !important',
    display: 'flex',
    flexDirection: 'row',
    gridTemplateColumns: gridTemplateColumns,
  });

  const Content = styled('div')({
    width: '80vw',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  const ParticipantStrip = styled('div')({
    width: '20vw',
    height: '100%',
    overflow: 'scroll',
    padding: '2%',
  });

  let index: number = 0;

  return (
    <Positioner style={adjustedPosition}>
      <Content>
        {screenSharingParticipant !== undefined ? (
          // <Codenames size={window.innerWidth*0.71} aspectRatio={1200/700} />

          <MemoParticipant
            key={screenSharingParticipant?.sid}
            participant={screenSharingParticipant}
            isSelected={true}
            onClick={onParticipantClick}
            enableScreenShare={true}
            size={window.innerWidth * 0.7}
            aspectRatio={16 / 10}
            disableAudio={false}
            contentView={true}
            indicator={false}
          />
        ) : (
          <>
            {state.bot_url !== null ? (
              <Webview
                name={state.bot_name}
                url={state.bot_url}
                size={window.innerWidth * 0.65}
                aspectRatio={1200 / 700}
              />
            ) : (
              <></>
            )}
          </>
        )}
      </Content>

      <ParticipantStrip>
        {participants.map(participant => {
          return (
            <MemoParticipant
              key={participant.sid}
              participant={participant}
              isSelected={true}
              onClick={onParticipantClick}
              enableScreenShare={false}
              size={size}
              disableAudio={false}
              contentView={true}
              indicator={false}
            />
          );
        })}
      </ParticipantStrip>

      {huddleList.map(huddleID => {
        let huddleParticipants: [] = state.state[huddleID].participants;

        if (huddleID !== state.huddle.toString()) {
          return <SpatialIndicator index={index++} participants={huddleParticipants} />;
        }
      })}
    </Positioner>
  );
}
