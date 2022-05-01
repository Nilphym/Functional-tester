import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/system';
import { render, screen, fireEvent, act } from '@testing-library/react';
import store from '../../redux/store';

import Navbar from '../Navbar/Navbar';
import theme from '../../utils/theme';

describe('Navbar component', () => {
  beforeEach(() => {
    const links = [
      { icon: 'dashboard', text: 'Dashboard', destination: 'dashboard' },
      { icon: 'tests', text: 'Tests', destination: 'tests' },
      { icon: 'logout', text: 'Logout', destination: 'logout' }
    ];

    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Navbar links={links} />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
  });

  it('should render correctly', () => {
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('should render with proper text', () => {
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should highlight clicked destination', async () => {
    const firstNavigationLink = screen.getByRole('navigation').querySelector('a');
    await act(async () => {
      fireEvent.click(firstNavigationLink);
    });
    expect(firstNavigationLink.getAttribute('active')).toEqual('active');
  });
});
