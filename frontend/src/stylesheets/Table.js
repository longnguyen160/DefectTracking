import styled, { css } from 'styled-components';

export const ListTableHeaderStyled = styled.div`
  display: flex;
  padding: 7px 0px;
  border: 1px solid #cacaca;
  background-color: #f7f7f7;
`;

export const ListTableHeaderItemsStyled = styled.div`
  padding: 0px 10px;
  color: #626262;
  font-size: 12px;
  ${props => props.itemId && css`
    flex: 0 0 85px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `};
  ${props => props.title && css`
    flex: 1;
  `};
  ${props => props.priority && css`
    flex: 0 0 55px;
    padding: 0px 5px 0px 0px;
  `};
  @media (max-width: 1024px) {
    ${props => props.itemId && css`
      flex: 0 0 110px;
    `}
    ${props => props.priority && css`
      flex: 0 0 110px;
    `}
  }
  @media (max-width: 680px) {
    ${props => props.itemId && css`
      flex: 0 0 85px;
    `}
    ${props => props.priority && css`
      flex: 0 0 45px;   
    `}
  }  
`;

export const ListTableBodyContainerStyled = styled.div`
  display: block;
  overflow-y: auto;
  height: calc(100vh - ${props => props.activity ? '145px' : '176px'});
  ${props => props.borderTop && css`
    border-top: 1px solid #d1d1d1;
  `}  
`;

export const ListTableBodyStyled = styled.div`
  cursor: pointer;
  display: flex;
  padding: 5px 0px;
  border: 1px solid #cacaca;
  border-left-width: 2px;  
  border-top-color: transparent;
  width: 100%;
  
  min-height: 51px;
  &:hover{
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    transition: all 250ms ease-in;
    z-index: 999;    
  }
  ${props => props.list && css`
    min-height: 55px;
    padding: 0px;
    align-items: center;
  `}  
`;

export const ListTableBodyItemStyled = styled.div`
  display: flex;
  padding: 0px 5px;
  overflow: hidden;
  text-overflow: ellipsis;

  ${props => props.itemId && css`
    flex: 0 0 85px;
    padding: 0 5px 0 10px;
  `}
  ${props => props.title && css`
    flex: 1;
  `}
  ${props => props.priority && css`
    flex: 0 0 55px;    
    font-family: "Proxima Nova bold";
    padding: 0px 5px 0px 0px;    
  `}
`;
