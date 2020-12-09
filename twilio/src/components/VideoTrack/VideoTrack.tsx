import React, { useRef, useEffect } from 'react';
import { IVideoTrack } from '../../types';
import { styled } from '@material-ui/core/styles';
import { Track } from 'twilio-video';

import './VideoTrack.css';

const Video = styled('video')({
  width: '100% !important',
  height: '100%',
  objectFit: 'cover',
  zIndex: 2,
  // borderRadius: '50%',
});

interface VideoTrackProps {
  track: IVideoTrack;
  isLocal?: boolean;
  priority?: Track.Priority | null;
  x?: number;
  y?: number;
}

export default function VideoTrack({ track, isLocal, priority, x, y }: VideoTrackProps) {
  const ref = useRef<HTMLVideoElement>(null!);

  useEffect(() => {
    const el = ref.current;
    el.muted = true;
    if (track.setPriority && priority) {
      track.setPriority(priority);
    }
    track.attach(el);
    return () => {
      track.detach(el);
      if (track.setPriority && priority) {
        // Passing `null` to setPriority will set the track's priority to that which it was published with.
        track.setPriority(null);
      }
    };
  }, [track, priority]);

  // The local video track is mirrored.
  const isFrontFacing = track.mediaStreamTrack.getSettings().facingMode !== 'environment';
  var style = isLocal && isFrontFacing ? { transform: 'rotateY(180deg)' } : {};

  // Makes mouse the center of circle
  /*
  if (x != null && y != null) {
    x -= 250;
    y -= 250;
  }
  */

  /* original code
  return (
    // <div className="video-wrapper">
    <div className = "video-cropper" style={{ left: x, top: y }}>
      <Video ref={ref} style={style} className="video" />
    </div>
    // </div>
  );
  */

  return <Video ref={ref} style={style} className="video" />;
}
