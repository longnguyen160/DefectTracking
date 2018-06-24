import styled, { keyframes, css } from 'styled-components';

export const AlanWalker = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const MichaelJackson = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const SlideOpen = keyframes`
  0% {
    top:-300px;
    opacity:0
  }
  100% {
    top:0;
    opacity:1
  }
`;

export const MyModal = styled.div`  
  position: fixed;
  z-index: 1000;
  display: ${props => props.isOpen === true ? 'flex' : 'none'};
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;  
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  animation: ${AlanWalker} 1s;    
`;

export const ModalContent = styled.div`
  padding: 20px 20px;
  background: #fff;
  box-shadow: 0px 0px 50px -10px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  min-width: 320px;
  max-width: ${props => props.maxWidth ? props.maxWidth : '320px'};
  width: 100%;  
  max-height: 600px;
  overflow-y: auto;
  ${props => props.noScroll && css`
    overflow: visible;
  `}
  ${props => props.isHidden && css`
    overflow: hidden;
  `}
  ${props => props.fullHeight && css`
    height: 100%;
  `}
`;

export const ModalHeaderStyled = styled.div`
  display: flex;
  margin-bottom: 10px;
  ${props => props.noMargin && css`
    margin: 0;
  `}
  padding: ${props => props.padding ? props.padding : '0'};
`;

export const ModalHeaderTitleStyled = styled.div`
  flex: 1;
  font-size: 16px;
  font-family: Proxima Nova bold;
  font-weight: bold;  
  p {
    color: crimson;
  }
  ${props => props.flex && css`
    flex: ${props.flex}
  `}
`;

export const ModalBodyStyled = styled.div`
  display: flex;
  overflow: auto;
  height: 100%;
  ${props => props.padding && css`
    padding: ${props.padding};
  `}
`;

export const ModalContentStyled = styled.div`
  display: block;  
  ${props => props.flex && css`
    flex: ${props.flex};    
  `}
  ${props => props.padding && css`
    padding: ${props.padding}
  `}
  ${props => props.fullWidth && css`
    width: 100%;
  `}
`;

export const ModalLineStyled = styled.div`
  margin-bottom: 15px;
  ${props => props.hasRows && css`
    flex-direction: row;
    display: flex;
    
    & > ${ModalLineContentStyled} {
      padding: 5px;
      ${props => props.noPadding && css`
        padding: 0;
      `}     
    }
  `}
  ${props => props.noMargin && css`
    margin: 0;
  `}
  ${props => props.padding && css`
    padding: ${props.padding};
  `}
  ${props => props.multipleLine && css`
    & > div:first-child {
      display: flex;
      div {
        flex-basis: 15%;
      }
    }
    & > div:nth-child(2) {
      max-height: 120px;
      overflow-y: auto;
      overflow-x: hidden;
      div {
        display: flex;

        div {
          flex-basis: 15%;
        }
      }
    }
  `}
  ${props => props.actionModal && css`
    align-items: flex-end;
  `}

  ${props => props.LineSingle && css`
      margin-bottom: 0px;
  `}
  ${props => props.hasDottedLine && css`
    position: relative;
    padding-bottom: 8px;
    &:after{
      content: '';
      position: absolute;
      right: 15px;
      background-position: bottom center;
      background-image: linear-gradient(to right,#c7c7c7 20%,rgba(255,255,255,0) 0%);
      background-size: 4px 1px;
      background-repeat: repeat-x;
      width: calc(100% - 15px);
      height: 1px;
      left: 0px;
      bottom: -5px;
    }
  `}

  ${props => props.infoPrimary && css`
    margin-bottom: 20px;
  `}
`;

export const ModalLineTitleStyled = styled.div`
  font-family: Proxima Nova bold;
  font-size: 13px;
  margin-bottom: 3px;
  color: #7f7f7f;
  font-weight: 600;
  ${props => props.fullInput && css`
    width: 100%;
    margin-top: 8px;
    margin-bottom: 0px;
    & > div{
      margin-bottom: 0px;
    }
    input{
      min-height: 35px;
    }
  `}
  ${props => props.autoWith && css`
    width: auto;
  `}
  ${props => props.hover && css`
    &:hover {
      color: #026a95;
      cursor: pointer;
    }
  `}
`;

export const ModalLineContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${props => props.hasOverflow && css`
    overflow: hidden;
  `}  

  svg {
    margin: 0 5px;  
  }
  
  img{
    max-width: 75px;
    margin: 0 5px;
  }
  ${props => props.messageError && css`
    color: #ff3000;
    font-style: italic;
    border: 1px solid #ff3000;
    padding: 7px;
  `}
  ${props => props.hasDottedLine && css`
    position: relative;
    margin-right: 15px;
    &:after{
      content: '';
      position: absolute;
      right: 0px;
      background-position: top center;
      background-image: linear-gradient(to bottom,#b0b0b0 20%,rgba(255,255,255,0) 0%);
      background-size: 1px 4px;
      background-repeat: repeat-y;
      width: 1px;
      height: 100%;
      top: 0px;
    }
  `}
  ${props => props.widthFixed && css`
    flex: 0 0 110px;
    align-items: left;
    padding-right: 10px;
  `}
  ${props => props.flexWidth && css`
    flex: 0 0 ${props.flexWidth};
    align-items: left;
  `}
  ${props => props.hasRows && css`
    flex-direction: row;
  `}
  ${props => props.alignLeft && css`
    align-items: left;
  `}
  ${props => props.alignCenter && css`
    align-items: center;
    [class^="icon-"], [class*=" icon-"]{
      margin-right: 5px;
      font-size: 13px;
      color: #7f7f7f;
    }
    .icon-cl-visa{
      font-size: 24px;
      margin-right: 10px;
      color: #b7b7b7;
    }
  `}

  ${props => props.widthAuto && css`
      flex: 0 0 auto;
  `}

  ${props => props.numberText && css`
    font-family: Proxima Nova bold;
    font-size: 18px;
    color: #0083b9;
  `}
  ${props => props.numberTextPrimary && css`
    font-family: Proxima Nova bold;
    font-size: 18px;
    color: ${props.theme.BorderColorPrimary};
  `}
  ${props => props.numberTextBlack && css`
    font-family: Proxima Nova bold;
    font-size: 18px;
    color: #333333;
  `}
  ${props => props.EmailTextBlack && css`
    font-family: Proxima Nova bold;
    font-size: 18px;
    color: #333333;
  `}
`;
