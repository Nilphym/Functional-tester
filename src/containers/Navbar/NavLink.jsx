import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { styled } from '@mui/system';

const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active' || prop !== 'compact'
})(({ active, compact, theme }) => ({
  padding: '1rem 2rem',
  display: 'flex',
  color: theme.palette.primary.dark,
  textDecoration: 'none',
  ...(compact && {
    padding: '1.5rem 0',
    justifyContent: 'center'
  }),
  ...(!active && {
    '&:hover': {
      backgroundColor: grey[50]
    }
  }),
  ...(active && {
    backgroundColor: blue[50]
  })
}));

const StyledLinkX = styled('a', {
  shouldForwardProp: (prop) => prop !== 'active' || prop !== 'compact'
})(({ active, compact, theme }) => ({
  padding: '1rem 2rem',
  display: 'flex',
  color: theme.palette.primary.dark,
  textDecoration: 'none',
  ...(compact && {
    padding: '1.5rem 0',
    justifyContent: 'center'
  }),
  ...(!active && {
    '&:hover': {
      backgroundColor: grey[50]
    }
  }),
  ...(active && {
    backgroundColor: blue[50]
  })
}));

export const NavLink = ({ pathname, icon, text, destination, compact }) => {
  const regex = new RegExp(destination);
  if (text === 'Instructions') {
    return (
      <StyledLinkX
        compact={compact ? 'compact' : null}
        active={null}
        href={destination}
        target="_blank"
        rel="noreferrer"
      >
        {icon}
        {!compact && <Typography sx={{ paddingLeft: '1rem' }}>{text}</Typography>}
      </StyledLinkX>
    );
  }

  return (
    <StyledLink
      compact={compact ? 'compact' : null}
      active={regex.test(pathname) ? 'active' : null}
      to={destination}
    >
      {icon}
      {!compact && <Typography sx={{ paddingLeft: '1rem' }}>{text}</Typography>}
    </StyledLink>
  );
};

NavLink.propTypes = {
  pathname: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  compact: PropTypes.bool
};

NavLink.defaultProps = {
  compact: false
};
