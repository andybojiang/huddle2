import React from 'react';
import { Participant as IParticipant } from 'twilio-video';
import { MemoParticipant } from '../../Participant/Participant';
import { styled } from '@material-ui/core/styles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const topVals: number[] = [50, 20, 80, 35, 65];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    huddle: {
      overflow: 'visible',
      border: '2px dashed grey',
      display: 'flex',
    },
  })
);

interface SpacialIndicatorProps {
  participants: IParticipant[];
  index: number;
}

export default function SpacialIndicator({ participants, index }: SpacialIndicatorProps) {
  const left = index % 2 == 0;

  const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: topVals[Math.floor(index / 2)].toString() + 'vh',
    left: left ? '1vw' : 'none',
    right: !left ? '1vw' : 'none',
    // backgroundColor: 'blue'
  });

  const VideosContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    padding: '20%',
  });

  const Arrow = styled('div')({
    height: '0px',
    width: '0px',
    borderTop: '15px solid transparent',
    borderBottom: '15px solid transparent',
    borderRight: '15px solid ' + (left ? '#A3B1F6' : 'transparent'),
    borderLeft: '15px solid ' + (!left ? '#A3B1F6' : 'transparent'),
    // backgroundColor: 'green',
  });

  const Video = styled('div')({
    height: '20px',
    width: '20px',
    backgroundColor: 'orange',
    borderRadius: '50%',
    margin: '15%',
  });

  function onClick() {}

  participants = participants.slice(0, 3);

  return (
    <Container>
      {left ? (
        <>
          <Arrow />
          <VideosContainer>
            {participants.map(participant => {
              return (
                <MemoParticipant
                  key={participant.sid}
                  participant={participant}
                  isSelected={false}
                  onClick={onClick}
                  enableScreenShare={false}
                  size={20}
                  disableAudio={true}
                  contentView={true}
                  indicator={true}
                />
              );
            })}
          </VideosContainer>
        </>
      ) : (
        <>
          <VideosContainer>
            {participants.map(participant => {
              return (
                <MemoParticipant
                  key={participant.sid}
                  participant={participant}
                  isSelected={false}
                  onClick={onClick}
                  enableScreenShare={false}
                  size={20}
                  disableAudio={true}
                  contentView={true}
                  indicator={true}
                />
              );
            })}
          </VideosContainer>
          <Arrow />
        </>
      )}
    </Container>
  );
}
