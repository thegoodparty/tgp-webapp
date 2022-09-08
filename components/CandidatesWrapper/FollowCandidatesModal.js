/**
 *
 * FollowModal
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineUser } from 'react-icons/ai';
import Image from 'next/image';

import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

import { CandidatesContext } from '/containers/CandidatesPage';

import { FontH3 } from '../shared/typogrophy';
import Row from '../shared/Row';
import TwitterFollowButton from './TwitterFollowButton';

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 4px;
  width: 60vw;
  max-width: 450px;
  min-width: 300px;
  font-size: 16px;
  padding: 30px 0;
`;

const Padder = styled.div`
  padding: 0 30px;
`;

const CloseWrapper = styled.div`
  display: inline-block;
  padding: 0 0 12px 12px;
  cursor: pointer;
  font-size: 18px;
`;

const Channel = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ececec;
  padding: 0 30px 12px;
  margin: 36px 0 26px;
`;

const IconWrapper = styled.div`
  margin-right: 12px;
  font-size: 18px;
  &.Facebook {
    color: #4267b2;
  }

  &.Instagram {
    color: #fd5949;
  }

  &.Twitter {
    color: #1da1f2;
  }

  &.Tiktok {
    color: #000;
  }
`;

const CandidateRow = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  height: 28px;
  width: 28px;
  border-radius: 50%;

  img {
    border-radius: 12px;
    object-fit: cover;
    object-position: center center;
    height: 28px;
    width: 28px;
  }
`;

const NoImage = styled.div`
  height: 28px;
  width: 28px;
  background-color: #d9d9d9;
  border-radius: 50%;
  color: #fff;
`;

const Handle = styled.div`
  margin-left: 12px;
`;

const Follow = styled.div`
  background-color: #fff;
  color: #868686;
  border: solid 1px #868686;
  border-radius: 4px;
  padding: 7px 12px;
  font-size: 9px;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
  min-width: 80px;
  text-align: center;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const More = styled.div`
  margin: 10px 0 10px;
  text-decoration: underline;
  cursor: pointer;
`;

const icons = {
  TikTok: <SiTiktok />,
  Twitter: <FaTwitter />,
  Facebook: <FaFacebookF />,
  Instagram: <FaInstagram />,
};

const getHandle = (url, channel) => {
  let cleanUrl = url.split('?')[0].trim();
  if (channel === 'TikTok') {
    cleanUrl = cleanUrl
      .replace('https://www.tiktok.com/', '')
      .replace('https://tiktok.com/', '');
  }

  if (channel === 'Twitter') {
    cleanUrl = cleanUrl
      .replace('https://twitter.com/', '')
      .replace('https://www.twitter.com/', '');
    cleanUrl = `@${cleanUrl}`;
  }

  if (channel === 'Facebook') {
    cleanUrl = cleanUrl
      .replace('https://facebook.com/', '')
      .replace('https://www.facebook.com/', '');
    cleanUrl = `@${cleanUrl}`;
  }

  if (channel === 'Instagram') {
    cleanUrl = cleanUrl
      .replace('https://instagram.com/', '')
      .replace('https://www.instagram.com/', '');
    cleanUrl = `@${cleanUrl}`;
  }
  if (cleanUrl[cleanUrl.length - 1] === '/') {
    cleanUrl = cleanUrl.substr(0, cleanUrl.length - 1);
  }
  return cleanUrl;
};

const PER_SECTION = 5;

function FollowCandidatesModal({ closeModalCallback }) {
  const [state, setState] = useState({
    Facebook: false,
    Twitter: false,
    TikTok: false,
    Instagram: false,
  });
  const { candidatesByChannel } = useContext(CandidatesContext);
  const channels = Object.keys(candidatesByChannel);

  const toggleSection = (channel) => {
    setState({
      ...state,
      [channel]: !state[channel],
    });
  };

  const handleFollow = (url, channel) => {};
  return (
    <Wrapper>
      <Padder>
        <Row style={{ justifyContent: 'space-between' }}>
          <FontH3>Follow indie candidates</FontH3>
          <div className="text-right">
            <CloseWrapper onClick={closeModalCallback}>
              <IoMdClose />
            </CloseWrapper>
          </div>
        </Row>
      </Padder>
      {channels.map((channel) => (
        <React.Fragment key={channel}>
          {candidatesByChannel[channel].length > 0 && (
            <>
              <Channel>
                <IconWrapper className={channel}>{icons[channel]}</IconWrapper>{' '}
                <div>{channel}</div>
              </Channel>
              <Padder>
                {candidatesByChannel[channel].map((candidate, index) => (
                  <React.Fragment key={`${candidate.id}-${channel}`}>
                    {(state[channel] || index < PER_SECTION) && (
                      <CandidateRow>
                        <Left>
                          <Avatar>
                            {candidate.image ? (
                              <Image
                                src={candidate.image}
                                width={28}
                                height={28}
                              />
                            ) : (
                              <NoImage className="flex-center">
                                <AiOutlineUser />
                              </NoImage>
                            )}{' '}
                          </Avatar>
                          <Handle>
                            {getHandle(
                              candidate[channel.toLowerCase()],
                              channel,
                            )}
                          </Handle>
                        </Left>
                        {channel === 'Twitter' ? (
                          <TwitterFollowButton
                            candidateId={candidate.id}
                          />
                        ) : (
                          <a
                            href={candidate[channel.toLowerCase()]}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                          >
                            <Follow>FOLLOW</Follow>
                          </a>
                        )}
                      </CandidateRow>
                    )}
                  </React.Fragment>
                ))}
                {candidatesByChannel[channel].length > PER_SECTION && (
                  <More
                    onClick={() => {
                      toggleSection(channel);
                    }}
                  >
                    See {state[channel] ? 'less' : 'more'}
                  </More>
                )}
              </Padder>
            </>
          )}
        </React.Fragment>
      ))}
    </Wrapper>
  );
}

export default FollowCandidatesModal;
