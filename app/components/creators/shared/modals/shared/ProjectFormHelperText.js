import styled from 'styled-components';
import { FormHelperText } from '@material-ui/core';

const ProjectFormHelperText = styled(FormHelperText)`
  && {
    font: normal normal 15px/20px normal;
    color: ${({ theme }) => theme.creators.colors.gray};
  }
`;

export default ProjectFormHelperText;

