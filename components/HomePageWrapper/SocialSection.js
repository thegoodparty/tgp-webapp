import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
import { Link } from 'react-scroll';
import { Link as ScrollLink } from 'react-scroll';
import Hidden from '@material-ui/core/Hidden'

import Row from '../shared/Row';
import BlackButton from '../shared/buttons/BlackButton';

const Wrapper = styled.section`
  padding-bottom: 130px;
`;

const TopRow = styled.div`
  display: block;
  margin-bottom: 30px;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const Stat = styled.div`
  display: flex;
  align-items: flex-start;
  color: #000;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.xl}) {
    margin-bottom: 24px;
  }
`;
const Icon = styled.div`
  font-size: 40px;
  margin-right: 16px;
`;
const Count = styled.div`
  font-size: 30px;
  font-weight: 900;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.xl}) {
    font-size: 48px;
  }
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: 900;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.xl}) {
    font-size: 19px;
  }
`;

const LinkScroll = styled.div`
  text-decoration: underline;
  cursor: pointer;
  font-weight: 900;
`;

const Relative = styled.div`
  position: relative;
  display: inline-block;
`;

const Clickable = styled.div`
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  width: 100%;
  cursor: pointer;
`;

const ClickableSmall = styled.div`
  position: absolute;
  top: 11%;
  height: 50px;
  right: 0;
  width: 30%;
  cursor: pointer;
`;

const Coming = styled.span`
  display: none;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    color: #8f8f8f;
    font-size: 19px;
    margin-left: 8px;
    display: inline-block;
    text-decoration: underline;
    font-weight: 400;
    cursor: pointer;
  }
`;

const ComingMobile = styled.div`
  color: #8f8f8f;
  font-size: 16px;
  text-decoration: underline;
  font-weight: 400;
  cursor: pointer;
  margin-bottom: 24px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: none;
  }
`;

const Heart = styled.div`
  margin-right: 12px;
  padding-top: 12px;
`;

const BlackBox = styled.div`
  background-color: #000;
  padding: 36px;
  color: #fff;
  border-radius: 35px;
  margin-top: 20px;
  font-size: 40px;
  line-height: 46px;
  font-weight: 900;
`;

const Small = styled.div`
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  margin-top: 22px;
`;

const WhiteButton = styled(BlackButton)`
  && {
    margin-top: 30px;
    background-color: #fff;
    color: #000;

    &:hover {
      background-color: #eee;
      color: #000;
    }
  }
`;

const SocialSection = ({ openModalCallback }) => {
  return (
    <Wrapper>
      <TopRow>
        <Row style={{ alignItems: 'initial' }}>
          <a
            href="https://www.tiktok.com/tag/goodparty?lang=en"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="no-underline"
          >
            <Stat style={{ marginRight: '70px', display: 'flex' }}>
              <Icon>🎉</Icon>
              <div>
                <Count>85,174</Count>
                <Label>#goodparty posts</Label>
              </div>
            </Stat>{' '}
          </a>

          <Stat style={{ display: 'flex' }}>
            <Heart>
              <img src="/images/heart.svg" width="42" height="34" alt="" />
            </Heart>
            <div>
              <Count>
                8,668
                {/*<Coming onClick={openModalCallback}>Coming Soon</Coming>*/}
              </Count>
              <Label>#goodparty people</Label>
              {/*<ComingMobile onClick={openModalCallback}>*/}
              {/*  Coming Soon*/}
              {/*</ComingMobile>*/}
            </div>
          </Stat>
        </Row>
        <Link to="accomplish" duration={350} smooth offset={-90}>
          <LinkScroll>What does partying accomplish?</LinkScroll>
        </Link>
      </TopRow>
      <Grid container spacing={2} className="text-center">
        <Hidden mdDown>
        <Grid item xs={12} lg={4}>
          <Relative>
            <Image
              src="/images/homepage/social1.jpg"
              height={615}
              width={369}
            />
            <Clickable onClick={openModalCallback} />
          </Relative>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Relative>
            <Image
              src="/images/homepage/social2.jpg"
              height={615}
              width={369}
            />
            <Clickable onClick={openModalCallback} />
          </Relative>
        </Grid>
        </Hidden>
        <Grid item xs={12} lg={4}>
          <Relative>
            <Image
              src="/images/homepage/social3.jpg"
              height={298}
              width={369}
            />
            <a
              href="https://www.tiktok.com/tag/goodparty?lang=en"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <ClickableSmall />
            </a>
            <BlackBox>
              Just say no...
              <br />
              to{' '}
              <ScrollLink
                className="pointer"
                to="what-is-it"
                duration={350}
                smooth
                offset={-90}
                style={{ color: '#fff' }}
              >
                <u>
                  <i>It</i>
                </u>
              </ScrollLink>
              .
              <WhiteButton fullWidth onClick={openModalCallback}>
                Host a #goodparty
              </WhiteButton>
              <Small>
                What is{' '}
                <ScrollLink
                  className="pointer"
                  to="what-is-it"
                  duration={350}
                  smooth
                  offset={-90}
                  style={{ color: '#fff' }}
                >
                  <u>
                    <i>It</i>
                  </u>
                </ScrollLink>
                ?
              </Small>
            </BlackBox>
          </Relative>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default SocialSection;
