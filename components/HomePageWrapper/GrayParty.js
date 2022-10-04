import React from 'react';
import styled from 'styled-components';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import MaxWidth from '../shared/MaxWidth';
import Feed from './Feed';

const Wrapper = styled.section`
  background-color: #fff;
  border-top: solid 2px #f3f3f3;
  padding: 80px 16px 40px;
  text-align: center;
  @media only screen and (min-width: 1024px) {
    padding: 116px 24px;
  }
`;

const GrayParty = ({ openShareModalCallback }) => {
  const router = useRouter();
  return (
    <Wrapper>
      <MaxWidth>
        <Feed openShareModalCallback={openShareModalCallback} columns={3} />
      </MaxWidth>
    </Wrapper>
  );
};

export default GrayParty;
