import { mockIssues } from '../../components/_mocks_/issues';
import { fakeFullStore, fakeStore } from '../../components/_mocks_/store';
import {
  changeIssueLoadStatus, checkNewIssues, fillIssues, issueSlice, loadIssues, loadRepositoryName
} from './issue-slice';

describe('issueSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(issueSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual({
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
    });
  });

  it('issues should be loaded', () => {
    expect(issueSlice.reducer(fakeStore, loadIssues(mockIssues))).toEqual({
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
    });
  });

  it('repository name should be changed', () => {
    expect(issueSlice.reducer(fakeStore, loadRepositoryName('test1/test2'))).toEqual({
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
      repositoryName: 'test1/test2',
      isIssuesLoaded: 'loaded',
    });
  });

  xit('new issues should be loaded', () => {
    expect(issueSlice.reducer(fakeStore, checkNewIssues(fakeStore.issueColumns))).toEqual({
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
    });
  });

  it('load status should be changed', () => {
    expect(issueSlice.reducer(fakeStore, changeIssueLoadStatus('loading'))).toEqual({
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
      isIssuesLoaded: 'loading',
    });
  });

  it('columns should be filled with issues', () => {
    expect(issueSlice.reducer(fakeStore, fillIssues(fakeFullStore.issueColumns))).toEqual({
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
    });
  });
});
