import React from 'react';
import ReactDOM from 'react-dom';
import { Metric } from 'web-vitals';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

function sendToAnalytics({ id, name, value, delta }: Metric) {
  console.log({ id, name, value, delta });
  const body = JSON.stringify({ id, name, value, delta });
  const url = process.env.REACT_APP_ANALYTICS_URL!;

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  if (navigator.sendBeacon) {
    console.log('sendBeacon');
    navigator.sendBeacon(url, body);
  } else {
    console.log('fetch');
    fetch(url, { body, method: 'POST', keepalive: true });
  }
}

reportWebVitals(sendToAnalytics);
