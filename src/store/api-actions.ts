import { AxiosInstance } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { APIRoute } from '../enums';
import { errorHandler } from '../services/error-handler';
import { IssueRequest } from '../types/issue-request.type';
import { AppDispatch } from '../types/state.type';
import { checkIssueNextPage, loadIssues } from './issue-slice';

export const fetchRepoIssues = createAsyncThunk<
  void,
  IssueRequest,
  { extra: { api: AxiosInstance }; dispatch: AppDispatch }
>('fetchRepoIssues', async ({ repositoryName, nextIssuePage }, { extra: { api }, dispatch }) => {
  try {
    const response = await api.get(
      `${repositoryName}/${APIRoute.Issues}?${APIRoute.State}=all&${APIRoute.Page}=${nextIssuePage}`
    );
    dispatch(loadIssues(response.data));
    dispatch(checkIssueNextPage(response.headers.link));
  } catch (error) {
    errorHandler(error);
  }
});
