import { IssueColumns } from '../types/issue-columns.types';
import { State } from '../types/state.types';

export const getIssueColumns = (state: State): IssueColumns => state.issueColumns;
export const getRepositoryName = (state: State): string => state.repositoryName;
export const getLoadedDataStatus = (state: State): string => state.isIssuesLoaded;
