import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import useRoomName from '../../../hooks/useRoomName/useRoomName';
import usePasscode from '../../../hooks/usePasscode/usePasscode';

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import ShareIcon from '@material-ui/icons/Share';
import SuccessMessage from '../../SuccessMessage/SuccessMessage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      color: '#A3B0F7',
      height: '55px',
      width: '55px',
      backgroundColor: 'white !important',
      boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.14) !important',
    },
  })
);

export default function InviteLinkButton(props: { disabled?: boolean }) {
  const classes = useStyles();
  const roomName = useRoomName()[0];
  const passcode = usePasscode();
  const url = window.location.href;
  const handleCopy = () => {
    var placeHolder = url + '?passcode=' + passcode + '&roomName=' + roomName;
    var dummy = document.createElement('textarea');
    dummy.setAttribute('id', 'dummy_id');
    document.body.appendChild(dummy);
    document.getElementById('dummy_id')!.innerHTML = placeHolder;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };

  return (
    <div>
      <Tooltip title={'Copy Invite'} placement="top" PopperProps={{ disablePortal: true }}>
        <Fab className={classes.fab} onClick={handleCopy} disabled={props.disabled}>
          <ShareIcon />
        </Fab>
      </Tooltip>
      {/* <SuccessMessage /> */}
    </div>
  );
}
