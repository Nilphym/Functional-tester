import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '@mui/material';

import ButtonTableCell from './ButtonTableCell';

const EnhancedTableCell = ({
  id,
  content,
  headCell: { button, isHeading, width, alignCenter, onClick }
}) =>
  button ? (
    <ButtonTableCell icon={button} onClick={onClick} id={id} />
  ) : (
    <TableCell
      sx={{ width }}
      align={alignCenter ? 'center' : 'left'}
      component={isHeading ? 'th' : undefined}
      scope={isHeading ? 'row' : undefined}
    >
      {content}
    </TableCell>
  );

export default EnhancedTableCell;

EnhancedTableCell.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.any,
  headCell: PropTypes.shape({
    button: PropTypes.string,
    isHeading: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    alignCenter: PropTypes.bool,
    onClick: PropTypes.func
  }).isRequired
};

EnhancedTableCell.defaultProps = {
  content: null
};
