import styled from 'styled-components';
import { Body18 } from '../../typography';

const Blurb = styled(Body18)`
  margin: 1rem 0 3rem;
  @media only screen and (max-width: ${({ theme }) =>
        theme.creators.breakpoints.creatorsMobile}) {
    font-size: 15px;
  }
`;

export default Blurb;