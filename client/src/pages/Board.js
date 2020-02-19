import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import webSocket from 'socket.io-client';
import MemberController from '../components/MemberController/MemberController';

const Board = props => {
  const css = useStyles();
  const [socket, setSocket] = useState(null);
  const [memberList, setMemberList] = useState(null);

  const initWebSocket = () => {
    const clientInfo = JSON.parse(localStorage.getItem('chat-client-info'));
    socket.emit('login', clientInfo);

    socket.on('set members in room', members => {
      setMemberList(members);
    });

    socket.on('close socket', () => {
      localStorage.removeItem('chat-client-info');
      socket.close();
    });
  };

  useEffect(() => {
    if (!localStorage.getItem('chat-client-info')) {
      props.history.push('/auth');
    } else {
      if (socket) {
        // 連結上 socket 後監聽 socket event
        console.log('connect successed');
        initWebSocket();
      } else {
        // 尚未連結成功則重新連結 socket
        setSocket(webSocket('http://localhost:9000'));
      }
    }
  }, [socket]);

  return (
    <div className={css['board']}>
      <div className={css['member_controller']}>
        {memberList && <MemberController memberList={memberList} />}
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
