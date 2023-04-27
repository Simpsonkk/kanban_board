import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { IssueColumn } from '../../types/issue-columns.types';
import { formatDate } from '../../utils/utils';

type IssueListProps = {
  column: IssueColumn;
};

function IssueList({ column }: IssueListProps): JSX.Element {
  return (
    <>
      {column.items.map((item, index) => {
        return (
          <Draggable key={item.id} draggableId={String(item.id)} index={index}>
            {(provided, snapshot) => {
              return (
                <div
                  className="text-white mb-2 p-1 rounded text-break"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    backgroundColor: snapshot.isDragging ? '#263B4A' : '#03845f',
                    ...provided.draggableProps.style,
                  }}
                  data-testid=""
                >
                  <p className="m-0 fw-bold">{item.title}</p>
                  <p className="mt-1 mb-1">
                    #{item.number}
                    {item.closed_at
                      ? ` was closed ${formatDate(item.closed_at)}`
                      : ` opened on ${formatDate(item.created_at)}`}
                  </p>
                  <p className="m-0">
                    User: {item.user.login} | Comments {item.comments}
                  </p>
                </div>
              );
            }}
          </Draggable>
        );
      })}
    </>
  );
}

export default IssueList;
