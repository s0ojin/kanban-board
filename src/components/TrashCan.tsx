import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";


const TrashCanWrapper = styled.div<ITrashCanWrapperProps>`
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: ${(props)=>props.isDraggingOver ? "60px" : "50px"};
  height: ${(props)=>props.isDraggingOver ? "60px" : "50px"};
  border-radius: ${(props)=>props.isDraggingOver ? "30px" : "25px"};
  svg{
    path{
      fill: ${(props)=>props.theme.bgColor};
    }
  }
`;

interface ITrashCanWrapperProps {
  isDraggingOver: boolean;
}

function TrashCan() {
  return(
    <Droppable droppableId="trashcan">
      {(provided, snapshot) =>
      <>
        <TrashCanWrapper 
          isDraggingOver={snapshot.isDraggingOver}
          ref={provided.innerRef} 
          {...provided.droppableProps}
          >
          <FontAwesomeIcon 
            icon={faTrashCan}
            size="lg"
          />
          <span style={{ display: 'none' }}>{provided.placeholder}</span>
        </TrashCanWrapper>
      </> 
      }
    </Droppable>
  )
}

export default TrashCan;