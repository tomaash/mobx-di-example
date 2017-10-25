import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppTopWrapper} from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <AppTopWrapper />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
