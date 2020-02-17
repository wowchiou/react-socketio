import React from 'react';
import { useTheme, createUseStyles } from 'react-jss';

// import SignIn from './pages/SignIn';
import Board from './pages/Board';

const App = () => {
  const theme = useTheme();
  const css = useStyles(theme);

  return (
    <div className={css['app']}>
      {/* <SignIn /> */}
      <Board />
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  app: {
    width: '100%',
    height: '100vh',
    boxSizing: 'border-box',
    backgroundColor: theme.color.background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default App;
