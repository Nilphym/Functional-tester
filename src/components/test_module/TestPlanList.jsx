import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Button,
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  Paper,
  InputBase
} from '@mui/material';

import { getTestPlans } from '../../redux/store';

export const TestPlanList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { testPlans, loadingTestPlans: loading } = useSelector((state) => state.tests);
  const filterRef = useRef();
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    dispatch(getTestPlans());
  }, []);

  const goToTestPlan = (id, name) => {
    navigate(`/test_plans/${id}/${name}`);
  };

  const focusOnInput = () => {
    filterRef.current.focus();
  };

  return loading ? (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  ) : (
    <Box sx={{ display: 'grid', gridTemplateRows: 'min-content 1fr' }}>
      <Box sx={{ margin: '0 2rem 2rem' }}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ padding: '2px 4px', display: 'flex', alignItems: 'center', width: '25rem' }}
        >
          <Search
            onClick={focusOnInput}
            color="action"
            sx={{ fontSize: '2.75rem', padding: '0.625rem' }}
          />
          <InputBase
            value={filterValue}
            inputRef={filterRef}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search by name..."
            onChange={(evt) => {
              setFilterValue(evt.target.value);
            }}
          />
        </Paper>
      </Box>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableBody>
            {testPlans
              .filter(({ name }) => name.toLowerCase().includes(filterValue.toLowerCase()))
              .map(({ id, name }) => (
                <TableRow key={id}>
                  <TableCell sx={{ paddingLeft: '2.2rem' }}>{name}</TableCell>
                  <TableCell sx={{ width: 0, paddingRight: '2.2rem' }}>
                    <Button variant="contained" onClick={() => goToTestPlan(id, name)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TestPlanList;
