import styled from 'styled-components';

export const ProfilePageStyled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export const ProfileDetailsStyled = styled.div`
  padding: 30px 20px;
  background: #fff;
  box-shadow: 0px 0px 50px -10px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  min-width: 320px;
  max-width: 600px;
  width: 100%;
`;
export const ProfileDetailsRowStyled = styled.div`
  display: initial;
`;
export const ProfileDetailsGroupStyled = styled.div`
  display: flex;
  font-size: 13px;
`;
export const ProfileDetailsLineStyled = styled.div`
  display: flex;
  margin: 0px 0px 10px 0px;
  font-size: 13px;
  align-items: center;
  flex: 1;
  position: relative;
  input, select {
    background: #fff;
    border: 1px solid #d1d1d1;
    padding: 5px 8px;
    color: #626262;
    font-style: italic;
    border-radius: 3px;
    width: 100%;
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
  ${props => props.hasTitle && css`
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
    input{
      border: 1px solid #626262;
      font-style: normal;
      padding: 8px;
    }
  `}
`;