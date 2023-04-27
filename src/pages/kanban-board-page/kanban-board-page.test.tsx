import '@testing-library/jest-dom';

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { render, screen } from '@testing-library/react';

import { fakeStore } from '../../components/_mocks_/store';
import KanbanBoardPage from './kanban-board-page';

const mockStore = configureStore();

describe('KanbanBoardPage', () => {
  const store = mockStore(fakeStore);

  it('should render the search form and issue table', () => {
    render(
      <Provider store={store}>
        <KanbanBoardPage />
      </Provider>
    );
    const searchFormElement = screen.getByTestId('searchForm');
    const issueTableElement = screen.getByTestId('issueTable');
    expect(searchFormElement).toBeInTheDocument();
    expect(issueTableElement).toBeInTheDocument();
  });
});
