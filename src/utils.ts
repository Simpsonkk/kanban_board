import { IssueColumns } from './types/issue-columns.type';
import { Issue } from './types/issue.type';

export const formatDate = (date: string): string =>
  new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

export const mergeArrays = (actionPayload: Issue[], currentRepo: IssueColumns) => {
  for (let i = actionPayload.length - 1; i >= 0; i--) {
    const id = actionPayload[i].id;
    const obj = actionPayload[i];
    let itemFound = false;

    for (const key in currentRepo) {
      if (currentRepo.hasOwnProperty(key)) {
        const repoItem = currentRepo[key].items;
        if (Array.isArray(repoItem) && repoItem.find((item) => item.id === id)) {
          itemFound = true;
          break;
        }
      }
    }

    if (!itemFound) {
      const firstRepoKey = Object.keys(currentRepo)[0];
      currentRepo[firstRepoKey].items.unshift(obj);
    }
  }

  return currentRepo;
};
