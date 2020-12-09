import React from 'react';
import { Participant as IParticipant } from 'twilio-video';
import { nextSquareRoot } from '../../../utils/algorithms';

import { styled } from '@material-ui/core/styles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';
import Tooltip from '@material-ui/core/Tooltip';
import ScreenShare from '@material-ui/icons/ScreenShare';
import Apps from '@material-ui/icons/Apps';

import { MemoParticipant } from '../../Participant/Participant';
import useScreenShareParticipant from '../../../hooks/useScreenShareParticipant/useScreenShareParticipant';
import PinHuddleButton from './PinHuddleButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    huddleName: {
      color: 'black',
    },
  })
);

interface HuddleProps {
  participants: IParticipant[];
  name?: string;
  position: any;
  huddleID: string;
  onClick: (huddleID: string) => void;
  inHuddle: boolean;
  isSharing: boolean;
  bot: string;
  toggleZoomed: () => void;
}

export default function Huddle({
  participants,
  name,
  position,
  huddleID,
  onClick,
  inHuddle,
  isSharing,
  bot,
  toggleZoomed,
}: HuddleProps) {
  const size = ((inHuddle ? 1 : 0.7) * (window.innerHeight * 1)) / 5;
  const adjustedHuddleDiameter = (nextSquareRoot(Math.min(participants.length, 4)) + Math.sqrt(2) - 1) * size;
  const screenShareParticipant = useScreenShareParticipant();
  const classes = useStyles();

  console.log(name);

  const adjustedPosition = {
    left: window.innerWidth * position.left - adjustedHuddleDiameter / 2,
    top: window.innerHeight * position.top - adjustedHuddleDiameter / 2,
  };
  // adjusting the center

  const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: inHuddle ? 'none' : '3px solid #6FB4F644',
    background: inHuddle ? 'linear-gradient(135deg, #EFE4f966, #FFE8E966);' : 'none',
    borderRadius: '50%',
    width: adjustedHuddleDiameter * (name !== undefined ? 1.2 : 1),
    height: adjustedHuddleDiameter * (name !== undefined ? 1.2 : 1),
    position: 'absolute',
  });

  const Positioner = styled('div')({
    justifyItems: 'center',
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: participants.length === 1 ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)',
  });

  const ScreenShareIndicator = styled('div')({
    backgroundColor: 'pink',
    borderRadius: '50%',
    position: 'absolute',
    width: (window.innerHeight / 25).toString() + 'px',
    height: (window.innerHeight / 25).toString() + 'px',
    left: window.innerWidth * position.left - adjustedHuddleDiameter / 2.5,
    top: window.innerHeight * position.top - adjustedHuddleDiameter / 2.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  let tooltipMessage;
  if (inHuddle) {
    tooltipMessage = 'My huddle';
  } else if (isSharing) {
    tooltipMessage = 'Cannot move huddles while sharing screen';
  } else {
    tooltipMessage = 'Click to join';
  }

  function huddleClick() {
    if (!isSharing) {
      onClick(huddleID);
    }
  }

  function huddleContent() {
    const huddleParticipants = participants.length > 4 ? participants.slice(0, 3) : participants;
    let icon =
      participants.length > 4 ? (
        <div
          style={{
            borderRadius: '50%',
            backgroundColor: '#A3B0F7',
            width: size,
            height: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PeopleIcon style={{ width: '5em', height: '5em' }} />
        </div>
      ) : null;

    // INNER LOOP FOR THE NESTED
    const contents = huddleParticipants.map(participant => {
      return (
        <MemoParticipant
          key={participant.sid}
          participant={participant}
          isSelected={inHuddle}
          onClick={huddleClick}
          enableScreenShare={false}
          size={size}
          disableAudio={!inHuddle}
          contentView={true}
          indicator={false}
        />
      );
    });

    if (icon) {
      contents.push(icon);
    }
    return contents;
  }

  return (
    <>
      <Tooltip
        title={tooltipMessage}
        placement="top"
        PopperProps={{ disablePortal: true }}
        onClick={() => onClick(huddleID)}
        style={adjustedPosition}
      >
        <Container>
          <Positioner style={adjustedPosition}>{huddleContent()}</Positioner>
          {name !== undefined ? <h1 className={classes.huddleName}>{name}</h1> : <></>}
        </Container>
      </Tooltip>
      {(screenShareParticipant || bot !== null) && (
        <Tooltip
          title={
            screenShareParticipant
              ? 'Participant is screensharing, click to zoom in'
              : 'App is being used, click to zoom in'
          }
          placement="top"
          PopperProps={{ disablePortal: true }}
          onClick={toggleZoomed}
        >
          <ScreenShareIndicator>{screenShareParticipant ? <ScreenShare /> : <Apps />}</ScreenShareIndicator>
        </Tooltip>
      )}
      <PinHuddleButton position={position} huddleDiameter={adjustedHuddleDiameter} huddleID={huddleID} oldName={name} />
    </>
  );
}
