import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{isDragging:boolean}>`
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  background-color: ${(props) => props.isDragging ? props.theme.bgColor : props.theme.cardColor};
  color: ${(props) => props.isDragging ? "white" : "black"};
  box-shadow: ${(props) => props.isDragging ? "0px 2px 5px black" : "none"};
`;

interface IDraggableCardProps{
  toDoId: number;
  toDoText: string;
  index:number;
}

function DraggableCard({toDoId, toDoText, index}:IDraggableCardProps) {
  return(  
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(provided, snapshot)=>
        <Card isDragging={snapshot.isDragging} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {toDoText}
        </Card>}
    </Draggable>
  )
}

export default React.memo(DraggableCard);