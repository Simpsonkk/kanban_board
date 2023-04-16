import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { useAppSelector } from '../hooks';
import { getIssueOrder, saveIssueOrder } from '../services/issue-order';
import { getIssueColumns, getRepositoryName } from '../store/selectors';
import { IssueColumns as IssueColumnsState } from '../types/issue-columns.type';
import IssueColumns from './issue-colums';

function IssueTable(): JSX.Element {
  const repositoryName = useAppSelector(getRepositoryName);
  const issueColumns = useAppSelector(getIssueColumns);
  const [columns, setColumns] = useState<IssueColumnsState>(issueColumns);

  useEffect(() => {
    setColumns(issueColumns);
  }, [issueColumns]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const issueOrder = getIssueOrder();
    const repositories = JSON.parse(issueOrder);
    let currentRepo;

    if (!!repositories.length) {
      currentRepo = repositories.find((repo) => repo.repositoryName === repositoryName);
    } else {
      const newRepository = {
        repositoryName: repositoryName,
        displacedIssues: [],
      };
      repositories.push(newRepository);
      currentRepo = newRepository;
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = JSON.parse(JSON.stringify(sourceColumn.items));
      const destItems = JSON.parse(JSON.stringify(destColumn.items));
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });

      console.log('repositories', repositories);
      console.log('currentRepo', currentRepo);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = JSON.parse(JSON.stringify(column.items));
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }

    const currentIssue = currentRepo.displacedIssues.find(
      (issue) => issue.issueId === result.draggableId
    );
    if (currentIssue) {
      currentIssue.column = destination.droppableId;
      currentIssue.index = destination.index;
    } else {
      currentRepo.displacedIssues.push({
        issueId: result.draggableId,
        column: destination.droppableId,
        index: destination.index,
      });
    }
    saveIssueOrder(repositories);
  };

  return (
    <div className="d-flex justify-content-center">
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <div className="d-flex flex-column align-items-center" key={columnId}>
              <h2>{column.name}</h2>
              <div className="m-1">
                <IssueColumns columnId={columnId} column={column} />
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default IssueTable;
