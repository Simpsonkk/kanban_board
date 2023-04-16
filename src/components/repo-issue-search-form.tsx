import { ChangeEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchRepoIssues } from '../store/api-actions';
import { loadRepositoryName } from '../store/issue-slice';
import { getNextIssuePage } from '../store/selectors';

function RepoIssueSearchForm(): JSX.Element {
  const [repositoryName, setRepositoryName] = useState<string>('');
  const dispatch = useAppDispatch();
  const nextIssuePage = useAppSelector(getNextIssuePage);

  const formatrepositoryName = (e: ChangeEvent<HTMLInputElement>) =>
    setRepositoryName(e.target.value.replace('https://github.com/', ''));

  const getIssues = (pageNumber: string) => {
    dispatch(fetchRepoIssues({ repositoryName, nextIssuePage: pageNumber }));
    dispatch(loadRepositoryName(repositoryName.split('/')[1]));
  };

  return (
    <div className="row justify-content-center mt-2">
      <div className="col-7">
        <input
          className="me-2 form-control form-control-lg"
          onChange={formatrepositoryName}
          type="text"
          placeholder="Enter repo URL"
        />
      </div>
      <button className="col-1 me-2 btn btn-secondary btn-sm" onClick={() => getIssues('1')}>
        Load
      </button>
      <button
        className="col-1 btn btn-secondary btn-sm"
        onClick={() => getIssues(nextIssuePage)}
        disabled={!nextIssuePage ? true : false}
      >
        Load next issues
      </button>
      <div className="d-flex col-9 ms-0 mt-2">
        <a
          className="text-decoration-none"
          href={`https://github.com/${repositoryName.split('/')[0]}`}
        >
          {repositoryName.split('/')[0] || 'Profile'}
        </a>
        <p className="ms-2 me-2">&gt;</p>
        <a className="text-decoration-none" href={`https://github.com/${repositoryName}`}>
          {repositoryName.split('/')[1] || 'Repository'}
        </a>
      </div>
    </div>
  );
}

export default RepoIssueSearchForm;
