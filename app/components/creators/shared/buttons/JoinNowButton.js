import styled from 'styled-components';
import { Button } from '@material-ui/core';

const JoinNowButton = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.colors.blue};
    color: #fff;
    font: normal bold 2rem normal;
    padding: 2rem 6rem;
    text-transform: uppercase;
    border-radius: 4rem;
    margin-bottom: 2rem;
    @media only screen and (max-width: ${({ theme }) =>
        theme.creators.breakpoints.creatorsContent}) {
      font-size: 1.6rem;
      padding: 1rem 3rem;
    }
    @media only screen and (max-width: ${({ theme }) =>
        theme.breakpoints.contentMax}) {
      padding: 1rem 5rem;
      font: normal normal 15px normal;
      margin-bottom: 1rem;
    }
  }
`;

export default JoinNowButton;
