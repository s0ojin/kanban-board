import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";
import TrashCan from "./components/TrashCan";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
    const {destination, source} = info;
    if( !destination ) return;
    if( destination.droppableId === "trashcan" )
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    else if( destination.droppableId === source.droppableId )
      setToDos((allBoards)=>{
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId] : boardCopy
        };
    })
    else if( destination.droppableId !== source.droppableId )
      setToDos((allBoards)=>{
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj)
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
        <TrashCan />
      </Wrapper>
    </DragDropContext>
  )
}

export default App;
