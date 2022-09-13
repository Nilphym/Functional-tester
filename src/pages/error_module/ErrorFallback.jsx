import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as BugSvg } from '../../assets/bug_fixing.svg';
import { Container, MessageBox, ResetButton } from '../../components/error_module';

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  // eslint-disable-next-line no-console
  console.error(error);

  return (
    <Container BackgroundIcon={<BugSvg style={{ height: '100%' }} />}>
      <MessageBox
        title="Something went wrong..."
        content="Go to home page and try again. If the problem persists, please contact us."
      />
      <ResetButton onClick={resetErrorBoundary} />
    </Container>
  );
};

export default ErrorFallback;

ErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string
  }).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired
};
