import styled from 'styled-components';
import { Button } from '@material-ui/core';

const ProjectButton = styled(Button)`
  && {
    padding: 1rem 2rem;
    font: normal bold 17px normal;
    font-family: unset;
    color: ${({ theme }) => theme.colors.blue};
    text-transform: uppercase;
    background-color: #fff;
    line-height: 100%;
    border-radius: 2rem;
    @media only screen and (max-width: ${({ theme }) =>
        theme.breakpoints.contentMax}) {
      font-size: 13px;
      padding: 0.5rem 3rem;
      width: 100%;
    }
  }
`;

export default ProjectButton;
