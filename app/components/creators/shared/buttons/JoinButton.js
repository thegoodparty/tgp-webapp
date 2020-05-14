import styled from 'styled-components';
import { Button } from '@material-ui/core';

const JoinButton = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.colors.blue};
    color: #fff;
    font: normal bold 2rem normal;
    padding: 2rem 6rem;
    text-transform: uppercase;
    border-radius: 4rem;
    margin-top: 5rem;
    margin-bottom: 2rem;
  }
`;

export default JoinButton;
