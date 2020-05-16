import styled from 'styled-components';
import { Body } from '../../typography';

const Title = styled(Body)`
  color: #000;
  line-height: 130%;
  text-transform: none;
  margin-top: 0;
  margin-bottom: 2.5rem;
  text-align: left;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }
`;

export default Title;
