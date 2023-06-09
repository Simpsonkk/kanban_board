import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { IssueColumn } from '../../types/issue-columns.types';
import IssueList from '../issue-list/issue-list';
import Loader from '../loader/loader';

type IssueColumnsProps = {
  columnId: string;
  column: IssueColumn;
  isIssuesLoaded: string;
};

function IssueColumns({ columnId, column, isIssuesLoaded }: IssueColumnsProps): JSX.Element {
  if (isIssuesLoaded === 'loading') {
    return <Loader />;
  }

  return (
    <Droppable droppableId={columnId} key={columnId}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
              width: 350,
              height: 500,
              overflowY: 'auto',
            }}
            className="p-1 rounded"
            data-testid="droppable"
          >
            <IssueList column={column} />
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
}

export default IssueColumns;
