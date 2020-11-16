import styled from 'styled-components';

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray4};
  font-size: 23px;
  line-height: 30px;
  font-weight: 500;
  margin: 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 33px;
    line-height: 43px;
  }
`;

export default Subtitle;
