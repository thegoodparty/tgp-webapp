/**
 *
 * TopSection
 *
 */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';

const Wrapper = styled.section`
  //min-width: 60vw;
  height: 80vh;
  padding: 20px;
  max-width: 1000px !important;
  overflow-x: hidden;
  @media only screen and (min-width: 1024px) {
    width: 1000px;
    padding: 40px;
  }

  iframe {
    width: auto !important;
    max-width: 1060px !important;
    @media only screen and (min-width: 1024px) {
      width: 920px;
    }
  }
`;

const CloseWrapper = styled.div`
  text-align: right;
  font-size: 20px;
  color: #d3d3d3;
`;

function CheckWhereToVote({ closeModalCallback }) {
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
      <CloseWrapper>
        <IoMdClose onClick={closeModalCallback} className="pointer" />
      </CloseWrapper>
      <div
        className="voteamerica-embed"
        data-subscriber="thegoodparty"
        data-tool="locate"
      ></div>
    </Wrapper>
  );
}

export default CheckWhereToVote;
