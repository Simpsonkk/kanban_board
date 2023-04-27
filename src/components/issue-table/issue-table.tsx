import React, { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIssueOrder, saveIssueOrder } from '../../services/issue-order';
import { checkNewIssues, fillIssues } from '../../store/issue-slice/issue-slice';
import { getIssueColumns, getLoadedDataStatus, getRepositoryName } from '../../store/selectors';
import IssueColumns from '../issue-columns/issue-columns';

function IssueTable(): JSX.Element {
  const repositoryName = useAppSelector(getRepositoryName);
  const issueColumns = useAppSelector(getIssueColumns);
  const isIssuesLoaded = useAppSelector(getLoadedDataStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isIssuesLoaded === 'loaded') {
      dispatch(checkNewIssues(issueColumns));
    }
  }, [isIssuesLoaded]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const repositories = JSON.parse(getIssueOrder());

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = issueColumns[source.droppableId];
      const destColumn = issueColumns[destination.droppableId];
      const sourceItems = JSON.parse(JSON.stringify(sourceColumn.items));
      const destItems = JSON.parse(JSON.stringify(destColumn.items));
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      const newColumnsState = {
        ...issueColumns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      };
      dispatch(fillIssues(newColumnsState));
      repositories[repositoryName] = newColumnsState;
    } else {
      const column = issueColumns[source.droppableId];
      const copiedItems = JSON.parse(JSON.stringify(column.items));
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      const newColumnsState = {
        ...issueColumns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      };
      dispatch(fillIssues(newColumnsState));
      repositories[repositoryName] = newColumnsState;
    }
    saveIssueOrder(repositories);
  };

  return (
    <div className="d-flex justify-content-center row" data-testid="issueTable">
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        {Object.entries(issueColumns).map(([columnId, column]) => {
          return (
            <div className="d-flex flex-column align-items-center col" key={columnId}>
              <h2>{column.name}</h2>
              <div className="m-1">
                <IssueColumns columnId={columnId} column={column} isIssuesLoaded={isIssuesLoaded} />
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default IssueTable;
