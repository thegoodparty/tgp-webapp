import styled from 'styled-components';
import PurpleButton from './PurpleButton';

const GrayButton = styled(PurpleButton)`
  && {
    background: #d3d3d3;
    color: #000;
    border-color: #d3d3d3;
    transition: background-color 0.4s, color 0.4s;

    &:hover {
      background: #ccc;
      color: #000;
      border-color: #ccc;
    }
  }
`;

export default GrayButton;
