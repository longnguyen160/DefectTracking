import styled, { css } from 'styled-components';

export const SideBarMainStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;  
  min-width: 200px;
  top: 0;
  justify-content: flex-start;
  margin: 20px 20px 0;
  font-size: 15px;  
  position: sticky;
`;

export const SideBarMainBlockStyled = styled.div`
  display: flex;  
  height: 40px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 5px;
  cursor: pointer;

  &:hover {
    background-color: #d1d1d1;
  }
  ${props => props.selected && css`
    background-color: #e6e6e6;
    font-weight: bold;
  `}
`;
