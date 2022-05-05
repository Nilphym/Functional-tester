import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const Container = styled(Box)({
  minHeight: '100vh',
  padding: '1rem 0',
  margin: '0 auto',
  width: '20rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem'
});
