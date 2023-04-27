import { mockIssues } from '../components/_mocks_/issues';
import { fakeStore } from '../components/_mocks_/store';
import { formatDate, mergeArrays } from './utils';

describe('utils', () => {
  it('formatDate should return correct date format', () => {
    const formattedDate = formatDate('2023-04-27T16:20:00Z');
    expect(formattedDate).toEqual('April 27, 2023');
  });

  it('mergeArrays should return mutate array with new issue', () => {
    const mergedIssues = mergeArrays(mockIssues, fakeStore.issueColumns);
    expect(mergedIssues[1].items).toEqual(mockIssues);
  });
});
