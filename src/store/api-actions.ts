import { AxiosInstance } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { APIRoute } from '../enums';
import { createAPI } from '../services/api';
import { errorHandler } from '../services/error-handler';
import { IssueRequest } from '../types/issue-request.type';
import { AppDispatch } from '../types/state.type';
import { changeIssueLoadStatus, loadIssues } from './issue-slice';
import { store } from './store';

const api = createAPI();

export const fetchRepoIssues = createAsyncThunk<
  void,
  IssueRequest,
  { extra: { api: AxiosInstance }; dispatch: AppDispatch }
>('fetchRepoIssues', async function getRepoIssues({ currentRepoName, nextIssuePage }) {
  try {
    const response = await api.get(
      `${currentRepoName}/${APIRoute.Issues}?${APIRoute.State}=all&${APIRoute.Page}=${nextIssuePage}`
    );
    store.dispatch(loadIssues(response.data));
    const issuePageInfo = response.headers.link
      .split(', ')
      .reduce((acc: { [key: string]: string }, part: string) => {
        const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
        if (match) {
          const url = match[1];
          const rel = match[2];
          acc[rel] = url;
        }
        return acc;
      }, {});

    const nextPage = issuePageInfo.next?.match(/page=(\d+)/)![1];

    if (nextPage) {
      await getRepoIssues({ currentRepoName, nextIssuePage: nextPage });
    }
    store.dispatch(changeIssueLoadStatus('loaded'));
  } catch (error) {
    errorHandler(error);
  }
});
