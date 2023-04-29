import '@testing-library/jest-dom';

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import { render } from '@testing-library/react';

import { fakeStore } from '../../_mocks_/store';
import { AppRoute } from '../../enums';
import KanbanBoardPage from '../../pages/kanban-board-page/kanban-board-page';

const mockStore = configureStore();

describe('KanbanBoardPage', () => {
  it('render KanbanBoardPage', () => {
    const store = mockStore(fakeStore);

    const view = render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<KanbanBoardPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(view).toMatchSnapshot();
  });
});
