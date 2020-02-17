import React from 'react';
import { createUseStyles } from 'react-jss';

const User = () => {
  const css = useStyles();

  return (
    <div className={css['user']}>
      <div className={css['avatar']}>
        <img src="https://pkq.herokuapp.com/static/Icon/25.png" />
      </div>
      <div className={css['name']}>
        <span>皮卡丘</span>
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
