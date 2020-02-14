import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

import SignIn from './pages/SignIn';
import Board from 'pages/Board';

const App = () => {
  const theme = useTheme();
  const styled = styles();

  return (
    <div className={styled['App'](theme)}>
      {/* <SignIn /> */}
      <Board />
    </div>
  );
};

// css

function styles() {
  return {
    App: theme => css`
      width: 100%;
      height: 100vh;
      box-sizing: border-box;
      background-color: ${theme.color.background};
      display: flex;
      justify-content: center;
      align-items: center;
    `
  };
}

export default App;
