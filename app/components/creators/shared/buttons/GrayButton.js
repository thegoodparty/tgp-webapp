import styled from 'styled-components';
import MediumButton from './MediumButton';

const GrayButton = styled(MediumButton)`
  && {
    background-color: ${({ theme }) => theme.creators.colors.lightGray};
    margin-right: 1rem;
  }
`;

export default GrayButton;


