import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import {
  CircularProgress,
  Collapse,
  TableRow,
  TableCell,
  Table,
  TableBody,
  IconButton,
  TableContainer,
  Button,
  Paper,
  Box
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getTestPlan } from '../../redux/store';

const CategoryRow = ({ categoryName, tests }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const goToTestExecution = (id) => {
    navigate(`/test_execution/test/${id}`);
  };

  return (
    <>
      <TableRow>
        <TableCell sx={{ width: 0 }}>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>{categoryName}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" sx={{ backgroundColor: 'action.hover' }}>
              <TableBody>
                {tests.map(({ id, name }) => (
                  <TableRow key={id}>
                    <TableCell sx={{ paddingLeft: '2.2rem' }}>{name}</TableCell>
                    <TableCell sx={{ width: 0, paddingRight: '2.2rem' }}>
                      <Button variant="contained" onClick={() => goToTestExecution(id)}>
                        Execute
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

CategoryRow.propTypes = {
  categoryName: PropTypes.string.isRequired,
  tests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export const TestPlan = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { testPlan, loadingTestPlan: loading } = useSelector((state) => state.tests);

  useEffect(() => {
    dispatch(getTestPlan({ id }));
  }, []);

  return loading ? (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  ) : (
    <TableContainer sx={{ height: '100%' }} component={Paper} elevation={2}>
      <Table>
        <TableBody>
          {testPlan.testCategories.map(({ id, name, tests }) => (
            <CategoryRow key={id} categoryName={name} tests={tests} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TestPlan;
