import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  @media screen and (max-width: 850px){
    width: 100%;
  }
`;
export const ButtonD  = styled.a`
  width: fit-content;
  text-decoration: none;
  font-size: 16px;
  border-radius: 5px;
  margin: 10px auto;
  padding: 10px 10px;
  background-color: #369336;
  display: none;
  color: white;
  &:hover{
    background-color: #307e30;
  }
  @media screen and (max-width: 850px){
    display: flex;
  }
`

export const ContainerD = styled.div`
  display: flex;
  max-width: 1170px;
  margin: 30px auto;
`;

export const InputUpdate = styled.input`
  width: 400px;
  max-width: 100%;
  height: 40px;
  outline: none;
  margin: 10px 20px;
`;

export const TextareaUpdate = styled.textarea`
  width: 400px;
  max-width: 100%;
  outline: none;
  margin: 10px 20px;
  min-height: 60px;
`;

export const SelectUpdate = styled.select`
    width: 400px;
    min-height: 30px;
  max-width: 100%;
  outline: none;
  margin: 10px 20px;
`
export const UProductContainer = styled.div`
  margin: 0px auto;
`;