import styled from 'styled-components';
import MediumButton from './MediumButton';

const BlueButton = styled(MediumButton)`
  && {
    background-color: ${({ theme }) => theme.colors.blue};
  }
`;

export default BlueButton;
