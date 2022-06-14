import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;


function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info:DropResult) => {
    const {destination, source, draggableId} = info;
    if( !destination) return;
    if( destination.droppableId === source.droppableId )
    setToDos((allBoards)=>{
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId] : boardCopy
        };
    })
    if( destination.droppableId !== source.droppableId )
      setToDos((allBoards)=>{
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, draggableId)
        return {
          ...allBoards,
          [source.droppableId] : sourceBoard,
          [destination.droppableId] : destinationBoard
        }
      })
  }
  return(
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map(boardId => <Board boardId={boardId} toDos={toDos[boardId]} key={boardId} />)}
        </Boards>
      </Wrapper>
    </DragDropContext>
  )
}

export default App;
