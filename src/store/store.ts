import { configureStore } from '@reduxjs/toolkit';

import { createAPI } from '../services/api';
import { issueSlice } from './issue-slice';

const api = createAPI();

export const store = configureStore({
  reducer: issueSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api },
      },
    }),
});
