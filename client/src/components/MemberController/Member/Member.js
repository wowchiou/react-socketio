import React from 'react';
import { createUseStyles } from 'react-jss';

const Member = props => {
  const { avatar, userName, message, time } = props;
  const css = useStyle();

  return (
    <li className={css['member']}>
      <div className={css['avatar']}>
        <img src={avatar} />
      </div>
      <div className={css['content']}>
        <div className={css['name']}>
          <span>{userName}</span>
        </div>
        <div className={css['text']}>{message}</div>
      </div>
      <div className={css['info']}>
        <span>waiting...</span>
        <span className={css['time']}>{time}</span>
      </div>
    </li>
  );
};

const useStyle = createUseStyles(theme => ({
  member: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: '10px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.3)'
    }
  },
  content: {
    flex: 1,
    padding: '0 10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    '& div': {
      display: 'block',
      width: '100%'
    }
  },
  avatar: {
    width: '43px',
    '& img': {
      width: '100%'
    }
  },
  name: {
    fontSize: '18px',
    marginBottom: '2px',
    '& span': {
      display: 'block'
    }
  },
  info: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    '& span': {
      display: 'block',
      fontSize: '14px',
      color: 'rgba(0,0,0,.5)'
    }
  }
}));

export default Member;
