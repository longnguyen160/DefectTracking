import styled, {css} from 'styled-components';

export const TooltipStyled = styled.div`
  position: relative;
`;

export const TooltipContentStyled = styled.div`
  position: absolute;
  background-color: #000;
  text-align: center;
  color: #fff;
  transform: translateX(-50%);
  white-space: nowrap;
  border-radius: 4px;
  padding: 6px 10px;
  
  &:before {
    content: "";
    position: absolute;
  }
  
  ${props => props.top && css`
    bottom: 100%;
    left: 50%;
    margin-bottom: 10px;
    
    &:before {
      top: 100%;
      left: 50%;
      margin-left: -4px;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid #000;
    }
  `}
  
  ${props => props.left && css`
    right: 100%;
    top: 50%;
    transform: translate(0, -50%);
    margin-right: 10px;
    
    &:before {
      left: 100%;
      top: 50%;
      margin-top: -8px;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid #000;
    }
  `}
`;
