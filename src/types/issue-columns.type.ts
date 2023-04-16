import { Issue } from './issue.type';

export type IssueColumns = {
  1: IssueColumn;
  2: IssueColumn;
  3: IssueColumn;
};

export type IssueColumn = {
  name: string;
  items: Issue[];
};
