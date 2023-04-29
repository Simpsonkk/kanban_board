import { mockIssues } from './issues';

export const fakeStore = {
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
  repositoryName: 'react/facebook',
  isIssuesLoaded: 'loaded',
};

export const fakeFullStore = {
  issueColumns: {
    1: {
      name: 'To do',
      items: mockIssues,
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
  repositoryName: 'react/facebook',
  isIssuesLoaded: 'loaded',
};
