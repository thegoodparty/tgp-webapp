import styled from 'styled-components';
import { Body18 } from '../../typography';

const ProjectFormLabel = styled(Body18)`
  color: black;
  text-transform: uppercase;
  font-weight: 600;
  margin-right: 0.5rem;
  &.collaborator {
    margin-bottom: 1rem;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    font-size: 15px;
  }
`;

export default ProjectFormLabel;
