import styled from 'styled-components';

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2.5rem;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    margin-top: 0rem;
  }
`;

export default FooterWrapper;
