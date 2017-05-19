import React from 'react';
import { render } from 'react-dom';
import App from './components/App';



// webpack uses this to bundle styles
// import styles from './scss/application.scss';

render(
  <App />,
  document.getElementById('root')
);
