import React from 'react';

import IssueTable from '../../components/issue-table/issue-table';
import RepoIssueSearchForm from '../../components/repo-issue-search-form/repo-issue-search-form';

function KanbanBoardPage(): JSX.Element {
  return (
    <div className="container">
      <RepoIssueSearchForm />
      <IssueTable />
    </div>
  );
}

export default KanbanBoardPage;
