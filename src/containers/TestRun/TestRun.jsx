import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Paper, Typography } from '@mui/material';

import {
  TestRunTable,
  ButtonStepCell,
  ErrorDataCell,
  TestDataCell,
  TableDataDialog
} from '../../components';
import useTableSteps from '../../hooks/useTableSteps';
import { getExecutionTest, getExecutionTestFromErrorId } from '../../redux/store';

const TestRunOrigin = ({ test }) => {
  const { steps } = test;
  const useTableStepsRef = useTableSteps(steps.length);

  /* eslint-disable react/prop-types */
  const columns = React.useMemo(
    () => [
      {
        id: 'action',
        minWidth: 45,
        maxWidth: 45,
        align: 'center',
        Cell: ({ row }) => (
          <ButtonStepCell
            index={row.index}
            stepId={row.original.id}
            testId={test.testId}
            useTableStepsRef={useTableStepsRef}
          />
        )
      },
      {
        Header: 'Step',
        accessor: 'name',
        minWidth: 100,
        maxWidth: 100
      },
      {
        Header: 'Associated errors',
        accessor: 'errors',
        minWidth: 65,
        maxWidth: 65,
        align: 'center',
        Cell: ({ row }) => <ErrorDataCell errors={row.values.errors} />
      },
      {
        Header: 'Test data',
        accessor: 'testData',
        minWidth: 65,
        maxWidth: 65,
        align: 'center',
        Cell: ({ row }) => <TestDataCell data={row.values.testData} />
      },
      {
        Header: 'Control point',
        accessor: 'controlPoint',
        minWidth: 100,
        maxWidth: 100
      }
    ],
    [useTableStepsRef.currentState]
  );
  /* eslint-enable react/prop-types */

  return <TestRunTable columns={columns} data={steps} />;
};

TestRunOrigin.propTypes = {
  test: PropTypes.object.isRequired
};

const EntryData = ({ entryData }) => {
  const [open, setOpen] = useState(false);
  const [chosenDataItem, setChosenDataItem] = useState(null);

  const handleDataShow = (dataItem) => {
    setChosenDataItem(dataItem);
    setOpen(true);
  };

  return (
    <Box component={Paper} sx={{ padding: '0 0.8rem 0.5rem', display: 'grid', gap: '0.5rem' }}>
      <Typography variant="overline">Entry data</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          minWidth: '50rem'
        }}
      >
        <TableDataDialog
          handleClose={() => setOpen(false)}
          open={open}
          data={entryData}
          chosenDataItem={chosenDataItem}
          handleShow={handleDataShow}
        />
      </Box>
    </Box>
  );
};

EntryData.propTypes = {
  entryData: PropTypes.array.isRequired
};

const Preconditions = ({ preconditions }) => {
  return (
    <Box component={Paper} sx={{ padding: '0 0.8rem 0.5rem', display: 'grid', gap: '0.5rem' }}>
      <Typography variant="overline">Preconditions</Typography>
      <Typography variant="body1">{preconditions}</Typography>
    </Box>
  );
};

Preconditions.propTypes = {
  preconditions: PropTypes.string.isRequired
};

const ExpectedResult = ({ result }) => {
  return (
    <Box component={Paper} sx={{ padding: '0 0.8rem 0.5rem', display: 'grid', gap: '0.5rem' }}>
      <Typography variant="overline">Expected result</Typography>
      <Typography variant="body1">{result}</Typography>
    </Box>
  );
};

ExpectedResult.propTypes = {
  result: PropTypes.string.isRequired
};

export const TestRun = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { test, loading, pendingTestId, pendingErrorId } = useSelector(
    (state) => state.testExecution
  );

  useEffect(() => {
    if (pendingTestId) {
      (async () => {
        await dispatch(getExecutionTest({ testId: pendingTestId }));
      })();
    } else if (pendingErrorId) {
      (async () => {
        await dispatch(getExecutionTestFromErrorId({ errorId: pendingErrorId }));
      })();
    } else {
      navigate('/dashboard');
    }
  }, []);

  return loading ? (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      <Preconditions preconditions={test.testCaseProconditions} />
      <EntryData entryData={test.testCaseEntryData} />
      <TestRunOrigin test={test} />
      <ExpectedResult result={test.result} />
    </Box>
  );
};

export default TestRun;
