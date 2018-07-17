import styled, { keyframes } from 'styled-components';

export const placeHolderShimmer = keyframes`
  0% {
    background-position: -468px 0
  }
  100% {
    background-position: 468px 0
  }
`;

export const PlaceHolder = styled.div`
  animation: ${placeHolderShimmer} 1s linear forwards infinite;
  background: #f6f7f8;
  background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #e8e8e8), color-stop(33%, #f3f3f3));
  background: -webkit-linear-gradient(left, #eeeeee 8%, #e8e8e8 18%, #f3f3f3 33%);
  background: linear-gradient(to right, #eeeeee 8%, #e8e8e8 18%, #f3f3f3 33%);
  -webkit-background-size: 800px 104px;
  background-size: 800px 104px;
  height: 25px;
  position: relative;
  margin-right: 5px;
`;
