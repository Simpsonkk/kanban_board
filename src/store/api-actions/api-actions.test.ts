import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mockIssues } from '../../_mocks_/issues';
import { fetchRepoIssues } from './api-actions';

jest.mock('axios', () => {
  return {
    ...(jest.requireActual('axios') as object),
    create: jest.fn().mockReturnValue(jest.requireActual('axios')),
  };
});
const axiosMock = new MockAdapter(axios);
const mockStore = configureStore([thunk]);

describe('fetchRepoIssues thunk', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it('should fetch and load issues', async () => {
    const issueRequest = {
      currentRepoName: 'https://api.github.com/repos/biaochenxuying/blog-vue-typescript',
      nextIssuePage: '1',
    };
    const headers = {
      link: '<https://api.github.com/repos/biaochenxuying/blog-vue-typescript/issues?page=1>;',
    };
    axiosMock
      .onGet(
        'https://api.github.com/repos/biaochenxuying/blog-vue-typescript/issues?state=all&page=1'
      )
      .reply(200, mockIssues, headers);

    await store.dispatch(fetchRepoIssues(issueRequest));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchRepoIssues.pending.type);
    expect(actions[1].type).toEqual(fetchRepoIssues.fulfilled.type);
    expect(actions[1].payload).toEqual(mockIssues);
  });

  it('should handle error', async () => {
    const issueRequest = { currentRepoName: 'some-repo', nextIssuePage: '1' };

    axiosMock.onGet('some-repo/issues?state=all&page=1').reply(404);

    await store.dispatch(fetchRepoIssues(issueRequest));

    const actions = store.getActions();
    expect(actions[1].type).toEqual(fetchRepoIssues.rejected.type);
    expect(actions[1].error.message).toEqual('Request failed with status code 404');
  });
});
