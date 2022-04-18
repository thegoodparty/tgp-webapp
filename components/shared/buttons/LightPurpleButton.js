import styled from 'styled-components';
import PurpleButton from './PurpleButton';

const LightPurpleButton = styled(PurpleButton)`
  && {
    background: ${({ theme }) => theme.colors.purple5};
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.purple5};
    transition: background-color 0.4s, color 0.4s;

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: #fff;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default LightPurpleButton;
