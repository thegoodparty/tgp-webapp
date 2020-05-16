import styled from 'styled-components';

const Body = styled.p`
  text-transform: uppercase;
  color: ${({ theme }) => theme.creators.colors.lightGray};
  font: normal bold 2rem/2rem normal;
  margin: 0;
`;

export default Body;
