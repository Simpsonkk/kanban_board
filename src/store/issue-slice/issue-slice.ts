import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getIssueOrder } from '../../services/issue-order';
import { IssueColumns } from '../../types/issue-columns.types';
import { Issue } from '../../types/issue.types';
import { IssueState } from '../../types/state.types';
import { mergeArrays } from '../../utils/utils';

const initialState: IssueState = {
  issueColumns: {
    1: {
      name: 'To do',
      items: [],
    },
    2: {
      name: 'In Progress',
      items: [],
    },
    3: {
      name: 'Done',
      items: [],
    },
  },
  repositoryName: '',
  isIssuesLoaded: 'unknown',
};

export const issueSlice = createSlice({
  name: 'issueSlice',
  initialState,
  reducers: {
    loadIssues: (state, action: PayloadAction<Issue[]>) => {
      state.issueColumns[1].items.push(...action.payload);
    },
    loadRepositoryName: (state, action: PayloadAction<string>) => {
      state.repositoryName = action.payload;
    },
    clearIssues: (state) => {
      state.issueColumns[1].items = [];
      state.issueColumns[2].items = [];
      state.issueColumns[3].items = [];
    },
    checkNewIssues: (state, action: PayloadAction<IssueColumns>) => {
      const repositories = JSON.parse(getIssueOrder());
      let currentRepo = repositories[state.repositoryName];
      if (currentRepo) {
        currentRepo = mergeArrays(action.payload[1].items, currentRepo);
        state.issueColumns[1].items = currentRepo[1].items;
        state.issueColumns[2].items = currentRepo[2].items;
        state.issueColumns[3].items = currentRepo[3].items;
      }
    },
    changeIssueLoadStatus: (state, action: PayloadAction<string>) => {
      state.isIssuesLoaded = action.payload;
    },
    fillIssues: (state, action: PayloadAction<IssueColumns>) => {
      state.issueColumns = action.payload;
    },
  },
});

export const {
  loadIssues,
  loadRepositoryName,
  clearIssues,
  checkNewIssues,
  changeIssueLoadStatus,
  fillIssues,
} = issueSlice.actions;
