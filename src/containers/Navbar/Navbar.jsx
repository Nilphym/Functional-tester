import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, IconButton, Slide, Fade, useMediaQuery, Paper, Divider } from '@mui/material';
import {
  Login,
  FormatListBulleted,
  BugReport,
  BarChart,
  MenuOpen,
  Menu as MenuIcon,
  Person,
  Info
} from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { styled, useTheme } from '@mui/system';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router';

import { NavProfile } from './NavProfile';
import { NavLink } from './NavLink';
import { NavMultiLink } from './NavMultiLink';
import logo from '../../assets/logo/logo2.png';
import logoIcon from '../../assets/logo/icon.png';

const icons = {
  dashboard: <BarChart />,
  bugs: <BugReport />,
  tests: <FormatListBulleted />,
  logout: <Login />,
  profile: <Person />,
  addUser: <AddReactionIcon />,
  deleteUser: <DeleteOutlineIcon />,
  info: <Info />
};

const Logo = styled('img')({
  width: '8rem',
  cursor: 'pointer'
});

const SmallLogo = styled('img')({
  width: '2rem',
  margin: '2.7rem 0',
  cursor: 'pointer'
});

export const Navbar = ({ links }) => {
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();
  const { name, surname, projectName, role } = useSelector((state) => state.auth.token) ?? {
    name: '',
    surname: '',
    role: '',
    projectName: ''
  };
  const theme = useTheme();
  const largeMedia = useMediaQuery(theme.breakpoints.up('lg'));
  const navigate = useNavigate();

  const toggleOpen = () => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    if (largeMedia && !open) toggleOpen();
  }, [largeMedia]);

  return (
    <>
      <NavProfile compact name={`${name} ${surname}`} projectName={projectName} role={role} />
      <Slide direction="right" in={open} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            height: '100vh',
            minWidth: '15rem',
            maxWidth: '15rem',
            display: 'grid',
            gridTemplateRows: '7rem 1fr 7rem',
            borderRight: `2px solid ${grey[100]}`,
            backgroundColor: 'white',
            position: largeMedia ? 'sticky' : 'fixed',
            top: 0,
            zIndex: 3
          }}
          elevation={1}
          component={Box}
          data-testid="navbar"
        >
          <Box
            sx={{
              margin: '0 1rem 0 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Logo src={logo} alt="logo" onClick={() => navigate('/dashboard')} />
            {!largeMedia && (
              <IconButton onClick={toggleOpen}>
                <MenuOpen sx={{ color: 'primary.dark' }} />
              </IconButton>
            )}
          </Box>
          <Box sx={{ alignSelf: 'center' }} role="navigation">
            {links.map((link) =>
              link.name ? (
                <NavMultiLink
                  key={link.name}
                  name={link.name}
                  icon={icons[link.icon]}
                  links={link.links}
                />
              ) : (
                <NavLink
                  key={link.destination}
                  pathname={pathname}
                  icon={icons[link.icon]}
                  text={link.text}
                  destination={link.destination}
                />
              )
            )}
            <NavLink
              icon={icons.info}
              pathname="aerg"
              text="Instructions"
              destination="./instructions.pdf"
            />
          </Box>
        </Paper>
      </Slide>
      <Paper
        sx={{
          height: '100vh',
          minWidth: '4rem',
          maxWidth: '4rem',
          display: largeMedia ? 'none' : 'flex',
          opacity: open ? 0 : '100%',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 2
        }}
        elevation={1}
        component={Box}
      >
        <SmallLogo src={logoIcon} alt="logo" onClick={() => navigate('/dashboard')} />
        <Divider sx={{ alignSelf: 'stretch' }} variant="middle" />
        <IconButton sx={{ margin: '1rem 0' }} onClick={toggleOpen}>
          <MenuIcon sx={{ color: 'primary.dark' }} />
        </IconButton>
        <Divider sx={{ alignSelf: 'stretch' }} variant="middle" />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {links.map((link) =>
            link.name ? (
              <NavMultiLink
                key={link.name}
                name={link.name}
                icon={icons[link.icon]}
                links={link.links}
                compact
              />
            ) : (
              <NavLink
                key={link.destination}
                icon={icons[link.icon]}
                pathname={pathname}
                text={link.text}
                destination={link.destination}
                compact
              />
            )
          )}
          <NavLink
            icon={icons.info}
            pathname="fweg"
            text="Instructions"
            destination="./instructions.pdf"
            compact
          />
        </Box>
        <Divider sx={{ alignSelf: 'stretch' }} variant="middle" />
      </Paper>
      <Fade in={!largeMedia && open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0,0,0,0.2)',
            top: 0,
            zIndex: 1
          }}
          onClick={toggleOpen}
        />
      </Fade>
    </>
  );
};

Navbar.propTypes = {
  links: PropTypes.array.isRequired
};
