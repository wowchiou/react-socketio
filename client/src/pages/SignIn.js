import React from 'react';
import { useTheme, createUseStyles } from 'react-jss';

const SignIn = () => {
  const theme = useTheme();
  const css = useStyles(theme);

  return (
    <div className={css['signin']}>
      <form className={css['wrap']}>
        <div className={css['title']}>你的名字?</div>
        <input
          type="text"
          name="name"
          className={css['name']}
          placeholder="請輸入你的名字"
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

export default SignIn;
