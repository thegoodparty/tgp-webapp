/**
 *
 * FollowModal
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';

import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

import { CandidatesContext } from '/containers/CandidatesPage';

import { FontH3 } from '../shared/typogrophy';
import Row from '../shared/Row';

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
`;

const Avatar = styled.div`
  height: 28px;
  width: 28px;
  border-radius: 50%;
`;

const icons = {
  TikTok: <SiTiktok />,
  Twitter: <FaTwitter />,
  Facebook: <FaFacebookF />,
  Instagram: <FaInstagram />,
};

function FollowCandidatesModal({ closeModalCallback }) {
  const { candidatesByChannel } = useContext(CandidatesContext);
  const channels = Object.keys(candidatesByChannel);
  console.log('chan', candidatesByChannel);
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
        <>
          {candidatesByChannel[channel].length > 0 && (
            <>
              <Channel>
                <IconWrapper className={channel}>{icons[channel]}</IconWrapper>{' '}
                <div>{channel}</div>
              </Channel>
              <Padder>
                {candidatesByChannel[channel].map((candidate) => (
                  <CandidateRow>
                    {candidate.image ? <Avatar>1</Avatar> : <Avatar>2</Avatar>}
                  </CandidateRow>
                ))}
              </Padder>
            </>
          )}
        </>
      ))}
    </Wrapper>
  );
}

export default FollowCandidatesModal;
