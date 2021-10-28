import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import {
  EnhancedTable,
  EnhancedIconButton,
  enhancedButtonIcons,
  SelectColumnFilter
} from '../../components';
import {
  getRows,
  putRows,
  resolveBug,
  rejectBug,
  takeBug,
  resignFromBug,
  getPossibleValues
} from '../../redux/store';

export const bugTableTypes = {
  all: 'all',
  assigned: 'assigned',
  active: 'active',
  toReview: 'to-review'
};

const getStateColor = (value) => {
  switch (value) {
    case 'New':
      return 'warning';
    case 'Open':
      return 'default';
    case 'Fixed':
      return 'info';
    case 'Retest':
      return 'info';
    case 'Closed':
      return 'success';
    case 'Rejected':
      return 'error';
    case 'Reopened':
      return 'warning';
    default:
      return 'default';
  }
};

export const BugTable = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, setValue, control } = useForm();
  const [dialog, setDialog] = useState({ open: false, content: null, action: null });
  const { id: developerId } = useSelector((state) => state.auth.token);
  const { rows, loading } = useSelector((state) => state.bugs);
  const { types, impacts, priorities } = useSelector((state) => state.bugs.possibleValues);

  useEffect(() => {
    dispatch(getRows());
    dispatch(getPossibleValues());
  }, []);

  const closeDialog = () => {
    setDialog((dialog) => ({ ...dialog, open: false }));
  };

  const onRetest = (id) => {
    navigate(`/retest/${id}`);
  };

  const onResign = (id) => {
    setValue('id', id);
    setValue('developerId', developerId);
    setDialog({
      open: true,
      content: <DialogContentText>You will be unassigned from the bug.</DialogContentText>,
      action: resignFromBug
    });
  };

  const onReject = (id) => {
    setValue('id', id);
    setDialog({
      open: true,
      content: <DialogContentText>This bug will be marked as rejected.</DialogContentText>,
      action: rejectBug
    });
  };

  const onTake = (id) => {
    setValue('id', id);
    setValue('developerId', developerId);
    setDialog({
      open: true,
      content: <DialogContentText>You will be assigned to the bug.</DialogContentText>,
      action: takeBug
    });
  };

  const onResolve = (id) => {
    setValue('id', id);
    setDialog({
      open: true,
      content: (
        <>
          <DialogContentText>This bug will be marked as resolved.</DialogContentText>
          <Controller
            defaultValue={1}
            control={control}
            name="retestsRequired"
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="retestsRequired"
                label="* Number of required reviews"
                type="number"
                fullWidth
                variant="standard"
                {...field}
              />
            )}
          />
        </>
      ),
      action: resolveBug
    });
  };

  /* eslint-disable react/prop-types */
  const columns = useMemo(
    () =>
      [
        {
          id: 'expander',
          disableFilters: true,
          disableSortBy: true,
          Cell: ({ row: { isExpanded, getToggleRowExpandedProps } }) => (
            <IconButton {...getToggleRowExpandedProps()} size="small">
              {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          ),
          visible: true
        },
        {
          Header: 'Code',
          accessor: 'code',
          visible: true,
          minWidth: 120,
          maxWidth: 120
        },
        {
          Header: 'Name',
          accessor: 'name',
          visible: true,
          minWidth: 230,
          maxWidth: 230
        },
        {
          Header: 'State',
          accessor: 'state',
          Filter: SelectColumnFilter,
          Cell: ({ value }) => <Chip label={value} color={getStateColor(value)} />,
          visible:
            type === bugTableTypes.all ||
            type === bugTableTypes.assigned ||
            type === bugTableTypes.toReview
        },
        {
          Header: 'Functionality',
          accessor: 'functionality',
          visible: true,
          minWidth: 150,
          maxWidth: 150
        },
        {
          Header: 'Type',
          accessor: 'type',
          Filter: SelectColumnFilter,
          visible: type === bugTableTypes.all || type === bugTableTypes.toReview
        },
        {
          Header: 'Impact',
          accessor: 'impact',
          Filter: SelectColumnFilter,
          visible: type === bugTableTypes.active || type === bugTableTypes.toReview
        },
        {
          Header: 'Priority',
          accessor: 'priority',
          Filter: SelectColumnFilter,
          visible: type === bugTableTypes.active || type === bugTableTypes.toReview
        },
        {
          Header: (
            <Box sx={{ position: 'relative' }}>
              Retests
              <Typography
                sx={{
                  width: '6rem',
                  fontSize: '0.7rem',
                  position: 'absolute',
                  left: '50%',
                  bottom: '-60%',
                  transform: 'translate(-50%, 0)'
                }}
              >
                Req/Done/Failed
              </Typography>
            </Box>
          ),
          accessor: 'retests',
          disableFilters: true,
          disableSortBy: true,
          visible: type === bugTableTypes.toReview || type === bugTableTypes.all,
          minWidth: 100,
          maxWidth: 100,
          align: 'center'
        },
        {
          Header: 'Resign',
          accessor: 'resign',
          disableFilters: true,
          disableSortBy: true,
          Cell: ({
            row: {
              original: { id }
            }
          }) => (
            <EnhancedIconButton icon={enhancedButtonIcons.resign} onClick={() => onResign(id)} />
          ),
          minWidth: 75,
          maxWidth: 75,
          visible: type === bugTableTypes.assigned,
          align: 'center'
        },
        {
          Header: 'Reject',
          accessor: 'reject',
          disableFilters: true,
          disableSortBy: true,
          Cell: ({
            row: {
              original: { id }
            }
          }) => (
            <EnhancedIconButton icon={enhancedButtonIcons.reject} onClick={() => onReject(id)} />
          ),
          minWidth: 75,
          maxWidth: 75,
          visible: type === bugTableTypes.assigned,
          align: 'center'
        },
        {
          Header: 'Resolve',
          accessor: 'resolve',
          disableFilters: true,
          disableSortBy: true,
          Cell: ({
            row: {
              original: { id }
            }
          }) => (
            <EnhancedIconButton icon={enhancedButtonIcons.resolve} onClick={() => onResolve(id)} />
          ),
          minWidth: 75,
          maxWidth: 75,
          visible: type === bugTableTypes.assigned,
          align: 'center'
        },
        {
          Header: 'Take',
          accessor: 'take',
          disableFilters: true,
          disableSortBy: true,
          Cell: ({
            row: {
              original: { id }
            }
          }) => <EnhancedIconButton icon={enhancedButtonIcons.take} onClick={() => onTake(id)} />,
          minWidth: 75,
          maxWidth: 75,
          visible: type === bugTableTypes.active,
          align: 'center'
        },
        {
          Header: 'Retest',
          accessor: 'retest',
          disableFilters: true,
          disableSortBy: true,
          Cell: ({
            row: {
              original: { id }
            }
          }) => (
            <EnhancedIconButton icon={enhancedButtonIcons.retest} onClick={() => onRetest(id)} />
          ),
          minWidth: 75,
          maxWidth: 75,
          visible: type === bugTableTypes.toReview,
          align: 'center'
        }
      ].filter((column) => column.visible),
    [type]
  );
  /* eslint-enable react/prop-types */

  const onSubmitBugStatus = async (arg) => {
    closeDialog();
    await dispatch(dialog.action(arg));
    await dispatch(getRows());
  };

  const onSubmitBugDetails = async (json) => {
    const { id } = json;
    delete json.id;
    await dispatch(putRows({ id, json }));
    await dispatch(getRows());
  };

  const prepareRows = (rows) =>
    rows.map((row) => ({
      ...row,
      subRows: [
        {
          id: row.id,
          submitHandler: onSubmitBugDetails,
          fields: [
            { id: 'name', label: 'Name', type: 'text', value: row.name },
            { id: 'type', label: 'Type', type: 'select', value: row.type, possibleValues: types },
            {
              id: 'impact',
              label: 'Impact',
              type: 'select',
              value: row.impact,
              possibleValues: impacts
            },
            {
              id: 'priority',
              label: 'Priority',
              type: 'select',
              value: row.priority,
              possibleValues: priorities
            },
            { id: 'deadline', label: 'Deadline', type: 'date', value: row.deadline },
            {
              id: 'reportDate',
              label: 'Report date',
              type: 'disabled',
              value: row.reportDate
            },
            { id: 'endDate', label: 'End date', type: 'disabled', value: row.endDate },
            { id: 'description', label: 'Description', type: 'textLarge', value: row.description }
            // { id: 'attachments', label: 'Attachments', Component: null } // TODO handle attachments by custom component
          ]
        }
      ]
    }));

  return loading ? (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <>
      <EnhancedTable title="Bugs" initialPageSize={5} data={prepareRows(rows)} columns={columns} />
      <Dialog open={dialog.open} onClose={closeDialog}>
        <form onSubmit={handleSubmit(onSubmitBugStatus)}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>{dialog.content}</DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button type="submit">Confirm</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default BugTable;

BugTable.propTypes = {
  type: PropTypes.oneOf(Object.values(bugTableTypes)).isRequired
};
