import React from 'react';

import { ReactComponent as NotFoundSvg } from '../../assets/no_data.svg';
import { Container, MessageBox, ResetButton } from '../../components/error_module';

export const NotFound = () => {
  return (
    <Container BackgroundIcon={<NotFoundSvg style={{ height: '70%' }} />}>
      <MessageBox
        title="Page not found..."
        content="The page is missing or you misspelled the link. If you think that isn't the case,
          please contact us."
      />
      <ResetButton />
    </Container>
  );
};

export default NotFound;
