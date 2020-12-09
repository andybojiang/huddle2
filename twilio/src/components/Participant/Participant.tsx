import { styled } from '@material-ui/core/styles';
import React from 'react';
import { Participant as IParticipant } from 'twilio-video';
import ParticipantTracks from '../ParticipantTracks/ParticipantTracks';
// import ParticipantInfo from '../ParticipantInfo/ParticipantInfo';
import useAPIContext from '../../hooks/useAPIContext/useAPIContext';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';

interface ParticipantProps {
  participant: IParticipant;
  disableAudio?: boolean;
  enableScreenShare?: boolean;
  onClick: () => void;
  isSelected: boolean;
  position?: object;
  size: number;
  aspectRatio?: number;
  huddleID?: number;
  contentView: boolean;
  indicator: boolean;
}

export default function Participant({
  participant,
  disableAudio,
  enableScreenShare,
  onClick,
  isSelected,
  position,
  size,
  aspectRatio,
  huddleID,
  contentView,
  indicator,
}: ParticipantProps) {
  const { zoomed } = useAPIContext();

  const Positioner = styled('div')({
    height: aspectRatio !== undefined ? (size / aspectRatio).toString() + 'px' : size.toString() + 'px',
    width: size.toString() + 'px',
    margin: '1vh auto',
    objectFit: 'contain',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: enableScreenShare ? '2.8125%/5%' : '1000px',
    overflow: 'hidden',
    backgroundColor: '#A3B0F7',
    position: zoomed && !contentView ? 'absolute' : 'relative',
  });

  const Name = styled('div')({
    height: (size * 0.8).toString() + 'px',
    width: (size * 0.8).toString() + 'px',
    backgroundColor: 'rgba(255,255,255,0.8)',
    color: 'black',
    fontSize: '18px',
    opacity: 0,
    '&:hover': {
      opacity: 1,
    },
    borderRadius: '1000px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    position: 'absolute',
    padding: '20px',
    transition: 'all 0.3s ease',
  });

  return (
    // TODO: convert to absolute and use {left: x, top: y}

    <Positioner style={position !== undefined ? position : {}}>
      {indicator || enableScreenShare ? (
        <VideocamOffIcon style={{ fill: 'white', position: 'absolute', zIndex: 0, height: '5px', width: '5px' }} />
      ) : (
        <>
          <Name>{participant.identity}</Name>
          <VideocamOffIcon style={{ fill: 'white', position: 'absolute', zIndex: 0, height: '60px', width: '60px' }} />
        </>
      )}

      {/* <ParticipantInfo participant={participant} onClick={onClick} isSelected={isSelected}> */}
      <ParticipantTracks participant={participant} disableAudio={disableAudio} enableScreenShare={enableScreenShare} />

      {/* </ParticipantInfo> */}
    </Positioner>
  );
}

export const MemoParticipant = React.memo(Participant);
