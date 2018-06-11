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
    background-color: #d1d1d1;
    a{
      color: #626262;
    }
  }
  &:last-child{
    border-bottom: none;
  }
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

