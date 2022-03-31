import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';
import { ErrorBoundary } from 'react-error-boundary';

import store from './redux/store';
import App from './App';
import theme from './utils/theme';
import { AuthManager, MockServer } from './providers';
import { ErrorFallback } from './pages';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MockServer>
          <AuthManager>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <App />
                </ErrorBoundary>
              </ThemeProvider>
            </LocalizationProvider>
          </AuthManager>
        </MockServer>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
