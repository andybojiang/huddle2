import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';

const Container = styled('div')({
  width: '320px',
  height: '50px',
  background: 'red',
  zIndex: 4,
  margin: '20px auto',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
export default function MobileError() {
  return <Container>Mobile devices not yet supported.</Container>;
}
