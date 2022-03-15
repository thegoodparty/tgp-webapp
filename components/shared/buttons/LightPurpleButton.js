import styled from 'styled-components';
import PurpleButton from './PurpleButton';

const LightPurpleButton = styled(PurpleButton)`
  && {
    background: z;
    color: ${({ theme }) => theme.colors.purple};
    border-color: ${({ theme }) => theme.colors.purple5};
    transition: background-color 0.4s, color 0.4s;

    &:hover {
      background: ${({ theme }) => theme.colors.purple};
      color: #fff;
      border-color: ${({ theme }) => theme.colors.purple};
    }
  }
`;

export default LightPurpleButton;
