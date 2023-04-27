/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import '@testing-library/jest-dom';

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { clearIssues, loadRepositoryName } from '../../store/issue-slice/issue-slice';
import { fakeStore } from '../_mocks_/store';
import RepoIssueSearchForm from './repo-issue-search-form';

const mockStore = configureStore();

describe('RepoIssueSearchForm', () => {
  const store = mockStore(fakeStore);

  it('should render the form', () => {
    render(
      <Provider store={store}>
        <RepoIssueSearchForm />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Enter repo URL')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Load Issues' })).toBeInTheDocument();
  });

  it('should dispatch actions on button click', () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <RepoIssueSearchForm />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter repo URL');
    const button = screen.getByRole('button', { name: 'Load Issues' });

    userEvent.type(input, 'https://github.com/facebook/react');
    userEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith(clearIssues());
    expect(store.dispatch).toHaveBeenCalledWith(loadRepositoryName('facebook/react'));
  });

  it('should render the profile and repository names', () => {
    render(
      <Provider store={store}>
        <RepoIssueSearchForm />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter repo URL');
    const profileLink = screen.getByTestId('Profile');
    const repositoryLink = screen.getByTestId('Repository');

    expect(profileLink).toBeInTheDocument();
    expect(repositoryLink).toBeInTheDocument();

    userEvent.type(input, 'https://github.com/facebook/react');

    expect(profileLink).toHaveAttribute('href', 'https://github.com/facebook');
    expect(repositoryLink).toHaveTextContent('react');
    expect(repositoryLink).toHaveAttribute('href', 'https://github.com/facebook/react');
  });
});
