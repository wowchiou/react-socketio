import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import webSocket from 'socket.io-client';
import MemberController from '../components/MemberController/MemberController';
import * as actions from '../store/actions';
import { ajaxGetClientInfo } from '../shared/service';

const mapStateToProps = state => {
  console.log(state);
  return {
    loading: state.chat.loading,
    error: state.chat.error,
    isLogin: state.auth.isLogin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => {
      dispatch(actions.onLogOut());
    }
  };
};

const Board = props => {
  const { loading, error, isLogin, onLogOut } = props;
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

  const getClientInfo = async () => {
    try {
      const clientInfo = JSON.parse(localStorage.getItem('chat-client-info'));
      const userId = clientInfo.localId;
      const res = await ajaxGetClientInfo(userId);
      const formateRes = Object.keys(res.data)
        .map(itm => {
          return { formId: itm, info: res.data[itm] };
        })
        .reduce((obj, itm) => {
          return { ...obj, ...itm };
        }, {});
      console.log(formateRes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (socket) {
      console.log('connect successed');
      // 監聽 socket 事件
      initWebSocket();
    } else {
      // 重新連結 socket
      setSocket(webSocket('http://localhost:9000'));
    }
  }, [socket]);

  useEffect(() => {
    console.log(isLogin);
    !isLogin && props.history.push('/auth');
  }, [isLogin]);

  return (
    <div className={css['board']}>
      <div className={css['member_controller']}>
        {memberList && <MemberController memberList={memberList} />}
      </div>
      <div className={css['message_controller']}>
        <div>
          <button onClick={getClientInfo}>取得客戶資料</button>
        </div>
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
  member_controller: {
    width: '320px',
    height: '100%'
  },
  message_controller: {
    flex: 1,
    height: '100%'
  }
}));

export default connect(mapStateToProps, mapDispatchToProps)(Board);
