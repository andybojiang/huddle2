import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useAPIContext from '../../../hooks/useAPIContext/useAPIContext';
import useScreenShareParticipant from '../../../hooks/useScreenShareParticipant/useScreenShareParticipant';
import Tooltip from '@material-ui/core/Tooltip';
import useBotsToggle from '../../../hooks/useBotsToggle/useBotsToggle';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '10% 0% 0% 0%',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: '#909edd',
    },
  },
  iconContainer: {
    // height: '15vh'
  },
  image: {
    height: '15vh',
    width: '15vh',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  titleContainer: {
    // height: '200%'
  },
  title: {
    margin: 'none !important',
  },
}));

interface BotCardProps {
  icon: string;
  name: string;
  title: string;
}

export default function BotCard({ icon, name, title }: BotCardProps) {
  const classes = useStyles();
  const { addBot, zoomed, toggleZoomed } = useAPIContext();
  const [_, setBotsOpen] = useBotsToggle();
  const screenSharing: boolean = useScreenShareParticipant() !== undefined;

  function onClick() {
    if (!screenSharing) {
      addBot(name);
      if (!zoomed) {
        toggleZoomed();
      }
      setBotsOpen(false);
    }
  }

  return (
    <Tooltip
      title={screenSharing ? 'Cannot add bot while participant is screensharing' : 'Add to Huddle'}
      onClick={onClick}
      placement="right"
      PopperProps={{ disablePortal: true }}
    >
      <div className={classes.container} onClick={onClick}>
        <div className={classes.iconContainer}>
          <img src={icon} className={classes.image} />
        </div>
        <div className={classes.titleContainer}>
          <h3 className={classes.title}>{title}</h3>
        </div>
      </div>
    </Tooltip>
  );
}
