/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import styled from 'styled-components';
import Nav from 'containers/Nav';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const Img = styled.img`
  width: 50px;
  height: auto;
`;
export default function NotFound() {
  return (
    <>
      <Nav />
      <Wrapper>
        <Img
          src="https://assets.thegoodparty.org/heart.svg"
          alt="The Good Party"
        />
        <h1>404</h1>
        <h2>The Party is Good.</h2>
        <h2>The developers may not be.</h2>
      </Wrapper>
    </>
  );
}
