import React from 'react';
import styled from 'styled-components';
import { FaTwitter, FaTiktok, FaInstagram, FaFacebook } from 'react-icons/fa';

import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';
import Row from '../shared/Row';

const Wrapper = styled.section`
  padding: 60px 0 0;
`;

const H2 = styled.h2`
  font-size: 48px;
  font-weight: 900;
  margin: 0 0 40px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 64px;
    margin: 0 0 60px;
  }
`;

const Banner = styled.div`
  background-color: #f1f1f1;
  padding: 36px 36px 260px;
  font-size: 24px;

  background-size: auto 50%;
  background-repeat: no-repeat;
  background-position: bottom center;
  margin-bottom: 15px;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    background-position: right bottom;
    padding: 72px;
    background-size: auto 100%;
    font-size: 30px;
  }
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 900;
  margin-bottom: 15px;
`;

const Icon = styled.span`
  display: inline-block;
  margin: 8px 14px 0;
  font-size: 28px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin: 0 14px;
  }
`;

const Inner = styled.div`
  padding: 0 12px;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: flex;
    padding: 0 24px;
    align-items: center;
    text-align: left;
  }
`;

const SoFIt = ({ noTitle = false, openModalCallback = () => {} }) => {
  return (
    <Wrapper>
      {!noTitle && (
        <H2>
          So, Fuck{' '}
          <u>
            <i>It</i>
          </u>
          ...
        </H2>
      )}
      <Banner
        style={{ backgroundImage: 'url(/images/homepage/banner-bg-1.png)' }}
      >
        <Title>Host a #goodparty</Title>
        We’ll send you #goodparty stickers and more!
        <br />
        <BlackButton style={{ marginTop: '40px' }} onClick={openModalCallback}>
          <InnerButton>Host a #goodparty</InnerButton>
        </BlackButton>
      </Banner>
      <Banner
        style={{ backgroundImage: 'url(/images/homepage/banner-bg2.png)' }}
      >
        <Title> Post a #goodparty</Title>
        Tag a #goodparty to join us and unlock good times!
        <br />
        <BlackButton style={{ marginTop: '40px' }} onClick={openModalCallback}>
          <Inner>
            Post a #goodparty{' '}
            <Row>
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
            </Row>
          </Inner>
        </BlackButton>
      </Banner>
    </Wrapper>
  );
};

export default SoFIt;
