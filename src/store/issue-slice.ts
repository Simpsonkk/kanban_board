import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getIssueOrder } from '../services/issue-order';
import { Issue } from '../types/issue.type';
import { IssueState } from '../types/state.type';

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
  nextIssuePage: '1',
  repositoryName: '',
};

export const issueSlice = createSlice({
  name: 'issueSlice',
  initialState,
  reducers: {
    loadIssues: (state, action: PayloadAction<Issue[]>) => {
      const todo: Issue[] = [];
      const inProgress: Issue[] = [];
      const done: Issue[] = [];

      // if (issue.id === 1669119666) {
          
      // }
      // let priority = 10000


      action.payload.forEach((issue) => {
        // issue[priority] = priority

        if (issue.state === 'open') {
          if (!issue.assignee) {
            todo.push(issue);
          } else {
            inProgress.push(issue);
          }
        } else if (issue.state === 'closed') {
          done.push(issue);
        }
        // priority += 10000
      });

      const issueOrder = JSON.parse(getIssueOrder())
      const currentRepo = issueOrder.find((repositories) => repositories.repositoryName === state.repositoryName).displacedIssues

      // currentRepo.forEach((issue) => {

      // })


      state.issueColumns[1].items.push(...todo);
      state.issueColumns[2].items.push(...inProgress);
      state.issueColumns[3].items.push(...done);
    },
    checkIssueNextPage: (state, action: PayloadAction<string>) => {
      const issuePageInfo = action.payload.split(', ').reduce((acc, part) => {
        const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
        if (match) {
          const url = match[1];
          const rel = match[2];
          acc[rel] = url;
        }
        return acc;
      }, {} as { [key: string]: string });

      state.nextIssuePage = issuePageInfo.next?.match(/page=(\d+)/)![1];
    },
    loadRepositoryName: (state, action: PayloadAction<string>) => {
      state.repositoryName = action.payload;
    },
  },
});

export const { loadIssues, checkIssueNextPage, loadRepositoryName } = issueSlice.actions;
