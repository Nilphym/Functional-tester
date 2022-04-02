import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import bugService, { bugTypes, bugStates } from '../../services/bugs';

const successMessages = {
  createBug: 'Bug created successfully',
  uploadImage: 'Attachment added successfully',
  updateBug: 'Bug updated successfully',
  rejectBug: 'Bug rejected successfully',
  takeBug: 'Bug taken successfully',
  resignFromBug: 'You resigned from bug successfully',
  resolveBug: 'Bug resolved successfully',
  deleteAttachment: 'Attachment deleted successfully'
};

const initialState = {
  bugs: [],
  bug: {},
  options: {},
  loading: true
};

//* ****** GET REQUESTS ****** *//

export const getBug = createAsyncThunk('bugs/get', async ({ bugId }) => {
  const bug = await bugService.getBug({ bugId });
  return bug;
});

export const getAllBugs = createAsyncThunk('bugs/get/all', async () => {
  const bugs = await bugService.getBugs();
  return bugs;
});

export const getBugsToFix = createAsyncThunk('bugs/get/fix', async () => {
  const bugs = await bugService.getBugs({ type: bugTypes.toFix });
  return bugs;
});

export const getBugsToRetest = createAsyncThunk('bugs/get/retest', async () => {
  const bugs = await bugService.getBugs({ type: bugTypes.toRetest });
  return bugs;
});

export const getBugsDeveloper = createAsyncThunk('bugs/get/developer', async () => {
  const bugs = await bugService.getBugs({ type: bugTypes.developer });
  return bugs;
});

export const getBugOptions = createAsyncThunk('bugs/get/options', async () => {
  const options = await bugService.getOptions();
  return options;
});

//* ****** POST REQUESTS ****** *//

export const createBug = createAsyncThunk('bugs/post', async ({ newBugData }) => {
  const bug = await bugService.postBug({ newBugData });
  return bug;
});

export const uploadImage = createAsyncThunk(
  'bugs/attachments/post',
  async ({ bugId, imageBase64, imageName }) => {
    const attachment = await bugService.postAttachment({ bugId, imageBase64, imageName });
    return { bugId, attachment };
  }
);

//* ****** PUT REQUESTS ****** *//

export const updateBug = createAsyncThunk('bugs/put/all', async ({ id, updatedBugData }) => {
  const bug = await bugService.putBug({ id, updatedBugData });
  return bug;
});

export const rejectBug = createAsyncThunk('bugs/reject', async ({ id }) => {
  const bug = await bugService.changeBugState({ id, state: bugStates.rejected });
  return bug;
});

export const takeBug = createAsyncThunk('bugs/take', async ({ id }) => {
  const bug = await bugService.changeBugState({ id, state: bugStates.taken });
  return bug;
});

export const resignFromBug = createAsyncThunk('bugs/resign', async ({ id }) => {
  const bug = await bugService.changeBugState({ id, state: bugStates.resigned });
  return bug;
});

export const resolveBug = createAsyncThunk('bugs/resolve', async ({ id, retestsRequired }) => {
  const bug = await bugService.changeBugState({
    id,
    state: bugStates.resolved,
    retestsRequired
  });
  return bug;
});

//* ****** DELETE REQUESTS ****** *//

export const deleteAttachment = createAsyncThunk(
  'bugs/attachments/delete',
  async ({ id, bugId }) => {
    await bugService.deleteAttachment({ id });
    return { id, bugId };
  }
);

export const bugsSlice = createSlice({
  name: 'bugs',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBug.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBug.fulfilled, (state, action) => {
        state.loading = false;
        state.bug = action.payload;
      })
      .addCase(getBug.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      .addCase(getAllBugs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBugs.fulfilled, (state, action) => {
        state.loading = false;
        state.bugs = action.payload;
      })
      .addCase(getAllBugs.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      .addCase(getBugsToFix.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBugsToFix.fulfilled, (state, action) => {
        state.loading = false;
        state.bugs = action.payload;
      })
      .addCase(getBugsToFix.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      .addCase(getBugsToRetest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBugsToRetest.fulfilled, (state, action) => {
        state.loading = false;
        state.bugs = action.payload;
      })
      .addCase(getBugsToRetest.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      .addCase(getBugsDeveloper.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBugsDeveloper.fulfilled, (state, action) => {
        state.loading = false;
        state.bugs = action.payload;
      })
      .addCase(getBugsDeveloper.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      .addCase(getBugOptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBugOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.options = action.payload;
      })
      .addCase(getBugOptions.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      .addCase(createBug.fulfilled, (state, action) => {
        state.bugs.push(action.payload);
        toast.success(successMessages.createBug);
      })
      .addCase(createBug.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(uploadImage.fulfilled, (state, action) => {
        const relatedBug = state.bugs.find((bug) => bug.id === action.payload.bugId);
        relatedBug.attachments.push(action.payload.attachment);
        toast.success(successMessages.uploadImage);
      })
      .addCase(uploadImage.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(updateBug.fulfilled, () => {
        toast.success(successMessages.updateBug);
      })
      .addCase(updateBug.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(rejectBug.fulfilled, () => {
        toast.success(successMessages.rejectBug);
      })
      .addCase(rejectBug.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(takeBug.fulfilled, () => {
        toast.success(successMessages.takeBug);
      })
      .addCase(takeBug.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(resignFromBug.fulfilled, () => {
        toast.success(successMessages.resignFromBug);
      })
      .addCase(resignFromBug.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(resolveBug.fulfilled, () => {
        toast.success(successMessages.resolveBug);
      })
      .addCase(resolveBug.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(deleteAttachment.fulfilled, (state, action) => {
        const relatedBug = state.bugs.find((bug) => bug.id === action.payload.bugId);
        relatedBug.attachments = relatedBug.attachments.filter(
          (attachment) => attachment.id !== action.payload.attachmentId
        );
        toast.success(successMessages.deleteAttachment);
      })
      .addCase(deleteAttachment.rejected, (_, action) => {
        toast.error(action.error.message);
      });
  }
});

export default bugsSlice.reducer;
