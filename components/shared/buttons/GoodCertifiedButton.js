import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import PurpleButton from './PurpleButton';

const TealButton = styled(PurpleButton)`
  && {
    background: #428da4;
    color: #fff;
    border: 2px solid #428da4;
    transition: background-color 0.4s, color 0.4s;
    border-radius: 20px;
    padding: 3px 10px;

    &:hover {
      background: #68c4e2;
      color: #fff;
      border-color: #68c4e2;
    }
  }
`;

const Inner = styled.div`
  font-size: 10px;
  font-weight: 900;
  display: flex;
  align-items: center;
`;

const Heart = styled.div`
  padding-top: 5px;
  margin-right: 4px;
`;

export default function GoodCertifiedButton() {
  return (
    <TealButton fullWidth>
      <Inner>
        <Heart>
          <Image src="/images/white-heart.svg" width={18} height={15} />
        </Heart>
        GOOD CERTIFIED
      </Inner>
    </TealButton>
  );
}
