import styled from 'styled-components';
import PurpleButton from './PurpleButton';

const PinkButton = styled(PurpleButton)`
  && {
    background: #ca2ccd;
    color: #fff;
    border-color: #ca2ccd;
    transition: background-color 0.4s, color 0.4s;

    &:hover {
      background: #d35ad6;
      color: #fff;
      border-color: #d35ad6;
    }

    &.outlined {
      background: #fff;
      color: #ca2ccd;
      &:hover {
        background: #999;
        color: #fff;
        border-color: #999;
      }
    }
  }
`;

export default PinkButton;
