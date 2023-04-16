const ISSUE_ORDER = 'issue-order';

export const getIssueOrder = () => {
  const issueOrder = localStorage.getItem(ISSUE_ORDER);
  return issueOrder ?? '[]';
};

export const saveIssueOrder = (progress: any): void => {
  localStorage.setItem(ISSUE_ORDER, JSON.stringify(progress));
};
