import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, Menu, MenuItem, Button } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

const NavMultiLink = ({ name, icon, links, compact }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const regex = new RegExp(name.toLowerCase());
  const active = regex.test(pathname);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLinkClick = (destination) => {
    setAnchorEl(null);
    navigate(destination);
  };

  return (
    <>
      <Button
        sx={{
          width: '100%',
          padding: '1rem 2rem',
          display: 'flex',
          color: 'primary.dark',
          textAlign: 'left',
          textTransform: 'none',
          ...(compact && {
            padding: '1.5rem 0'
          }),
          ...(!active && {
            '&:hover': {
              backgroundColor: grey[50]
            }
          }),
          ...(active && {
            backgroundColor: blue[50],
            '&:hover': {
              backgroundColor: blue[50]
            }
          })
        }}
        onClick={handleOpen}
      >
        {icon}
        {!compact && <Typography sx={{ width: '100%', paddingLeft: '1rem' }}>{name}</Typography>}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {links.map(({ text, destination }) => (
          <MenuItem key={text} onClick={() => handleLinkClick(destination)}>
            {text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NavMultiLink;

NavMultiLink.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  links: PropTypes.array.isRequired,
  compact: PropTypes.bool
};

NavMultiLink.defaultProps = {
  compact: false
};
