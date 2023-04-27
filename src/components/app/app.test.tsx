import '@testing-library/jest-dom';

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import { render, screen } from '@testing-library/react';

import KanbanBoardPage from '../../pages/kanban-board-page/kanban-board-page';
import { fakeStore } from '../_mocks_/store';

const mockStore = configureStore();

describe('KanbanBoardPage', () => {
  it('render KanbanBoardPage', () => {
    const store = mockStore(fakeStore);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <KanbanBoardPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/in progress/i)).toBeInTheDocument();
  });
});
