import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { CircularProgress, Box, Paper, Typography } from '@mui/material';

import {
  TestRunTable,
  ButtonStepCell,
  BugDataCell,
  TestDataCell,
  TableDataDialog
} from '../../components';
import useTableSteps from '../../../hooks/useTableSteps';
import { getBugOptions, getTest } from '../../../redux/store';

const TestRunMain = ({ id, steps }) => {
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
            testId={id}
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
        Header: 'Associated bugs',
        accessor: 'bugs',
        minWidth: 65,
        maxWidth: 65,
        align: 'center',
        Cell: ({ row }) => <BugDataCell bugs={row.values.bugs} />
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

TestRunMain.propTypes = {
  id: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      bugs: PropTypes.array.isRequired,
      testData: PropTypes.array.isRequired,
      controlPoint: PropTypes.string.isRequired
    })
  ).isRequired
};

const EntryData = ({ entryData }) => {
  const [open, setOpen] = useState(false);
  const [chosenItem, setChosenItem] = useState(null);

  const handleDataShow = (dataItem) => {
    setChosenItem(dataItem);
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
          data={entryData.map((item) => ({ ...item, code: item.name }))}
          chosenItem={chosenItem}
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
  const { origin, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { test, loadingTest: loading } = useSelector((state) => state.tests);

  useEffect(() => {
    if (origin === 'test') {
      dispatch(getTest({ testId: id }));
    } else if (origin === 'bug') {
      dispatch(getTest({ bugId: id }));
    } else {
      navigate('/dashboard');
    }
    dispatch(getBugOptions());
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
      <Preconditions preconditions={test.preconditions} />
      <EntryData entryData={test.entryData} />
      <TestRunMain id={test.id} steps={test.steps} />
      <ExpectedResult result={test.result} />
    </Box>
  );
};
