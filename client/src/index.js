import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import useEmotionTheme from 'hooks/useEmotionTheme';
import 'assets/sass/common.scss';
import App from 'App';

const theme = useEmotionTheme();
const app = (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);

ReactDOM.render(app, document.getElementById('root'));
