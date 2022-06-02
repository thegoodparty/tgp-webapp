import React, { useContext } from 'react';
import styled from 'styled-components';
import { FaTwitter, FaTiktok, FaInstagram, FaFacebook } from 'react-icons/fa';

import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';
import Row from '../shared/Row';
import { HomePageContext } from '../../containers/HomePage';
import It from '../shared/It';

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
  background-position: right bottom;

  margin-bottom: 15px;
  position: relative;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 72px;
    background-size: auto 100%;
    font-size: 30px;
  }
`;

const GrayGradient = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(241, 241, 241, 1) 50%,
      rgba(241, 241, 241, 0) 100%
    );
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

const Relative = styled.div`
  position: relative;
`;

const SoFIt = ({
  noTitle = false,
  openModalCallback = () => {},
  openShareModalCallback = () => {},
}) => {
  return (
    <Wrapper>
      {!noTitle && (
        <H2>
          So, let&apos;s do it... to <It />
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
        {' '}
        <GrayGradient />
        <Relative>
          <Title> Follow @goodparty</Title>
          Follow @goodparty to stay in the loop and unlock good times!
          <br />
          <BlackButton
            style={{ marginTop: '40px' }}
            onClick={openShareModalCallback}
          >
            <Inner>
              Post a #goodparty{' '}
              <Row>
                <Icon>
                  <FaTiktok />
                </Icon>
                <Icon>
                  <FaInstagram />
                </Icon>
                <Icon>
                  <FaFacebook />
                </Icon>
                <Icon>
                  <FaTwitter />
                </Icon>
              </Row>
            </Inner>
          </BlackButton>
        </Relative>
      </Banner>
    </Wrapper>
  );
};

export default SoFIt;
