import styled from 'styled-components';
import PurpleButton from './PurpleButton';

const BlackButton = styled(PurpleButton)`
  && {
    background: #000;
    color: #fff;
    border-color: #000;
    transition: background-color 0.4s, color 0.4s;

    &:hover {
      background: #222;
      color: #fff;
      border-color: #222;
    }

    &.outlined, &.outline {
      background: #fff;
      color: #000;
      &:hover {
        background: #999;
        color: #fff;
        border-color: #999;
      }
    }
    &.Mui-disabled {
      background: #ccc;
      border-color: #aaa;
    }

    &.pill {
      border-radius: 30px;
      padding: 16px 40px;
    }
  }
`;

export const InnerButton = styled.div`
  padding: 0 24px;
`;

export default BlackButton;
