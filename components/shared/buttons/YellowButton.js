import styled from 'styled-components';
import BlackButton from './BlackButton';

const YellowButton = styled(BlackButton)`
  && {
    background: #FFE600;
    color: #000 !important;
    border: 2px solid #FFE600;

    &:hover {
      background: #d4c742;
      color: #000;
      border-color: #d4c742;
    }

    &.Mui-disabled {
      background: #ccc;
      border-color: #aaa;
    }
  }
`;

export default YellowButton;
