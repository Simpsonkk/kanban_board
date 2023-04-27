import React, { ChangeEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchRepoIssues } from '../../store/api-actions/api-actions';
import {
  changeIssueLoadStatus, clearIssues, loadRepositoryName
} from '../../store/issue-slice/issue-slice';
import { getRepositoryName } from '../../store/selectors';

function RepoIssueSearchForm(): JSX.Element {
  const [currentRepoName, setCurrentRepoName] = useState<string>('');
  const dispatch = useAppDispatch();
  const previousRepoName = useAppSelector(getRepositoryName);

  const formatRepositoryName = (e: ChangeEvent<HTMLInputElement>) =>
    setCurrentRepoName(e.target.value.replace('https://github.com/', ''));

  const getIssues = () => {
    dispatch(clearIssues());
    dispatch(loadRepositoryName(currentRepoName));
    dispatch(changeIssueLoadStatus('loading'));
    dispatch(fetchRepoIssues({ currentRepoName, nextIssuePage: '1' }));
  };

  return (
    <div className="row justify-content-center mt-2" data-testid="searchForm">
      <div className="col-9">
        <input
          className="me-2 form-control form-control-lg"
          onChange={formatRepositoryName}
          placeholder="Enter repo URL"
        />
      </div>
      <button
        className="col-2 me-2 btn btn-secondary btn-sm"
        onClick={getIssues}
        disabled={previousRepoName === currentRepoName ? true : false}
      >
        Load Issues
      </button>
      <div className="d-flex col-11 ms-0 mt-2">
        <a
          className="text-decoration-none"
          href={`https://github.com/${currentRepoName.split('/')[0]}`}
          target="_blank"
          rel="noreferrer"
          data-testid="Profile"
        >
          {currentRepoName.split('/')[0] || 'Profile'}
        </a>
        <p className="ms-2 me-2">&gt;</p>
        <a
          className="text-decoration-none"
          href={`https://github.com/${currentRepoName}`}
          target="_blank"
          rel="noreferrer"
          data-testid="Repository"
        >
          {currentRepoName.split('/')[1] || 'Repository'}
        </a>
      </div>
    </div>
  );
}

export default RepoIssueSearchForm;
