import styled from 'styled-components';
import MediumButton from './MediumButton';

const BlueButton = styled(MediumButton)`
  && {
    background-color: ${({ theme }) => theme.colors.blue};
    @media only screen and (max-width: ${({ theme }) =>
        theme.breakpoints.contentMax}) {
      font-size: 13px;
    }
  }
`;

export default BlueButton;
