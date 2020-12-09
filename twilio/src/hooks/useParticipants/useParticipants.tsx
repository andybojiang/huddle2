import { useEffect, useState } from 'react';
import { RemoteParticipant } from 'twilio-video';
// import useDominantSpeaker from '../useDominantSpeaker/useDominantSpeaker';
import useVideoContext from '../useVideoContext/useVideoContext';

// export interface IParticipants {
//   participants: RemoteParticipant[],
//   disconnection: boolean,
//   disconnectionProcessed: () => void,
// }

export default function useParticipants() {
  const { room } = useVideoContext();
  // const dominantSpeaker = useDominantSpeaker();
  const [participants, setParticipants] = useState(Array.from(room.participants.values()));
  const [disconnection, setDisconnection] = useState<Boolean>(false);

  // When the dominant speaker changes, they are moved to the front of the participants array.
  // This means that the most recent dominant speakers will always be near the top of the
  // ParticipantStrip component.
  // useEffect(() => {
  //   if (dominantSpeaker) {
  //     setParticipants(prevParticipants => [
  //       dominantSpeaker,
  //       ...prevParticipants.filter(participant => participant !== dominantSpeaker),
  //     ]);
  //   }
  // }, [dominantSpeaker]);

  function disconnected() {
    console.log('DISCONNECTION');
    setDisconnection(true);
  }

  function disconnectionProcessed() {
    if (disconnection) {
      setDisconnection(false);
    }
  }

  useEffect(() => {
    const participantConnected = (participant: RemoteParticipant) =>
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    const participantDisconnected = (participant: RemoteParticipant) => {
      setParticipants(prevParticipants => prevParticipants.filter(p => p !== participant));
      disconnected();
    };
    room.on('participantConnected', participantConnected);
    room.on('participantDisconnected', participantDisconnected);
    return () => {
      room.off('participantConnected', participantConnected);
      room.off('participantDisconnected', participantDisconnected);
    };
  }, [room]);

  return { participants, disconnection, disconnectionProcessed } as const;
}
