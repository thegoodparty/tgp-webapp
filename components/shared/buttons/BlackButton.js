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
  }
`;

export default BlackButton;
