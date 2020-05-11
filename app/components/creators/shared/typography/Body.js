import styled from 'styled-components';

const Body = styled.span`
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.lightGray};
    font: normal bold 2rem/2rem ${({ theme }) => theme.typography.creatorsFontFamily};
`;

export default Body;
