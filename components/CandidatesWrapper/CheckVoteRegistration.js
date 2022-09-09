/**
 *
 * TopSection
 *
 */

import React, { useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  //min-width: 60vw;
  height: 80vh;
  padding: 20px;
  max-width: 1000px !important;
  overflow-x: hidden;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    width: 1000px;
    padding: 40px;
  }

  iframe {
    width: auto !important;
    //min-width: auto !important;
    max-width: 1060px !important;
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.lg}) {
      width: 920px;
    }
  }
`;

function CheckVoteRegistration() {
  useEffect(() => {
    // adding vote america script
    const existing = document.getElementById('voteAmericaScript');
    if (!existing) {
      const voteAmericaScript = document.createElement('script');
      voteAmericaScript.setAttribute(
        'src',
        'https://cdn.voteamerica.com/embed/tools.js',
      );
      voteAmericaScript.setAttribute('id', 'voteAmericaScript');
      document.head.appendChild(voteAmericaScript);
    }
    return () => {
      const existing = document.getElementById('voteAmericaScript');
      document.head.removeChild(existing);
    };
  }, []);
  return (
    <Wrapper>
      <div
        className="voteamerica-embed"
        data-subscriber="thegoodparty"
        data-tool="verify"
      ></div>
    </Wrapper>
  );
}

export default CheckVoteRegistration;
