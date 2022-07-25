import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Cancel';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
import { logEvent } from '../../services/AnalyticsService';

const Wrapper = styled.div`
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
  width: 60vw;
  max-width: 600px;
  min-width: 300px;
  font-size: 24px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding: 36px;
  }
`;

const CloseWrapper = styled.div`
  display: inline-block;
  padding: 0 0 12px 12px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 33px;
  font-weight: 900;
  margin-bottom: 30px;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-bottom: 90px;
    text-align: left;
  }
`;

const Icon = styled.div`
  margin-bottom: 16px;
  font-size: 15px;
`;

const BottomWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-top: 90px;
  }
`;

const Free = styled.div`
  font-size: 15px;
  font-style: italic;
  color: #868686;
  margin-top: 8px;
`;

const icons = [
  {
    label: 'TikTok',
    img: '/images/icons/share-tiktok.svg',
    link: 'https://www.tiktok.com/@goodparty',
  },
  {
    label: 'Instagram',
    img: '/images/icons/share-insta.svg',
    link: 'https://www.instagram.com/goodpartyorg/',
  },
  {
    label: 'Facebook',
    img: '/images/icons/share-facebook.svg',
    link: 'https://www.facebook.com/goodpartyorg',
  },
  {
    label: 'Twitter',
    img: '/images/icons/share-twitter2.svg',
    link: 'https://twitter.com/goodpartyorg',
  },
];

const ShareModal = ({ closeModalCallback }) => {
  return (
    <Wrapper>
      <div className="text-right">
        <CloseWrapper onClick={closeModalCallback}>
          <CloseIcon />
        </CloseWrapper>
      </div>
      <Title>
        Follow us for a <i>#goodparty</i>
      </Title>
      <Grid container>
        {icons.map((icon, index) => (
          <Grid item xs={6} lg={3} className="text-center" key={icon.label}>
            <a
              href={icon.link}
              target="_blank"
              rel="noopener noreferrer nofollow"
              onClick={() => {
                logEvent('Share', icon.label, 'Homepage Share Modal');
              }}
              id={`share-modal-${icon.label}`}
            >
              <Icon className={index === icons.length - 1 && 'last'}>
                <Image src={icon.img} height={90} width={90}></Image>
                <div style={{ marginTop: '12px' }}>{icon.label}</div>
              </Icon>
            </a>
          </Grid>
        ))}
      </Grid>
      <BottomWrapper>
        <Image
          src="/images/black-logo.svg"
          width={174}
          height={20}
          alt="GOOD PARTY"
        />
        <Free>Free tools to change the rules!</Free>
      </BottomWrapper>
    </Wrapper>
  );
};

export default ShareModal;
