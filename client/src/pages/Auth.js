import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useTheme, createUseStyles } from 'react-jss';
import {
  ajaxBuildNewMember,
  ajaxGetClientInfo,
  ajaxSignIn,
  ajaxSignUp
} from '../shared/service';

const SignIn = props => {
  const theme = useTheme();
  const css = useStyles(theme);
  const [authStatus, setAuthStatus] = useState('signIn');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authHandler = async e => {
    e.preventDefault();
    try {
      const authData = { email, password };
      let authResponse = null;

      if (authStatus === 'signUp') {
        authResponse = await ajaxSignUp(authData);
        const memberData = {
          userName,
          id: authResponse.data.localId
        };
        const res = await ajaxBuildNewMember(memberData);
        localStorage.setItem('chat-formName', res.data.name);
        alert('註冊成功');
        setAuthStatus('sighIn');
      } else {
        authResponse = await ajaxSignIn(authData);
        console.log(authResponse);
        localStorage.setItem(
          'chat-client-info',
          JSON.stringify(authResponse.data)
        );
        alert('登入成功');
      }
      setEmail('');
      setPassword('');
      setUserName('');
    } catch (error) {
      console.log(error.response);
      if (authStatus === 'signUp') {
        alert('註冊未完成');
      } else {
        alert('登入失敗');
      }
    }
  };

  const getClientInfo = async e => {
    e.preventDefault();
    try {
      const id = JSON.parse(localStorage.getItem('chat-client-info')).localId;
      const formName = localStorage.getItem('chat-formName');
      const res = await ajaxGetClientInfo(id, formName);
      console.log(res.data);
      alert(`welcome ${res.data.userName}`);
    } catch (error) {
      console.log(error);
    }
  };

  const logOutHandler = e => {
    e.preventDefault();
    localStorage.removeItem('chat-client-info');
    localStorage.removeItem('chat-formName');
    alert('登出成功');
  };

  const switchAuthStatus = status => {
    setAuthStatus(status);
    alert(`now is ${status}`);
  };

  useEffect(() => {
    if (localStorage.getItem('pokemonChat')) {
      props.history.push('/');
    }
  }, []);

  return (
    <div className={css['signin']}>
      <div onClick={() => switchAuthStatus('signIn')}>去登入</div>
      <div onClick={() => switchAuthStatus('signUp')}>去註冊</div>
      <form className={css['wrap']}>
        <div>
          <label>電子信箱</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>密碼</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {authStatus === 'signUp' && (
          <div>
            <label>姓名</label>
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </div>
        )}
        <div>
          <button onClick={authHandler}>
            {authStatus === 'signUp' ? '註冊' : '登入'}
          </button>
        </div>
        <div>
          <button onClick={getClientInfo}>取得客戶資料</button>
        </div>
        <div>
          <button onClick={logOutHandler}>登出</button>
        </div>
      </form>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  signin: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrap: {
    textAlign: 'left',
    width: '90%',
    maxWidth: '500px'
  },
  title: {
    color: '#fff',
    fontSize: '40px',
    marginBottom: '20px'
  },
  name: {
    borderBottom: '2px solid #fff',
    width: '100%',
    fontSize: '30px',
    color: theme.color.primary,
    padding: '5px 10px'
  }
}));

export default withRouter(SignIn);
