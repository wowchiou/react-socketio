import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import useEmotionTheme from 'hooks/useEmotionTheme';
import 'assets/sass/common.scss';
import App from 'App';

const theme = useEmotionTheme();
const app = (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

ReactDOM.render(app, document.getElementById('root'));
