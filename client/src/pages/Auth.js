import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useTheme, createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isLogin: state.auth.isLogin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: data => {
      dispatch(actions.onAuth(data));
    }
  };
};

const SignIn = props => {
  const { loading, error, isLogin, onAuth } = props;
  const theme = useTheme();
  const css = useStyles(theme);
  const [authStatus, setAuthStatus] = useState('signIn');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authHandler = async e => {
    e.preventDefault();
    const authData = { email, password, authStatus };
    if (authStatus === 'signUp') {
      authData.userName = userName;
    }
    await onAuth(authData);
    resetFormValue();
    console.log('jump');
    props.history.push('/');
  };

  const resetFormValue = () => {
    setEmail('');
    setPassword('');
    setUserName('');
  };

  const switchAuthStatus = status => {
    setAuthStatus(status);
  };

  useEffect(() => {
    isLogin && props.history.push('/');
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
        {loading && <div>loading...</div>}
      </form>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  signin: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
