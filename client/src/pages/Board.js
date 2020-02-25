import React, { useState, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import webSocket from 'socket.io-client';
import * as actions from '../store/actions';

const mapStateToProps = state => {
  return {
    loading: state.chat.loading,
    error: state.chat.error,
    userInfo: { ...state.chat.userInfo },
    userFriends: state.chat.friends,
    member: state.chat.member,
    isLogin: state.auth.isLogin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => {
      dispatch(actions.onLogOut());
    },
    getClientInfo: () => {
      dispatch(actions.getClientInfo());
    }
  };
};

const Board = props => {
  const {
    loading,
    error,
    userInfo,
    userFriends,
    member,
    isLogin,
    onLogOut,
    getClientInfo
  } = props;
  const css = useStyles();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!isLogin) {
      props.history.push('/auth');
    } else {
      getClientInfo();
    }
  }, [isLogin]);

  const initWebSocket = useCallback(() => {
    socket.emit('start', {
      userName: userInfo.userName,
      avatar: userInfo.avatar,
      member: member
    });
  }, [userInfo, member]);

  useEffect(() => {
    if (socket) {
      console.log('connect socket server successed');
      // 監聽 socket 事件
      initWebSocket();
    } else {
      // 重新連結 socket
      setSocket(webSocket('http://localhost:9000'));
    }
  }, [socket, initWebSocket]);

  return (
    <div className={css['board']}>
      <div className={css['left_side']}>
        <div className="user">
          <div className="user_name">{userInfo.userName}</div>
          <div className="user_avatar">{userInfo.avatar}</div>
          <div className="user_friends">{userFriends}</div>
        </div>
      </div>
      <div className={css['right_side']}>
        <div>
          <button onClick={onLogOut}>登出</button>
        </div>
      </div>
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
  left_side: {
    width: '320px',
    height: '100%'
  },
  right_side: {
    flex: 1,
    height: '100%'
  }
}));

export default connect(mapStateToProps, mapDispatchToProps)(Board);
