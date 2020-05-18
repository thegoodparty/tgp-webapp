import styled from 'styled-components';
import MediumButton from './MediumButton';

const GrayButton = styled(MediumButton)`
  && {
    background-color: ${({ theme }) => theme.creators.colors.lightGray};
    margin-right: 1rem;
    @media only screen and (max-width: ${({ theme }) =>
        theme.breakpoints.contentMax}) {
      font-size: 13px;
    }
  }
`;

export default GrayButton;
