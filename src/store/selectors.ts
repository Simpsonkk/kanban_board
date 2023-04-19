import { IssueColumns } from '../types/issue-columns.type';
import { State } from '../types/state.type';

export const getIssueColumns = (state: State): IssueColumns => state.issueColumns;
export const getRepositoryName = (state: State): string => state.repositoryName;
export const getLoadedDataStatus = (state: State): string => state.isIssuesLoaded;
