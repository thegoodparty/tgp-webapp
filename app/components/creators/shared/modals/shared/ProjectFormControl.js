import styled from 'styled-components';
import { FormControl } from '@material-ui/core';

const ProjectFormControl = styled(FormControl)`
  && {
    margin-bottom: 2.5rem;
    @media only screen and (max-width: ${({ theme }) =>
        theme.breakpoints.contentMax}) {
      margin-bottom: 1.5rem;
    }
  }
`;

export default ProjectFormControl;
