import { Droppable } from 'react-beautiful-dnd';

import { IssueColumn } from '../types/issue-columns.type';
import IssueList from './issue-list';

type IssueColumnsProps = {
  columnId: string;
  column: IssueColumn;
};

function IssueColumns({ columnId, column }: IssueColumnsProps): JSX.Element {
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
