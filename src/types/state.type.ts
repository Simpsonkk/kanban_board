import { store } from '../store/store';
import { IssueColumns } from './issue-columns.type';

export type IssueState = {
  issueColumns: IssueColumns;
  repositoryName: string;
  isIssuesLoaded: string;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
