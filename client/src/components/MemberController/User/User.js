import React from 'react';
import { createUseStyles } from 'react-jss';

const User = () => {
  const css = useStyles();
  const clientData = JSON.parse(localStorage.getItem('pokemonChat'));

  return (
    <div className={css['user']}>
      <div className={css['avatar']}>
        <img src={clientData.avatar} />
      </div>
      <div className={css['name']}>
        <span>{clientData.userName}</span>
      </div>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  user: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '5px 10px'
  },
  avatar: {
    width: '50px',
    '& img': {
      width: '100%'
    }
  }
}));

export default User;
