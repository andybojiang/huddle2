import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import BotCard from '../BotCard/BotCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      '*::-webkit-scrollbar': {
        backgroundColor: 'rgba(0,0,0,0)',
      },
    },
    '*::-webkit-scrollbar': {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    container: {
      position: 'absolute',
      left: '15px',
      // transform: 'translate(50%, 30px)',
      top: '9%',
      backgroundColor: '#A3B0F6',
      width: '250px',
      height: '85%',
      display: 'flex',
      flexDirection: 'column',
      padding: '0% 2%',
      margin: '20px',
      borderRadius: '15px',
      boxShadow: '4px 4px 17px rgba(0, 0, 0, 0.13)',
      zIndex: 3,
      overflowX: 'hidden',
      '&::-webkit-scrollbar': {
        backgroundColor: 'rgba(0,0,0,0)',
      },
    },
    topBar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: '10%',
    },
    closeButton: {
      height: '5vh',
    },
    closeIcon: {},
    title: {
      flexGrow: 3,
      alignSelf: 'center',
    },
    listContainer: {
      flexGrow: 94,
      overflowY: 'scroll',
    },
    messageContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      marginTop: '5%',
      overflowX: 'hidden',
    },
    messageData: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0px',
    },
    messageBody: {
      margin: '0px',
    },
    h1: {
      margin: '0px',
      textAlign: 'center',
      color: '#ffffff',
    },
    h2: {
      margin: '0px',
    },
    p: {
      margin: '0px',
    },
  })
);

interface BotsBoxProps {
  closeBots: () => void;
}
interface Chat {
  username: string;
  body: string;
}

export default function BotsBox({ closeBots }: BotsBoxProps) {
  const { room } = useVideoContext();
  const localParticipant = room.localParticipant;

  const classes = useStyles();
  const messagesEndRef = useRef(document.createElement('div'));

  return (
    <div className={classes.container}>
      <div className={classes.topBar}>
        <Button onClick={closeBots} className={classes.closeButton}>
          <Close className={classes.closeIcon} />
        </Button>
        <h1 className={classes.h1}>Bots</h1>
      </div>

      <div className={classes.listContainer} ref={messagesEndRef}>
        <BotCard
          name={'codenames'}
          title="Codenames"
          icon="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcToIQcwpI9EpcnVf0qiTI5fg82GqY25rhSPcg&usqp=CAU"
        />
        <BotCard
          name={'drawize'}
          title="Drawize"
          icon="https://kevin.games/assets/cache_image/games/skribbl-io_200x200_98b.jpg"
        />
        <BotCard
          name={'jukebox'}
          title="Jukebox"
          icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAllBMVEUCynT9/v70/v0LvHPq/voawX2i8NPm/vjc/fNQ06BO1J8gunvU+u3h/vR82rVr1auD3brJ+umM48JEx5Ivv4QlwYIZvHm68tyj7NFb06O189vB+OSW4sX59/chwYDG9uQ1xYtx27JUyZpAwo184rtm3K2J3b2r9Nlw0aphzaGV3sFRxZY5y5Ebx4FDvIqi5Mx047i469VnxFh1AAAL5ElEQVR4nO1dC3ujKhOugNHWW7wbkyY2yXa33UvP9///3CegCKhpkhXOc/ow5znd1ijywswwMwyThwdDhgwZMmTIkCFDhgwZMmTIkCFDhgwZMmTIkCFDhgz9CwS95kkHNR5UCcNO17XvuoGjloLA9et1aquCAR8r19JGwK0elcwKzM++PhiE/HO+PBSYfkd4nADQA4K8B31Pl0YCjwdgcUBUw+naB4elkWSlrqmQAJXNojjsFehmWxwxFV1nv5D3gdWSygt+CywOiKbJoUiCaEHmyrZsrEBQr1/C3QEB63nxrj9bAB124cu6dDoo7Y84Ww5IyObCqY7tmguL048DWhxHq6YOP05F2753rFAPBESL4fDKnnXds9ddg3/q5RkM1Keej7wzW3xLb65jt9Ix6ICgZGgT/tkujQRs/wzy4CV0yoEV/FwKCOYs0ultzl2Fm0mD5S/QBRterplggnAhcbeTfnkKC/465jgOAJD/arUOcFr7ryXXdR0EAJi6bSCRhyCRTPx/spAGJosIJldcZuFa6lS/6pN/HL/chdFb2uS5lzdNuonCXek7YHw/u7AWm0+7GV9sKWFA4lz84Nuc4kJ+HbYuhQfh0LX298LLnsLKn2M+9E1sPo8XB2LNAHGm+gP8j6iZfTUsss0MFmcGiLU4EP8k9ink+tOzSVD/aD6VzSaquzHgEYEX8cFT7zYsBaTogADnTXhTseN7QczueHW0eW6y7X3e/Pr1q8n3Nt8baKdJjCQg1k7QJfDN6bTlUkC8HggQ39TEUkfcJO1vaCUif4peP7Z+6xi3rqvrlx/rKM2HBmCaCI4akI2RYgcWBsJYy/J/clPivYuy7lRMqcHs7VXQUJRQENfrY8buSitRyNA7p3/hkUnS8kBQPSy9RTSIbDt0oNx0gQ9oPyUHNO1Ktlfd8vzUd6w4tnbOcCPwIzZjrQnExml5IM9OmXYa1QtjbjhR51639l5OBHm0SAxIsAEdddMC87PL3efEIZmTljHT0mHWtQIgFojP6f633apQh2es7eND37FPrGKKDx36uALcbLlPkVNtMvv3Pj3HnJuwPBA6bIft1heYG1UNvXP/El9raoFttKcPNZUAHfnbbSzKjiIgo+F1z/RFhOOvJ1BvqETY1GKf9zvVAyHkUl8UZkm/yKHLeNjnKKH8BV8uB/5UARGHzqe2N3ysO5/uCo8erw/47j5uBSMBidyCjhkB/pF0pQjZqvF5DI+7wwntCSQSaQACYoqjd+csyXpygkNV7ZJdVR0CYX1kv7dOJ26huIREg7C7b+SOvBpPQrvyvUZps29tr/Y/e9+k0WvpTtxXEcPEvoBEPZBOzvPVqH9uFaWZbAXDLI3GAf0OCfxn0inQAqRzpvOaZyi8jLXW49y7W7NXhNI+WRE/h3nUmoEAB1RkHcjk+QjeT5c8Enh6l8YerDI6IDOKW/GMONsGf+pJ8sEZwbNQftYiFJCQIUnjfwfIkXTqLOwzgDi6JpzmRb0tQ3yOZ3QmJmc0bacpZq1EeDftF1o117UJG5EhEVEbNOhvWVJwTC2QA+HrXzG70I4tSkaaahZJ1i493NIZN/hq6msHQoYQequBGVoc6+Lz1hgVa8R1GK0wS/bxDC1A6Esq+l5eOlF4Cw5s1vAiQXU5jZNqAoL5OCCSnvLhA3AjDoyE77DfPGCZE7aUlM+IQyek4i7fxlddy2t+Toj28PDmsTbr95naio/cGg1W9+xieLzuctMH7PoGGoHQXjNliam+Wl/xBLO6bxJ0Md68lN+mUEbobtjR6VntGbhPdzb+5ILnfjjoEhuO/Bl1MuLjNaSoBo3f2Rh3UJFwCpcYb+koU0Qda62GF9LhO5w+bWWOTgeL7f+QKHlRjV6nCgja4MtnwJxW8GNWQGCxz7LMLuZv+DHkhoAzvrKRLS5lQA44IpVv+/kA8/uuXhp+bGP/UH6E6VwqmVdSqwT/IJuUucxbyqIoyQOOMQdWbxeh6Z1w6EW1C/rxdutoBkpEzQP8w8UhGfihCQjhrILz58p86jF4lLwOpz5OIhkULiBKA0Za1hFAbQlvO6SmhFNPeS/jPDX/ZVK5DYkVYIuZNHXFJVEREPDdJi9j9iIBNsKRTEVFXJpxIE1M47O2yepufwcagHQeVYSYbqknRL04T0R+cIzoPDEnXr+8W4iIG5TCEIqA9O9i/LAecz6MXCbADARFMpG1NGzYAzJKMBQVsCLWcrEhYQ+Bd3dChNO46xf/IP2DuoIikCNjQ1Bj1X4U2VLRjMR4+c0HF3cinwrydoc4JR1nipRJrZ1i4UFFQLb4VekwZtX4NSfOehHmBF+Z0A32YJUEWNqzrfCcIiBEtjkz4n30gJBJMCI0kezzPoDFEjhIv0ogxER9Gf4eryJSP+R5mTBoQrE5yW5UBCQR30wtSIFOs3kzBIg/NpU3gw2AgcBEB5A1vvbK/gzGLtVmlCogAHHeRk88DSJHDOCzLiDckJG1WKSZyGdPEzYmpzvoQqJjZZfm3h8BuSzr1lRqH+cVEu0cCg8YIDcBUcFaD2sdQIiwD2+6Q9jHeo4TdtK8Fq31Ks69CvWrBwhZEDknbtkFkazsehZEtSYKmWAtJgpQazS6+oxGom9lw1uk/4YZH0j26a2O1Vhdc46VVWMJfNPiWCGstji3+r/q6lo0TyAaNt0WDD4AslgWUgqCqrjWFrvV6dDRBcNBiMi6J8q6MiA09jREH24J0E0GibkAHQlapo6OAB2efszH54GPZ0OmUobz5yFTROStBaYDiAVW+G1E0ywexMZQ7UrPrm53/IIwcteDZbcVGl8XEGJGEB3ZZ8Z8ttGzv7DRE3EbPcR6ifQlZ9K9vpgN5F9uvbFmSBTS+y6/Th0QYojTNfFvN0PbVp57CaGtpCO9rXCfnSjcbs9que1pElWm6lCL1rI6ocTXGTvfnTDAJaCRDjfj9HqFQOiR5nSBFI5+qQGdBV+E42RThUAQsa9s3iO9J6mmEJJqzjTPaWyjqUw8Q+SEWsP7Dbema8kJW0RlyYavSiB0xGgmYMTzwd8lnlHzoBsajRl01NGTUgFvQoJxyKmA3k5jKqBFVQwNzDXLJGcC69Dgi9g11JmcSQ5/kOalVN2702UdogaxHQx0AqFoiLy369cz/+pbE5jpfNAQkTeTHa8aCA1ft36pOLZ3p5T3jr5mIG33SYRLzEvEFLxfhALTUZI/dYBTMQikbUZwB8gb8opn6nuOXZCDfNnsmTn1B2EQjYlk1ehcVVBFY08KemlUBdJgALQinrI3SpzTCIQd6akkLxv30K37o0kP/dGk2pVVUvvcjgZWZo/B6Dn11h0T9nYXDosl84fFgOWsCQ7v7MgP6wXSz8l9x/cA8GloHqex6Z8RsaP9wdBHLKvP6KoDlX0j/YFK74xGn2kAIpH70h1x3V17xLX/2KVshS22i0/oO3T8m9xXbMqrJqMjVpetqYGATxcQcgxctLCqrvDGPrz6GDjaRrR78FF0pbQcA6cH8/Pf+9HB/A2rGBBfU67KKaMuzOqF/Pqo62D+fKkEl1UMyKL+GPUUkTCcW226u4tUOJWvrVTCxeIVESte8XipeEVQh739Ar3Q59cOfcUrfD6cLpcTQUI5kffSHaUNANcv16nHanBspHC96nIitxR4YUChnT++vNcHXPp0KPCyZ1WRcHU2QaSBnLe5fIGXW0ruJBdK7nAPQ3tT+SNRUl1yZ/EiSHYa1gEQHiO/S5kEixdBurksVRU1s9sIsMBn2idVmoayVGAGyMVCYZlX8IXCWkYrsmaz/t+MP6ulUFj36mtLtxHLiZVua/jSbUKFWqkuj7xhv3zpttuL6XV18wBysMLC1fSCyWJ6IqkupgcXLW84FnJGqssbfp2Ck1+mBOhUUdZIUVHWaFyUdTKx4j7SXyaXBo0WL5MrnTJXXLiY087WwoWLv0wpabK1p3Ya5mAtXNz765Rb/zIF8B++zFcSYChf40siMNnpuiTVlB3kIErkezbQMtQ1pfxrOzDRL1J5VEvqv0jFkCFDhgwZMmTIkCFDhgwZMmTIkCFDhgwZMmTIkCFDM/R/hI7Up2yz2cwAAAAASUVORK5CYII="
        />
        <p style={{ textAlign: 'center' }}>More bots coming soon!</p>
      </div>
    </div>
  );
}
