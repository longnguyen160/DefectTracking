import styled, { css } from 'styled-components';

export const ListTableHeaderStyled = styled.div`
  display: flex;
  padding: ${props => props.padding || '7px 0'};
  border: 1px solid #cacaca;
  background-color: #f7f7f7;
`;

export const ListTableHeaderItemsStyled = styled.div`
  padding: 0px 10px;
  color: #626262;
  font-size: 12px;
  ${props => props.propertyType === 'Issue' && css`
    flex: 0 0 85px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `};
  ${props => props.propertyType === 'Name' && css`
    flex: 1;
  `};
  ${props => props.propertyType === 'Priority' && css`
    flex: 0 0 75px;    
  `};
  ${props => props.propertyType === 'Status' && css`
    flex: 0 0 100px;    
  `};
  @media (max-width: 1024px) {
    ${props => props.propertyType === 'Issue' && css`
      flex: 0 0 110px;
    `}
    ${props => props.propertyType === 'Priority' && css`
      flex: 0 0 110px;
    `}
  }
  @media (max-width: 680px) {
    ${props => props.propertyType === 'Issue' && css`
      flex: 0 0 85px;
    `}
    ${props => props.propertyType === 'Priority' && css`
      flex: 0 0 45px;   
    `}
  }  
`;

export const ListTableBodyContainerStyled = styled.div`
  display: block;
  overflow-y: auto;
  height: calc(100vh - ${props => props.activity ? '127px' : '176px'});
  ${props => props.willChange && css`
    will-change: transform;
  `}
  ${props => props.borderTop && css`
    border-top: 1px solid #d1d1d1;
  `}
  ${props => props.dynamicHeight && css`
    max-height: calc(100vh - ${props => props.activity ? '145px' : '176px'});
    min-height: 100px;
    height: 100%;
  `}
  ${props => props.height && css`
    height: calc(100vh - ${props.height});
  `}
`;

export const ListTableStyled = styled.div`
  background-color: ${props => props.odd ? '#f7f7f7' : '#fff'};
  min-height: 55px;
  width: 100%;
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
  
  ${props => props.done && css`
    text-decoration: line-through;
  `}
  ${props => props.color && css`
    border-left-color: ${props.color};
  `}
  &:hover{
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    transition: all 250ms ease-in;
    z-index: 999;
    ${props => props.fixed && css`
      position: fixed;
    `}    
  }
  ${props => props.showList && css`
    min-height: 55px;
    padding: 0px;
    align-items: center;
  `};
  ${props => props.top && css`
    align-items: flex-start;
  `};
  background-color: ${({ isDragging }) => (isDragging ? 'rgb(185, 244, 188)' : 'white')};
  box-shadow: ${({ isDragging }) => (isDragging ? '2px 2px 1px rgba(0,0,0,0.2)' : 'none')};
  ${props => props.noBackground && css`
    background-color: inherit;
  `}
`;

export const ListTableBodyItemStyled = styled.div`  
  display: ${props => props.display || 'flex'};
  padding: 0px 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  
  ${props => props.flex && css`
    flex: ${props.flex};
  `}

  ${props => props.propertyType === 'Issue' && css`
    flex: 0 0 85px;
    padding: 0 5px 0 10px;
  `}
  
  ${props => props.propertyType === 'Name' && css`
    flex: 1;
  `}
  
  ${props => props.propertyType === 'Priority' && css`
    flex: 0 0 75px;    
    justify-content: center;
  `}
  
  ${props => props.propertyType === 'Status' && css`
    flex: 0 0 100px;    
  `}
  
  ${props => props.container && css`
    flex-direction: column;
  `}
  
  ${props => props.noPadding && css`
    padding: 0;
  `}
`;
