import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useTheme, createUseStyles } from 'react-jss';

const SignIn = props => {
  const theme = useTheme();
  const css = useStyles(theme);
  const [userName, setUserName] = useState('');

  const logInHandler = e => {
    e.preventDefault();
    localStorage.setItem(
      'pokemonChat',
      JSON.stringify({
        userName,
        avatar: 'https://pkq.herokuapp.com/static/Icon/25.png',
        id: Date.now()
      })
    );
    props.history.push('/');
  };

  useEffect(() => {
    if (localStorage.getItem('pokemonChat')) {
      props.history.push('/');
    }
  }, []);

  return (
    <div className={css['signin']}>
      <form className={css['wrap']} onSubmit={logInHandler}>
        <div className={css['title']}>你的名字?</div>
        <input
          type="text"
          name="name"
          className={css['name']}
          placeholder="請輸入你的名字"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
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
