import styled from 'styled-components';
import { FormHelperText } from '@material-ui/core';

const ProjectFormHelperText = styled(FormHelperText)`
  && {
    font: normal normal 15px/20px normal;
    font-family: unset;
    color: ${({ theme }) => theme.creators.colors.gray};
    @media only screen and (max-width: ${({ theme }) =>
        theme.creators.breakpoints.creatorsMobile}) {
      font-size: 13px;
    }
  }
`;

export default ProjectFormHelperText;
