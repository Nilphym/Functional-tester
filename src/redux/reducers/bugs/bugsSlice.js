import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { toast } from 'react-toastify';

import server from '../../../services/server';

const initialState = {
  rows: [],
  loading: true,
  possibleValues: {},
  bugDetails: {}
};

export const getPossibleBugValues = createAsyncThunk('bugs/get/values', async () => {
  const promises = [];
  promises.push(server().get({ url: 'Errors/ErrorTypes' }));
  promises.push(server().get({ url: 'Errors/ErrorImpacts' }));
  promises.push(server().get({ url: 'Errors/ErrorPriorities' }));

  const resolved = await Promise.all(promises);

  const data = {
    types: resolved[0],
    impacts: resolved[1],
    priorities: resolved[2]
  };

  return data;
});

const prepareDataForView = (rows) => {
  return rows.map((row) => ({
    ...row,
    state: row.errorState,
    type: row.errorType,
    impact: row.errorImpact,
    priority: row.errorPriority,
    retests: [row.retestsRequired, row.retestsDone, row.retestsFailed].join(' / '),
    deadline: row.deadline ? DateTime.fromISO(row.deadline).toFormat('MM/dd/yyyy') : null,
    reportDate: DateTime.fromISO(row.reportDate).toFormat('MM/dd/yyyy'),
    endDate: row.endDate ? DateTime.fromISO(row.endDate).toFormat('MM/dd/yyyy') : null,
    attachments: row.attachments.map((attachment) => ({
      ...attachment,
      image: attachment.imageLink
    }))
  }));
};

export const getBugsToFix = createAsyncThunk('bugs/get/fix', async () => {
  const data = await server().get({ url: 'Errors/toFix' });
  const errorsWithAttachments = await Promise.all(
    data.map(async (error) => ({
      ...error,
      attachments: await (async () => {
        const attachments = await server().get({ url: `Attachments/error/${error.id}` });
        return attachments;
      })()
    }))
  );
  return prepareDataForView(errorsWithAttachments);
});

export const getBugsToRetest = createAsyncThunk('bugs/get/retest', async () => {
  const data = await server().get({ url: 'Errors/toRetest' });
  const errorsWithAttachments = await Promise.all(
    data.map(async (error) => ({
      ...error,
      attachments: await (async () => {
        const attachments = await server().get({ url: `Attachments/error/${error.id}` });
        return attachments;
      })()
    }))
  );
  return prepareDataForView(errorsWithAttachments);
});

export const getAllBugs = createAsyncThunk('bugs/get/all', async ({ productId }) => {
  const data = await server().get({ url: `Project/${productId}/Errors` });
  const errorsWithAttachments = await Promise.all(
    data.map(async (error) => ({
      ...error,
      attachments: await (async () => {
        const attachments = await server().get({ url: `Attachments/error/${error.id}` });
        return attachments;
      })()
    }))
  );
  return prepareDataForView(errorsWithAttachments);
});

export const getBugsDeveloper = createAsyncThunk('bugs/get/developer', async ({ developerId }) => {
  const data = await server().get({ url: `Errors/developer/${developerId}` });
  const errorsWithAttachments = await Promise.all(
    data.map(async (error) => ({
      ...error,
      attachments: await (async () => {
        const attachments = await server().get({ url: `Attachments/error/${error.id}` });
        return attachments;
      })()
    }))
  );
  return prepareDataForView(errorsWithAttachments);
});

export const getBug = createAsyncThunk('bugs/get', async ({ errorId }) => {
  const data = await server().get({ url: `Errors/${errorId}` });
  const errorWithAttachments = await {
    ...data,
    attachments: await (async () => {
      const attachments = await server().get({ url: `Attachments/error/${data.id}` });
      return attachments;
    })()
  };
  return prepareDataForView([errorWithAttachments])[0];
});

export const postBug = createAsyncThunk('bugs/post', async ({ json }) => {
  const data = await server().post({ url: 'Errors', data: json });
  return data;
});

const prepareDataForServer = (json) => {
  return {
    ...json,
    errorType: json.type,
    errorImpact: json.impact,
    errorPriority: json.priority,
    deadline: json.deadline
      ? DateTime.fromFormat(json.deadline, 'MM/dd/yyyy').toISO().substring(0, 19)
      : ''
  };
};

export const putRows = createAsyncThunk('bugs/put/all', async ({ id, json }) => {
  const data = await server().put({ url: `Errors/${id}`, data: prepareDataForServer(json) });
  return data;
});

export const rejectBug = createAsyncThunk('bugs/reject', async ({ id, developerId }) => {
  const data = await server().put({ url: `Errors/reject/${id}`, data: { developerId } });
  return data;
});

export const resolveBug = createAsyncThunk('bugs/resolve', async ({ id, retestsRequired }) => {
  const data = await server().put({ url: `Errors/fixed/${id}`, data: { retestsRequired } });
  return data;
});

export const takeBug = createAsyncThunk('bugs/take', async ({ id, developerId }) => {
  const data = await server().put({ url: `Errors/open/${id}`, data: { developerId } });
  return data;
});

export const resignFromBug = createAsyncThunk('bugs/resign', async ({ id, developerId }) => {
  const data = await server().put({ url: `Errors/resign/${id}`, data: { developerId } });
  return data;
});

export const deleteBugAttachment = createAsyncThunk(
  'bugs/attachments/delete',
  async ({ bugId, id }) => {
    await server().delete({ url: `Attachments/${id}` });
    return { bugId, id };
  }
);

export const postImage = createAsyncThunk(
  'bugs/attachments/post',
  async ({ base64image, imageName, errorId }) => {
    const imageUrl = await server().postImage({ base64image, imageName });
    const id = await server().post({
      url: 'Attachments',
      data: { imageLink: imageUrl, errorId }
    });
    return { id, errorId, imageUrl };
  }
);

export const bugsSlice = createSlice({
  name: 'bugs',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPossibleBugValues.fulfilled, (state, action) => {
        state.possibleValues = action.payload;
      })
      .addCase(getPossibleBugValues.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(getBugsToFix.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBugsToFix.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload;
      })
      .addCase(getBugsToFix.rejected, (state, action) => {
        state.loading = false;
        state.rows = [];
        toast.error(action.error.message);
      })

      .addCase(getBugsToRetest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBugsToRetest.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload;
      })
      .addCase(getBugsToRetest.rejected, (state, action) => {
        state.loading = false;
        state.rows = [];
        toast.error(action.error.message);
      })

      .addCase(getAllBugs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBugs.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload;
      })
      .addCase(getAllBugs.rejected, (state, action) => {
        state.loading = false;
        state.rows = [];
        toast.error(action.error.message);
      })

      .addCase(getBugsDeveloper.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBugsDeveloper.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload;
      })
      .addCase(getBugsDeveloper.rejected, (state, action) => {
        state.loading = false;
        state.rows = [];
        toast.error(action.error.message);
      })

      .addCase(getBug.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBug.fulfilled, (state, action) => {
        state.loading = false;
        state.bugDetails = action.payload;
      })
      .addCase(getBug.rejected, (state, action) => {
        state.loading = false;
        state.bugDetails = {};
        toast.error(action.error.message);
      })

      .addCase(putRows.fulfilled, () => {
        toast.success('Bug updated successfully');
      })
      .addCase(putRows.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(rejectBug.fulfilled, () => {
        toast.success('Bug rejected successfully');
      })
      .addCase(rejectBug.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(resolveBug.fulfilled, () => {
        toast.success('Bug resolved successfully');
      })
      .addCase(resolveBug.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(takeBug.fulfilled, () => {
        toast.success('Bug taken successfully');
      })
      .addCase(takeBug.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(resignFromBug.fulfilled, () => {
        toast.success('You resigned from bug successfully');
      })
      .addCase(resignFromBug.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(deleteBugAttachment.fulfilled, (state, action) => {
        state.rows = state.rows.map((row) =>
          row.id === action.payload.bugId
            ? {
                ...row,
                attachments: row.attachments.filter(
                  (attachment) => attachment.id !== action.payload.id
                )
              }
            : row
        );
        toast.success('Attachment deleted successfully');
      })
      .addCase(deleteBugAttachment.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(postImage.fulfilled, (state, action) => {
        state.rows = state.rows.map((row) =>
          row.id === action.payload.errorId
            ? {
                ...row,
                attachments: [
                  ...row.attachments,
                  { id: action.payload.id, image: action.payload.imageUrl }
                ]
              }
            : row
        );
        toast.success('Attachment added successfully');
      })
      .addCase(postImage.rejected, (_, action) => {
        toast.error(action.error.message);
      });
  }
});

export default bugsSlice.reducer;
