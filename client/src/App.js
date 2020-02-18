import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useTheme, createUseStyles } from 'react-jss';

import SignIn from './pages/SignIn';
import Board from './pages/Board';

const App = () => {
  const theme = useTheme();
  const css = useStyles(theme);

  return (
    <div className={css['app']}>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/" exact component={Board} />
        <Redirect to="/" />
      </Switch>
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
