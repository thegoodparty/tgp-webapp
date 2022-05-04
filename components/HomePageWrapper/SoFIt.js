import React from 'react';
import styled from 'styled-components';
import { FaTwitter, FaTiktok, FaInstagram, FaFacebook } from 'react-icons/fa';

import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';

const Wrapper = styled.section`
  padding: 60px 0 0;
`;

const H2 = styled.h2`
  font-size: 64px;
  font-weight: 900;
  margin: 0 0 60px;
`;

const Banner = styled.div`
  background-color: #f1f1f1;
  padding: 72px;
  font-size: 30px;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: right bottom;
  margin-bottom: 15px;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 900;
  margin-bottom: 15px;
`;

const Icon = styled.span`
  display: inline-block;
  margin-left: 30px;
  font-size: 28px;
`;

const Inner = styled.div`
  display: flex;
  padding: 0 24px;
  align-items: center;
`

const SoFIt = () => {
  return (
    <Wrapper>
      <H2>
        So, Fuck{' '}
        <u>
          <i>it</i>
        </u>
        ...
      </H2>
      <Banner
        style={{ backgroundImage: 'url(/images/homepage/banner-bg1.png)' }}
      >
        <Title>Host a #goodparty</Title>
        We’ll send you #goodparty stickers and more!
        <br />
        <BlackButton style={{ marginTop: '40px' }}>
          <InnerButton>Host a #goodparty</InnerButton>
        </BlackButton>
      </Banner>
      <Banner
        style={{ backgroundImage: 'url(/images/homepage/banner-bg2.png)' }}
      >
        <Title> Post a #goodparty</Title>
        Tag a #goodparty to join us and unlock good times!
        <br />
        <BlackButton style={{ marginTop: '40px' }}>
          <Inner>
            Post a #goodparty{' '}
            <Icon>
              <FaTwitter />
            </Icon>
            <Icon>
              <FaTiktok />
            </Icon>
            <Icon>
              <FaInstagram />
            </Icon>
            <Icon>
              <FaFacebook />
            </Icon>
          </Inner>
        </BlackButton>
      </Banner>
    </Wrapper>
  );
};

export default SoFIt;
