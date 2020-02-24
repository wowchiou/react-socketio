import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import webSocket from 'socket.io-client';
import MemberController from '../components/MemberController/MemberController';
import * as actions from '../store/actions';

const mapStateToProps = state => {
  return {
    loading: state.chat.loading,
    error: state.chat.error,
    userName: state.chat.userName,
    userAvatar: state.chat.avatar,
    userFriends: state.chat.friends,
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
    userName,
    userAvatar,
    userFriends,
    isLogin,
    onLogOut,
    getClientInfo
  } = props;
  const css = useStyles();
  const [socket, setSocket] = useState(null);

  // const getClientInfo = async () => {
  //   try {
  //     const clientInfo = JSON.parse(localStorage.getItem('chat-pokemon-info'));
  //     const userId = clientInfo.localId;
  //     const res = await ajaxGetClientInfo(userId);
  //     const formateRes = Object.keys(res.data)
  //       .map(itm => {
  //         return { formId: itm, info: res.data[itm] };
  //       })
  //       .reduce((obj, itm) => {
  //         return { ...obj, ...itm };
  //       }, {});
  //     console.log(formateRes);
  //     setInfo(formateRes);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (!isLogin) {
      props.history.push('/auth');
    } else {
      getClientInfo();
    }
  }, [isLogin]);

  // const initWebSocket = () => {
  //   const clientInfo = JSON.parse(localStorage.getItem('chat-client-info'));
  //   socket.emit('login', clientInfo);

  //   socket.on('set members in room', members => {
  //     setMemberList(members);
  //   });

  //   socket.on('close socket', () => {
  //     localStorage.removeItem('chat-client-info');
  //     socket.close();
  //   });
  // };

  // useEffect(() => {
  //   if (socket) {
  //     console.log('connect successed');
  //     // 監聽 socket 事件
  //     initWebSocket();
  //   } else {
  //     // 重新連結 socket
  //     setSocket(webSocket('http://localhost:9000'));
  //   }
  // }, [socket]);

  return (
    <div className={css['board']}>
      <div className={css['left_side']}>
        <div className="user">
          <div className="user_name">{userName}</div>
          <div className="user_avatar">{userAvatar}</div>
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
