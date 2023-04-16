import { IssueColumns } from '../types/issue-columns.type';
import { State } from '../types/state.type';

export const getIssueColumns = (state: State): IssueColumns => state.issueColumns;
export const getNextIssuePage = (state: State): string => state.nextIssuePage;
export const getRepositoryName = (state: State): string => state.repositoryName;

// [
//   {
//     repoName: 'React',
//     displacedIssues: [
//       {
//         issueId: 123,
//         column: 'Done',
            // index: 2
//       },
//       {
//         issueId: 321,
//         column: 'To Do',
//       },
//     ]
//   },
//   {
//     repoName: 'Rozetka',
//     displacedIssues: [
//       {
//         issueId: 456,
//         column: 'Done',
//       },
//       {
//         issueId: 789,
//         column: 'To Do',
//       },
//     ]
//   },
// ]
