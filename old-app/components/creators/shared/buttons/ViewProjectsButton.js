import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const ViewProjectsButton = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.colors.blue};
    color: #fff;
    font: normal bold 32px normal;
    font-family: unset;
    padding: 2rem 6rem;
    text-transform: uppercase;
    border-radius: 4rem;
    box-shadow: none;
    @media only screen and (max-width: ${({ theme }) =>
        theme.creators.breakpoints.creatorsTablet}) {
      font-size: 27px;
      padding: 1rem 3rem;
    }
    @media only screen and (max-width: ${({ theme }) =>
        theme.creators.breakpoints.creatorsMobile}) {
      padding: 1rem 5rem;
      font: normal normal 15px normal;
      font-family: unset;
    }
  }
`;

export default ViewProjectsButton;
