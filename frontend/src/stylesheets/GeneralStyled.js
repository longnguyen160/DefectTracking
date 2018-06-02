import styled, { css, keyframes } from 'styled-components';
import { SubSelectStyled, SubSelectListStyled } from './TopNavBar';

const zoomIn = keyframes`
 0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
            transform: scale3d(.3, .3, .3);
  }

  50% {
    opacity: 1;
  }
`;

export const FormStyled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: ${props => props.homepage ? `flex-start` : `center`};
  align-items: center;
  height: 100%;
  animation: ${zoomIn} 1s;
`;

export const PageStyled = styled.div`
  padding: 30px 20px;
  background: #fff;
  box-shadow: 0px 0px 50px -10px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  min-width: 320px;
  max-width: ${props => props.medium ? `700px` : `320px`};
  width: 100%;
  ${props => props.fixed && css`
    width: 700px;
    max-width: 700px;
    height: 568px;
  `};
  ${props => props.chatBox && css`
    width: 100%;
    max-width: 700px;
    height: 100%;
  `};
  @media(max-width: 700px) {
    padding: 0 0 35px;    
  }
`;

export const PageCustomStyled = styled.div`
  display: flex;
  justify-content: ${props => props.center ? 'center' : 'flex-start'};
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 20px;
  ${props => props.hasFlex && css`
    flex: 0.7;
  `}  
`;

export const PageBoardStyled = styled.section`
  display: flex; 
  width: 100%;
  padding: 15px;
  height: calc(100vh - 100px);
  overflow: hidden;
`;

export const PageBoardItemStyled = styled.div`
  flex: 1;
  margin: 0px 20px;
  
  ${props => props.activity && css`
    flex: 0.6;
  `};
  @media(max-width: 1024px){
    width: calc(100% - 30px);
    margin: 0 auto;
    float: none;
  }
  @media(max-width: 768px){
    width: calc(100% - 40px);
    margin: 0 20px 20px;
  }
`;


export const TitleAccountStyled = styled.div`
  margin: 0 0 20px 0;
  text-align: center;
  font-size: 23px;
  font-weight: 600;
  color: #026a95;
`;

export const TitleElementStyled = styled.div`  
  font-size: ${props => props.fontSize ? props.fontSize : '16px'};
  color: #626262;
  font-weight: ${props => props.fontWeight ? props.fontWeight : 600};
  flex: 1;
  ${props => !props.noPadding && css`
    padding: 10px;
  `}  
`;

export const DescriptionElementStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.history ? '0 10px' : '10px 15px'};
  font-size: 14px;
  color: #626262;
  line-height: 20px;
  width: 100%;
`;

export const ElementStyled = styled.div`
  display: ${props => props.wrapper ? 'flex' : 'block'};
  width: ${props => props.width ? props.width : '160px'};
  min-height: 100px;
  max-height: 300px;
  border-radius: 5px;
  background-color: #e6e6e6;
  margin: 10px;  
  cursor: pointer;
  ${props => props.padding && css`
    padding: 5px;
  `}
  
  ${props => props.created && css`
    display: flex;
    align-items: center;        
    text-align: center;
    & > ${TitleElementStyled} {
      font-size: 15px;
      font-weight: 400;
    }
  `}
  &:hover {
    & > ${TitleElementStyled} {
      color: #026a95;
    }    
    background-color: #d1d1d1;
  }
`;

export const ProjectWrapperELementStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ProjectTitleElementStyled = styled.span`
  font-weight: bold;
  text-align: right;
  color: #000000;
`;

export const ElementHeaderStyled = styled.div`
  display: flex;  
  width: 100%;  
  padding: 5px;
  align-items: center;
`;

export const UserElementStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > div {
    display: flex;
    flex-direction: column;
  }
`;

export const UserActionElementStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const UsernameElementStyle = styled.span`
  font-weight: bold;
  font-size: 13px;
  color: #626262;
`;

export const TimeElementStyle = styled.span`
  color: rgba(0,0,0,.5);
  font-size: 12px;
`;

export const FormBlockStyled = styled.div`
  ${props => props.auto && css`
    margin: auto;
    width: 50%;
  `}  
  ${props => props.show ? css`
    display: initial;    
  ` :
  css`
    display: none;
  `}
  ${props => props.fullWidth && css`
    width: 100%;    
  `}
  ${props => props.userList && css`
    
  `}
`;

export const FormGroupStyled = styled.div`
  display: flex;
  font-size: 13px;
  overflow-y: auto;
  ${props => props.padding && css`
    padding: 10px;
  `}
  ${props => props.right && css`
    justify-content: flex-end;
  `};
  ${props => props.border && css`
    border-bottom: 1px solid #626262;
    margin: 10px 0;    
  `};
  ${props => props.margin && css`
    margin: 10px 0;
  `};
  @media(max-width: 700px) {
    ${props => props.input && css`
      padding: 0 5px;    
    `};
  }
`;

export const LineFormStyled = styled.div`
  display: flex;
  margin: 0 0 10px 0;
  font-size: 13px;
  align-items: center;
  flex: 1;
  position: relative;
  .react-select__menu {
    position: relative;
  }  
  textarea, input, select {
    background: #fff;
    border: 1px solid #d1d1d1;
    padding: 5px 8px;
    color: #626262;
    font-style: italic;
    border-radius: 3px;
    font-size: 13px;
    width: ${props => props.autoWidth ? 'auto' : '100%'};
    ${props => props.noMargin && css`
      margin: 0 5px;
    `}
    &:focus{
      border-color: #036a95;
      outline: 0;
    }
  }
  .icon-cl-expand{
    font-size:  8px;
    color: #036a95;
    cursor: pointer;
    &:hover{
      color: #333;
    }
  }
  span[name="calendar"]{
    font-size: 12px;
    padding: 3px 10px;
    position: absolute;
    top: -14px;
    left: -36px;
    display: flex;
    height: 28px;
    border-radius: 0px 2px 2px 0px;
    align-items: center;
  }
  ${props => props.alignCenter && css`
    justify-content: center;
  `}
  ${props => props.image && css`
    height: 100%;    
    align-items: center !important;
  `}
  ${props => props.hasTitle && css`
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
    textarea, input{
      border: 1px solid #626262;
      font-style: normal;
      padding: 8px;
    }
    i {
      margin-right: 5px;
    }
  `}
  ${props => props.right && css`
    align-items: flex-end;
  `}
  ${props => props.noMargin && css`
    margin: 0;    
  `}
  ${props => props.center && css`
    align-items: center;
  `}
  ${props => props.margin && css`
    margin-bottom: 10px;
  `}
  ${props => props.hover && css`
    &:hover {
      color: #026a95;
      cursor: pointer;
    }
  `}
  ${props => props.position === 'left' ? css`
    align-items: flex-start;
  ` :
  props.position === 'right' && css`
    align-items: flex-end;
  `}
  ${props => props.pointer && css`
    cursor: pointer;
  `}
`;

export const TitleFormStyled = styled.span`
  margin-bottom: 5px;
  font-weight: 600;
  ${props => props.question && css`
    font-size: 17px;
    color: #026a95;
  `}
  ${props => props.nameService && css`
    font-size: 23px;
  `}
  ${props => props.description && css`
    font-size: 20px;
    font-weight: 300;
  `}
  ${props => props.price && css`
    font-size: 20px;
    color: #026a95;    
  `}
  ${props => props.duration && css`
    font-size: 20px;
    color: #fe8f00;    
  `}
  ${props => props.divide && css`
    font-size: 20px;
    margin: 0 5px;    
  `}
`;

export const Image = styled.img`
  width: 80%;
  height: 80%;
  object-fit: cover;
  margin-bottom: 5px;
  
  ${props => props.project && css`
    width: 30px;
    height: 30px;
    margin: 0 5px;
  `}
  ${props => props.topNav && css`
    width: 30px;
    height: 30px;
    margin: 0 5px;
    border-radius: 25px;
  `}
  ${props => props.search && css`
    width: 50px;
    height: 50px;
    margin: 0 5px;
    border-radius: 25px;
  `}
`;

export const TextErrorStyled = styled.span`
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: default;
  color: red;
  display: inline-block;
  min-height: 13px;
`;

export const Input = styled.input`
  font-size: ${props => props.fontSize || '1.25em'};
  padding: ${props => props.padding || '0.5em'};
  color: #000;
  background: #fff;
  border: none;
  border-radius: 3px;
  width: 280px;
  transition: all 0.3s ease;
  outline: none;
  &:hover {
    border: 1px solid #026a95;
  }
  &:focus{
    outline :none;
    border: 1px solid #026a95;
  }

`;

export const TextArea = styled.textarea`
  font-size: 1.25em;
  padding: 0.5em;
  color: #000;
  background: #fff;
  border: none;
  border-radius: 3px;
  width: 100%;  
  transition: all 0.3s ease;
  height: 70px;
  resize: none;
  &:hover {
    border: 1px solid #026a95;
  }
  &:focus{
    outline :none;
    border: 1px solid #026a95;
  }
`;

export const Label = styled.label`
  width: 100%;
  text-align: center;
  margin-top: ${props => props.error ? '' : '10px'};
  transition: all 0.3s ease;
  cursor: ${props => props.error ? 'normal' : 'pointer'};
  color: ${props => props.error ? 'red' : 'black'};
  a{
    color: black
  }
  a:hover{
    color: #026a95
  }
`;

export const FilterBoxStyled = styled.div`
  display: block;  
  padding: 4px 0;
  font-size: 13px;
  width: 110px;
  ${props => props.showFilter && css`
    & > ${SubSelectStyled} {
      display: block;
      max-width: 110px;
      border: none;
      top: 31px;
      
      & > ${SubSelectListStyled} {
        font-size: 13px;
        padding: 3px 10px;
        display: flex;
        align-items: center;
        
        span {
          flex: 1
        }
        
        i {
          color: #00c056;
        }
      }
    }
  `}
  span {
    margin-right: 3px;
  }
`;

export const FilterBoxTopStyled = styled.div`
  padding: 0 10px;
  border-left: 1px solid #ccd3d3;
  display: flex;
  align-items: center;
  
  span {
    flex: 1;
  }
`;

export const FilterBoxWrapperStyled = styled.div`
  display: flex;
  flex: 1;
`;

export const InputSearchStyled = styled.div`
  width: 100%;
  display: flex;
  height: 22px;
  background-color: #fff;
  border-radius: 5px 0 0 5px;
  font-family: 'Proxima Nova Regular';
  input {
    &:hover {
      border: none;
    }
    &:focus {
      border: none;
    }
  }
`;

export const Icon = styled.i`
  margin-right: 5px;
`;

export const Svg = styled.svg`
  display: inline-block;
  vertical-align: middle;
  ${props => props.margin && css`
    margin: ${props.margin} !important;
  `};
  margin-right: ${props => props.marginRight ? `${props.marginRight}px` : '5px'};
  padding: ${props => props.padding};
  width: ${props => props.width ? `${props.width}px` : '16px'};
  height: ${props => props.height ? `${props.height}px` : '16px'};
  fill: ${props => props.color};
  ${props => props.rotated && css`
    transform: rotateX(180deg);
  `}
`;
