import React from 'react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';

import theme from '../src/utils/theme';
import store from '../src/redux/store';
import { MockServer } from '../src/providers';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <Provider store={store}>
        <MockServer>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Story />
            </ThemeProvider>
          </LocalizationProvider>
        </MockServer>
      </Provider>
    </MemoryRouter>
  )
];
