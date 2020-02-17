import React from 'react';
import { createUseStyles } from 'react-jss';
import MemberController from '../components/MemberController/MemberController';

const Board = () => {
  const css = useStyles();

  return (
    <div className={css['board']}>
      <div className={css['member_controller']}>
        <MemberController />
      </div>
      <div className={css['message_controller']}>聊天內容</div>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  board: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%'
  },
  member_controller: {
    width: '320px',
    height: '100%'
  },
  message_controller: {
    flex: 1,
    height: '100%'
  }
}));

export default Board;
