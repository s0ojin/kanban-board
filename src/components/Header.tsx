import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import CreateBoard from "./CreatBoard";
import { useRecoilState } from "recoil";
import { darkState } from "../atoms";

const Container = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;

const Logo = styled.div`
  width:120px;
  color: ${(props)=>props.theme.boardColor};
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 28px;
  letter-spacing: -1px;
  line-height: 80%;
  margin-left: 20px;
`;

const CreateBoardWrapper = styled.div`
  left:10px
`;

const ModeBtn = styled.div`
  width:120px;
  text-align: end;
  font-size: 30px;
  color: ${(props)=>props.theme.boardColor};
  margin-right: 20px;
  &:hover{
    color:#f1c40f;
    transition: color ease-in 0.3s
  }
`;

function Header() {
  const [ isDark , setMode ] = useRecoilState(darkState);
  const modeHandler = () => {
    setMode((prev)=>!prev)
  }
  return(
    <Container>
      <Logo>kanban<br/>board</Logo>
      <CreateBoardWrapper>
        <CreateBoard />
      </CreateBoardWrapper>
      <ModeBtn>
        <FontAwesomeIcon icon={ isDark ? faSun :faMoon} onClick={modeHandler}/>
      </ModeBtn>
    </Container>
  )

}

export default Header;