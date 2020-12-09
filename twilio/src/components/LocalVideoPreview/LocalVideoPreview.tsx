import React from 'react';
import { LocalVideoTrack } from 'twilio-video';
import VideoTrack from '../VideoTrack/VideoTrack';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { styled } from '@material-ui/core/styles';

const Container = styled('div')({
  overflow: 'hidden',
  borderRadius: '50%',
  width: '300px',
  height: '300px',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'absolute',
});

export default function LocalVideoPreview() {
  const { localTracks } = useVideoContext();

  const videoTrack = localTracks.find(track => track.name.includes('camera')) as LocalVideoTrack;

  // Hardcoded -150 for radius
  return videoTrack ? (
    <Container style={{ left: window.innerWidth / 2 - 150, top: window.innerHeight / 2 - 150 }}>
      <VideoTrack track={videoTrack} isLocal />
    </Container>
  ) : null;
}
