/* eslint-disable testing-library/prefer-screen-queries */
import '@testing-library/jest-dom';

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { getByText, render, screen } from '@testing-library/react';

import { fakeFullStore } from '../../_mocks_/store';
import IssueColumns from '../issue-columns/issue-columns';
import IssueTable from './issue-table';

const mockStore = configureStore();

describe('IssueTable', () => {
  const store = mockStore(fakeFullStore);

  it('renders issue columns', () => {
    render(
      <Provider store={store}>
        <IssueTable />
      </Provider>
    );

    expect(screen.getByText(/to do/i)).toBeInTheDocument();
    expect(screen.getByText(/done/i)).toBeInTheDocument();
  });

  it('renders the IssueTable with correct columns', () => {
    render(
      <Provider store={store}>
        <IssueTable />
      </Provider>
    );
    expect(screen.getByText(/done/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('droppable').length).toEqual(3);
  });

  it('renders the Loader component when isIssuesLoaded is loading', () => {
    const column = {
      name: 'To do',
      items: [],
    };
    const columnId = '1';
    const isIssuesLoaded = 'loading';
    render(
      <Provider store={store}>
        <IssueColumns columnId={columnId} column={column} isIssuesLoaded={isIssuesLoaded} />
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders first column with mock issue', () => {
    render(
      <Provider store={store}>
        <IssueTable />
      </Provider>
    );

    const toDoColumn = screen.getAllByTestId('droppable')[0];
    expect(getByText(toDoColumn, 'my issue')).toBeInTheDocument();
  });
});
