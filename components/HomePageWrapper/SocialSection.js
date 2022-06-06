import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
import { Link } from 'react-scroll';
import { Link as ScrollLink } from 'react-scroll';
import Hidden from '@material-ui/core/Hidden';

import Row from '../shared/Row';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';
import Emoji from '../shared/Emoji';
import It from '../shared/It';

const Wrapper = styled.section`
  //padding-bottom: 130px;
`;

const TopRow = styled.div`
  margin: 30px 0;
`;

const Stat = styled.div`
  display: flex;
  align-items: flex-start;
  color: #000;
  cursor: pointer;

  &.first {
    margin-right: 16px;
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.xl}) {
    margin-bottom: 24px;

    &.first {
      margin-right: 70px;
    }
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
//
// const Relative = styled.div`
//   position: relative;
//   display: inline-block;
// `;
//
// const Clickable = styled.div`
//   position: absolute;
//   bottom: 0;
//   height: 50px;
//   left: 0;
//   width: 100%;
//   cursor: pointer;
// `;
//
// const ClickableSmall = styled.div`
//   position: absolute;
//   top: 11%;
//   height: 50px;
//   right: 0;
//   width: 30%;
//   cursor: pointer;
// `;

const Heart = styled.div`
  margin-right: 12px;
  padding-top: 12px;
`;
//
// const BlackBox = styled.div`
//   background-color: #000;
//   padding: 36px;
//   color: #fff;
//   border-radius: 35px;
//   margin-top: 20px;
//   font-size: 40px;
//   line-height: 46px;
//   font-weight: 900;
// `;
//
// const Small = styled.div`
//   font-size: 20px;
//   line-height: 24px;
//   font-weight: 400;
//   margin-top: 22px;
// `;
//
// const WhiteButton = styled(BlackButton)`
//   && {
//     margin-top: 30px;
//     background-color: #fff;
//     color: #000;
//
//     &:hover {
//       background-color: #eee;
//       color: #000;
//     }
//   }
// `;

const Accomplish = styled.div`
  margin-top: 16px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    text-align: right;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 24px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-top: 0;
  }
`;

const SocialSection = ({ openModalCallback, registerModalCallback }) => {
  return (
    <Wrapper>
      <TopRow>
        <Grid container spacing={2}>
          <Grid xs={12} md={8}>
            <Row style={{ alignItems: 'initial' }}>
              <Stat className="first" onClick={openModalCallback}>
                <Icon>
                  <Emoji symbol="🎉" label="Party Popper" />
                </Icon>
                <div>
                  <Count data-cy="post-count">85,174</Count>
                  <Label data-cy="post-count-label">#goodparty posts</Label>
                </div>
              </Stat>

              <Stat onClick={openModalCallback}>
                <Heart>
                  <img
                    src="/images/heart.svg"
                    width="42"
                    height="34"
                    alt=""
                    data-cy="heart-icon"
                  />
                </Heart>
                <div>
                  <Count data-cy="people-count">8,668</Count>
                  <Label data-cy="people-count-label">@goodparty people</Label>
                </div>
              </Stat>
            </Row>
          </Grid>
          <Grid xs={12} md={4}>
            <ButtonWrapper>
              <BlackButton fullWidth onClick={registerModalCallback}>
                Count Me In!
              </BlackButton>
            </ButtonWrapper>
            <Accomplish>
              <It
                text={
                  <div className="pointer">
                    What is{' '}
                    <i>
                      <u>It</u>
                    </i>
                    ?
                  </div>
                }
              />
            </Accomplish>
          </Grid>
        </Grid>
      </TopRow>
      {/*<Grid container spacing={2} className="text-center">*/}
      {/*  <Hidden mdDown>*/}
      {/*    <Grid item xs={12} lg={4}>*/}
      {/*      <Relative>*/}
      {/*        <Image*/}
      {/*          src="/images/homepage/social1.jpg"*/}
      {/*          height={615}*/}
      {/*          width={369}*/}
      {/*        />*/}
      {/*        <Clickable onClick={openModalCallback} />*/}
      {/*      </Relative>*/}
      {/*    </Grid>*/}
      {/*    <Grid item xs={12} lg={4}>*/}
      {/*      <Relative>*/}
      {/*        <Image*/}
      {/*          src="/images/homepage/social2.jpg"*/}
      {/*          height={615}*/}
      {/*          width={369}*/}
      {/*        />*/}
      {/*        <Clickable onClick={openModalCallback} />*/}
      {/*      </Relative>*/}
      {/*    </Grid>*/}
      {/*  </Hidden>*/}
      {/*  <Grid item xs={12} lg={4}>*/}
      {/*    <Relative>*/}
      {/*      <Image*/}
      {/*        src="/images/homepage/social3.jpg"*/}
      {/*        height={298}*/}
      {/*        width={369}*/}
      {/*      />*/}
      {/*      <a*/}
      {/*        href="https://www.tiktok.com/tag/goodparty?lang=en"*/}
      {/*        target="_blank"*/}
      {/*        rel="noopener noreferrer nofollow"*/}
      {/*      >*/}
      {/*        <ClickableSmall />*/}
      {/*      </a>*/}
      {/*      <BlackBox>*/}
      {/*        Just do it...*/}
      {/*        <br />*/}
      {/*        to{' '}*/}
      {/*        <ScrollLink*/}
      {/*          className="pointer"*/}
      {/*          to="what-is-it"*/}
      {/*          duration={350}*/}
      {/*          smooth*/}
      {/*          offset={-90}*/}
      {/*          style={{ color: '#fff' }}*/}
      {/*        >*/}
      {/*          <u>*/}
      {/*            <i>It</i>*/}
      {/*          </u>*/}
      {/*        </ScrollLink>*/}
      {/*        .*/}
      {/*        <WhiteButton fullWidth onClick={openModalCallback}>*/}
      {/*          Count Me In*/}
      {/*        </WhiteButton>*/}
      {/*        <Small>*/}
      {/*          What is{' '}*/}
      {/*          <ScrollLink*/}
      {/*            className="pointer"*/}
      {/*            to="what-is-it"*/}
      {/*            duration={350}*/}
      {/*            smooth*/}
      {/*            offset={-90}*/}
      {/*            style={{ color: '#fff' }}*/}
      {/*          >*/}
      {/*            <u>*/}
      {/*              <i>It</i>*/}
      {/*            </u>*/}
      {/*          </ScrollLink>*/}
      {/*          ?*/}
      {/*        </Small>*/}
      {/*      </BlackBox>*/}
      {/*    </Relative>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
    </Wrapper>
  );
};

export default SocialSection;
