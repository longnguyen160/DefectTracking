import styled, { css } from 'styled-components';

export const SubSelectStyled = styled.div`
  display: none;
  position: absolute;
  ${props => props.fixedWidth ?
    css`
      width: 140px;
    `
  :
    css`
      max-width: 150px;
      width: 100%;    
  `};  
  overflow: auto;
  max-height: 250px;
  background: #fff;
  top: 40px;
  right: 0;
  z-index: 9;
  box-shadow: 3px 5px 10px -3px rgba(0, 0, 0, .5);
  border: 1px solid #d1d1d1;
`;

export const SubSelectListStyled = styled.section`
  font-size: 14px;
  padding: 8px 15px;
  color: #333333;
  border-bottom: 1px solid #d1d1d1;
  a{
    color: #333333;
  }
  &:hover{
    opacity: 0.7;
    a{
      color: #626262;
    }
  }
  &:last-child{
    border-bottom: none;
  }
  ${props => props.background && css`
    background: ${props.background};
  `}
  ${props => props.color && css`
    color: ${props.color};
  `}
`;

export const HeaderMainStyled = styled.div`
  display: flex;
  min-height: 40px;
  align-items: center;
  background-color: #026a95;
`;

export const HeaderMainBlockStyled = styled.div`
  display: flex;
  flex: 1;
  ${props => props.hasAuto && css`
    flex: 0 0 auto;
  `}
`;

export const HeaderMainItemsStyled = styled.section`
  display: flex;
  flex: 0 0 auto;
  padding: 0 15px;
  align-items: center;
  cursor: pointer;
  font-family: 'Proxima Nova bold';
  ${props => props.relative ? css`
    position: relative;
  ` : ''}
  ${props => props.create && css`
    & > i {
      font-size: 20px !important;
      margin: 0 !important;
    }
  `}
  & > a {    
    color: #91d3ee;
    &:hover {
      color: #fff;
    }
  }
  & > span {
    font-size: 11px;
    color: #91d3ee;
    text-transform: uppercase;
    transition: color 200ms;
    @media(max-width: 1024px){
      font-size: 10px;
    }
  }
  & > i {
    font-size: 9px;
    color: #91d3ee;
    transition: color 200ms;
    margin-right: 5px;
  }
  &:hover {
    ${props => props.hover && css`
      background-color: #015579;
    `}
    & > i {
      color: #fff;
    }
    & > span {
      color: #fff;
    }
    & > ${SubSelectStyled} {
      ${props => props.user && css`
        display: block;
      `}
      ${props => props.project && css`
        display: block;
      `}
      ${props => props.create && css`
        display: block;
      `}
    }
  }
  ${props => props.active && css`
    & > i {
      color: #fff;
    }
    & > span {
      color: #fff;
    }
  `}
  ${props => props.notification && css`
    position: relative;
    max-width: 55px;
    height: 40px;
    justify-content: center;
    & > i{
      margin-right: 0;
      font-size: 17px;
      color: #ffffff
    }
    & > span{      
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 10px;
      background: #ff3000;
      min-width: 17px;
      padding: 2px;
      border-radius: 5px;
      color: #ffffff;
      text-align: center;
      line-height: 11px;
    }
    &:after{
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      height: 40px;
      background-color: #015579;
      width: 1px;
    }
  `};
  ${props => props.filter && css`
    min-width: 55px;
    justify-content: center;

    & > i{
      margin-right: 0px;
    }
  `};
  ${props => props.info && css`
    position: relative;
    height: 40px;
    
    &:hover {
      color: #91d3ee;    
    }
    & > span{
      color: #fff;
      max-width: 140px;
      font-size: 13px;
      text-transform: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
    }
    & > i{
      margin-right: 0px;
      margin-left: 10px;
      font-size: 11px;
      color: #fff;
    }
    @media(max-width: 1080px){
      & > span{
        max-width: 90px;
      }
    }
  `};
  @media(max-width: 1170px){
    padding: 0 10px;
  }
  @media(max-width: 1024px){
    padding: 0 8px;
  }
  @media(max-width: 940px){
    ${props => props.general && css`
      display: none;
    `}
    ${props => props.mobileMenu && css`
      display: flex;
      position: relative;
    `}
  }
  @media(max-width: 480px){
    ${props => props.info && css`
      display: none
    `}
  }
`;

export const AngelUpStyled = styled.div`
  width: 0;
  height: 0;
  border-bottom: 8px solid #fff;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  margin-top: -8px;
  position: absolute;
  right: ${props => props.right};
  z-index: 2;
  cursor: pointer;
`;

export const LogoStyled = styled.text`
  font-size: 18px;
  color: #fff;
  font-family: 'Montserrat';
  font-weight: 700;
  a{
    color: #fff;
    &:hover{
      color: #fff;
    }
  }
`;

export const NotificationStyled = styled.div`
  position: absolute;
  display: block;
  z-index: 905;  
  top: 40px;
  right: 0;
  width: 344px;
  border-radius: 0;
  box-shadow: 0 2px 4px rgba(30, 30, 100, 0.25);
  padding: 0;
  background: #ffffff;
  border: 1px solid #b3b3b3;
  font-family: 'Proxima Nova Regular';
`;

export const NotificationHeader = styled.div`
  display: flex;  
  justify-content: space-between;  
  align-items: center;
  margin: 0;  
  padding: 8px 12px 6px;  
  border-bottom: 1px solid #dddfe2;  
  cursor: pointer;
  
  h3 {
    font-size: 13px;
    font-weight: 600;
    margin: 0;
  }
`;

export const NotificationHeaderAction = styled.div`
  color: #365899;
  
  span {
    cursor: pointer;
    font-size: 12px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const NotificationBody = styled.div`
  font-size: 13px;  
  display: block;  
  line-height: 15px;  
  font-weight: 400;
`;

export const NotificationBodyContent = styled.div`
  padding: 0;
  margin: 0;
`;

export const NotificationAction = styled.div`
  position: absolute;
  right: 10px;
  top: 8px;
  opacity: 0;

  i {
    color: #90949c;
    font-size: 10px;
    padding: 2px;
  }
`;

export const NotificationBodyContentMessage = styled.div`
  position: relative;
  display: flex;
  padding: 6px 30px 5px 12px;
  max-width: 350px;
  margin: 0;
  background-color: #fff;
  cursor: pointer;
  border-bottom: 1px solid #dadada;

  &:hover {
    background-color: #f6f6f7;

    ${NotificationAction} {
      opacity: 1;
    }
  }
  
  ${props => props.unread && css`
    background-color: #edf2fa;

    &:hover {
      background-color: #e5eaf2;
    }
  `}
`;

