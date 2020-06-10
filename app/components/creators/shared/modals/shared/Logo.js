import styled from 'styled-components';

const Logo = styled.img`
  height: 97px;
  width: 120px;
  margin-bottom: 1.5rem;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    height: 80px;
    width: 100px;
  }
`;

export default Logo;