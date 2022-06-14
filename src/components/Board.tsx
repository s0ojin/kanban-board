import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  width:300px;
  padding: 20px 10px;
  padding-top: 20px; 
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
`;

const DroppableArea = styled.div`
  background-color: blue;
  flex-grow: 1;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({toDos, boardId}:IBoardProps) {
  return(    
    <Wrapper>
      <Title>{boardId}</Title>      
      <Droppable droppableId={boardId}>
        {(provided)=>
          <DroppableArea 
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
              {toDos.map((toDo, index) => (
                <DraggableCard key={toDo} toDo={toDo} index={index} />
                )
              )}
              {provided.placeholder}
          </DroppableArea>
        }
      </Droppable>
    </Wrapper>
  )
}

export default Board;