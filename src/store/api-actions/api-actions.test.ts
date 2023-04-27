// import '@testing-library/jest-dom';

// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import thunk, { ThunkDispatch } from 'redux-thunk';
// import { configureMockStore } from '@jedmao/redux-mock-store';
// import { Action } from '@reduxjs/toolkit';
// import { mockIssues } from '../../components/_mocks_/issues';
// import { fakeStore } from '../../components/_mocks_/store';
// import { APIRoute } from '../../enums';
// import { createAPI } from '../../services/api';
// import { State } from '../../types/state.types';
// import { loadIssues } from '../issue-slice/issue-slice';
// import { store } from '../store';
// import { fetchRepoIssues, getRepoIssues } from './api-actions';
// describe('fetchRepoIssues', () => {
//   const api = createAPI();
//   const mockAPI = new MockAdapter(api);
//   const middlewares = [thunk.withExtraArgument(api)];
//   const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(
//     middlewares
//   );
//   // it('should dispatch load issues', async () => {
//   //   //const mockAPI = new MockAdapter(axios);
//   //   // mockAPI
//   //   //   .onGet(`facebook/react/${APIRoute.Issues}?${APIRoute.State}=all&${APIRoute.Page}=${1}`)
//   //   //    .reply(200, mockIssues);
//   //   await getRepoIssues({currentRepoName: 'facebook/react', nextIssuePage: '2'});
//   //   expect(axios.get).toHaveBeenCalled();
//   // })
//   it('should dispatch Load films when GET /films', async () => {
//     mockAPI
//       .onGet(`facebook/react/${APIRoute.Issues}?${APIRoute.State}=all&${APIRoute.Page}=${1}`)
//       .reply(200, mockIssues);
//     const store = mockStore();
//     await store.dispatch(fetchRepoIssues({ currentRepoName: 'facebook/react', nextIssuePage: '1' }));
//     const actions = store.getActions().map(({ type }) => type);
//     console.log('actions', actions);
//     expect(actions).toContain(loadIssues.toString());
//   });
// });

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mockIssues } from '../../components/_mocks_/issues';
import { changeIssueLoadStatus, loadIssues } from '../issue-slice/issue-slice';
import { fetchRepoIssues } from './api-actions';

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
    const issueRequest = { currentRepoName: 'some/repo', nextIssuePage: '1' };
    const mockResponse = {
      data: [{ id: 1, title: 'Issue 1' }],
      headers: { link: '<https://api.github.com/repositories/123/issues?page=2>; rel="next"' },
    };
    axiosMock.onGet('some-repo/issues?state=all&page=1').reply(200, mockIssues, mockResponse.headers);

    await store.dispatch(fetchRepoIssues(issueRequest));

    const actions = store.getActions();
    // expect(actions).toHaveLength(3);
    console.log(actions);
    
    expect(actions[0].type).toEqual(fetchRepoIssues.pending.type);
    expect(actions[1].type).toEqual('fetchRepoIssues/fulfilled');
    expect(actions[1].payload).toEqual(mockResponse.data);
    expect(actions[2].type).toEqual('issueSlice/changeIssueLoadStatus');
    expect(actions[2].payload).toEqual('loaded');
  });

  // it('should handle error', async () => {
  //   // Arrange
  //   const issueRequest = { currentRepoName: 'some-repo', nextIssuePage: '1' };
  //   axiosMock.onGet('some-repo/issues?state=all&page=1').reply(500);

  //   await store.dispatch(fetchRepoIssues(issueRequest));

  //   const actions = store.getActions();
  //   expect(actions).toHaveLength(1);
  //   expect(actions[0].type).toEqual(fetchRepoIssues.rejected.type);
  // });
});

























