import styled, { css, keyframes } from 'styled-components';
import { SubSelectStyled, SubSelectListStyled } from './TopNavBar';
import Dropzone from "react-dropzone";

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
  @media(max-width: 700px) {
    padding: 0 0 35px;    
  }
`;

export const PageCustomStyled = styled.div`
  display: flex;
  justify-content: ${props => props.center ? 'center' : 'flex-start'};
  align-items: flex-start;
  flex-wrap: wrap;
  margin: ${props => props.margin ? props.margin : '20px'};
  ${props => props.hasFlex && css`
    flex: 0.7;
  `}
  ${props => props.showColumn && css`
    flex-direction: column;
  `}
`;

export const PageBoardStyled = styled.section`
  display: flex; 
  width: 100%;
  padding: 15px;
  height: calc(100vh - 100px);
  overflow: hidden;
  ${props => props.backlog && css`
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
  `}
  & > .ReactTable {
    flex: 1;
  }
  ${props => props.noPadding && css`
    padding: 0;
  `}
`;

export const PageBoardItemStyled = styled.div`
  flex: 1;
  margin: ${props => props.margin ? props.margin : '0px 20px'};
  
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
  flex: ${props => props.flex ? props.flex : 1};
  ${props => !props.noPadding && css`
    padding: 10px;
  `}
  ${props => props.padding && css`
    padding: ${props.padding};
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
  ${props => props.noPadding && css`
    padding: 0;
  `}
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

export const ElementHeaderStyled = styled.div`
  display: flex;  
  width: 100%;  
  padding: ${props => props.padding ? props.padding : '5px'};
  align-items: center;
  
  input {
    background: #fff;
    border: 1px solid #d1d1d1;
    padding: 5px 8px;
    color: #626262;
    font-style: italic;
    border-radius: 3px;
    font-size: 13px;
    width: 100%;
    
    &:focus{
      border-color: #036a95;
      outline: 0;
    }
  }  
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
  ${props => props.visible && css`
    overflow-y: visible;
  `}
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
  & > .Select {
    width: ${props => props.widthSelect ? props.widthSelect : '100%'};
    padding: ${props => props.paddingSelect ? props.paddingSelect : '20px 5px'};
  }
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
  color: initial;
  & > .Select {
    max-width: 240px;
    width: 100%;
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
  ${props => props.fullWidth && css`
    & > div {
      width: 100%;
    }
  `}
  ${props => props.reactSelect && css`
    input {
      padding: 0 !important;
    }
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
  ${props => props.avatar && css`
    width: 100px;
    height: 100px;
    margin: 5px;
  `}
  ${props => props.margin && css`
    margin: ${props.margin}
  `}
  ${props => props.dynamic && css`
    width: ${props.dynamic}
    height: ${props.dynamic}
    border-radius: 25px;
  `}
  ${props => props.noRadius && css`
    border-radius: 0;
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
  ${props => props.fullWidth && css`
    width: 100%;
  `}
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
  height: 80px;
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
    color: #026a95;
  }
`;

export const FilterBoxStyled = styled.div`
  display: block;  
  padding: ${props => props.padding || '4px 0'};
  font-size: 13px;
  width: 110px;
  position: relative;
  cursor: pointer;
  ${props => props.showFilter && css`
    & > ${SubSelectStyled} {
      display: block;
      max-width: ${props => props.fullWidth ? '100%' : '110px'};
      border: none;
      top: ${props => props.top || '22px'};
      
      & > ${SubSelectListStyled} {
        font-size: 13px;
        padding: ${props => props.childPadding || '3px 10px'};
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
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  ${props => props.background && css`
    background: ${props.background};
  `}
  ${props => props.color && css`
    color: ${props.color};
  `}
`;

export const FilterBoxTopStyled = styled.div`
  padding: 0 10px;
  border-left: 1px solid #ccd3d3;
  display: flex;
  align-items: center;
  
  ${props => props.noBorder && css`
    border: none;
  `};

  span {
    flex: 1;
  }
`;

export const FilterBoxWrapperStyled = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
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
    transform: ${props => props.rotate ? props.rotate : 'rotateX(180deg)'};
  `}
  ${props => props.hoverPointer && css`
    cursor: pointer;
    &:hover {
      fill: #d1d1d1;
    }
  `}
`;

export const TableBlockStyled = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-wrap: wrap;
  ${props => props.alignLeft && css`
    justify-content: flex-start;
  `}
`;

export const IssueStatusStyled = styled.div`
  display: block;
  padding: 10px;
  font-size: 14px;
  border-radius: 3px;
  font-family: 'Proxima Nova Bold';
  
  ${props => {
    if (props.status) {
      switch (props.status) {
        case 'To Do':
          return css`
            border: 1px solid #d1d1d1;
            background-color: #d1d1d1;
            color: #1a1a1a;   
          `;
        case 'In Progress':
          return css`
            border: 1px solid #026a95;
            background-color: #026a95;
            color: #fff;
          `;
        case 'Testing':
          return css`
            border: 1px solid #fe8f00;
            background-color: #fe8f00;
            color: #fff;
          `;
        case 'Done':
          return css`
            border: 1px solid #00c056;
            background-color: #00c056;
            color: #fff;
          `;
      } 
    }
  }} 
`;

export const AttachmentWrapperStyled = styled.div`
  height: 125px;
  width: 156px;
  padding: 5px;
`;

export const AttachmentContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: rgba(9, 30, 66, 0.2) 0px 1px 1px, rgba(9, 30, 66, 0.24) 0px 0px 1px 0px;
  border-radius: 3px;
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  cursor: pointer;
  line-height: normal;
  position: relative;
`;

export const AttachmentContentStyled = styled.div`
  border-radius: 3px;
  background: rgb(244, 245, 247) none repeat scroll 0% 0%;
  display: block;
  height: inherit;
  position: relative;
`;

export const AttachmentImageStyled = styled.div`
  border-radius: 3px;
  position: relative;
  width: inherit;
  height: inherit;
  display: block;
`;

export const AttachmentImageContentStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-repeat: no-repeat, repeat;
  background-position: center center, center center;
  background-size: cover, auto auto;
  
  img {
    max-width: 100% !important;
    margin: 0 !important;
    border-radius: 0 !important;
  }  
`;

export const AttachmentDetailsHeaderStyled = styled.div`
  box-sizing: border-box;
  overflow-wrap: break-word;  
  font-size: 12px;
  line-height: 18px;
  transition: opacity 0.3s ease 0s;
  color: ${props => props.color};
  visibility: hidden;
  opacity: 0;
  
  &:hover {
    opacity: 1;
    visibility: visible;
  }
`;

export const AttachmentDetailsBodyStyled = styled.div`
  opacity: 0;
  transition: transform 0.2s ease 0s, opacity 0.5s ease 0s;
  transform: translateY(35px);
  display: flex;
  align-items: center;  
  z-index: 1;
  height: 16px;
  color: ${props => props.color};
  font-size: 11px;
  
  &:hover {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const AttachmentDetailsStyled = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  transition: background 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s, border-color 0.3s ease 0s;
  background: transparent none repeat scroll 0% 0%;  
  border: 2px solid transparent;
  position: absolute;
  top: 0;
  left: 0;  
  justify-content: space-between;
  padding: 16px;
  
  &:hover {
    background-color: rgba(9, 30, 66, 0.5);
    
    & > ${AttachmentDetailsHeaderStyled} {
      opacity: 1;
      visibility: visible;
    }
    & > ${AttachmentDetailsBodyStyled} {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

export const AttachmentDetailsBodySizeStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const AttachmentDetailsBodyDeleteStyled = styled.div`

`;

export const LabelStyled = styled.div`
  display: block;
  padding: ${props => props.padding ? props.padding : '3px'};
  font-size: ${props => props.fontSize ? props.fontSize : '13'};
  border-radius: 3px;
  border: 1px solid ${props => props.color ? props.color : '#d1d1d1'};
  background-color: ${props => props.color ? props.color : '#d1d1d1'};
  color: ${props => props.textColor ? props.textColor : '#000'};
  text-align: center;
  margin: 0 3px;
`;

export const DropZoneStyled = styled(Dropzone)`
  background: #f8f8f8;
  border: 1px dashed #ddd;
  width: 100%;
  height: 35px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;
