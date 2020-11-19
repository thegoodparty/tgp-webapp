import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H3, Body9, Body11 } from 'components/shared/typogrophy';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import {
  partyResolver,
  shortToLongState,
  rankPageLink,
} from 'helpers/electionsHelper';
import FacebookIcon from 'public/images/icons/facebook-icon.svg';
import WebsiteIcon from 'public/images/icons/website-icon.svg';
import TwitterIcon from 'public/images/icons/twitter-icon.svg';

const TopRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const IconWrapper = styled.div`
  padding: 24px 20px 0;
  text-align: center;
`;

const SocialLabel = styled(Body9)`
  margin-top: 7px;
  color: ${({ theme }) => theme.colors.blue};
  text-transform: uppercase;
  flex-wrap: no-wrap;
`;

const ChamberLink = styled(Body11)`
  margin-top: 5px;
  text-transform: capitalize;
`;

const TopRow = ({ candidate, chamberName }) => {
  const [socialAccounts, setSocialAccounts] = useState([]);
  let isGood;
  if (candidate) {
    ({ isGood } = candidate);
  }

  useEffect(() => {
    if (candidate) {
      const { facebook, twitter, website } = candidate;

      setSocialAccounts([
        { name: 'website', url: website, icon: WebsiteIcon },
        { name: 'facebook', url: facebook, icon: FacebookIcon },
        { name: 'twitter', url: twitter, icon: TwitterIcon },
      ]);
    } else {
      setSocialAccounts([]);
    }
  }, [candidate]);

  const { name, image, party, isIncumbent, state, district } = candidate;

  const getRankPageLink = () => rankPageLink(chamberName, state, district);
  const chamberLink = () => {
    if (chamberName === 'presidential') {
      return (
        <ChamberLink>
          <Link href={getRankPageLink()} data-cy="chamber-link">
            U.S. President
          </Link>
        </ChamberLink>
      );
    }
    if (chamberName === 'senate') {
      if (state) {
        return (
          <ChamberLink>
            <Link href={getRankPageLink()} data-cy="chamber-link">
              U.S. Senate for {shortToLongState[state.toUpperCase()]}
            </Link>
          </ChamberLink>
        );
      }
    }
    if (chamberName === 'house') {
      if (state && district) {
        return (
          <ChamberLink>
            <Link href={getRankPageLink()} data-cy="chamber-link">
              U.S. House for District {state.toUpperCase()}-{district}
            </Link>
          </ChamberLink>
        );
      }
    }
    return <></>;
  };

  const socialAccountSection = () => {
    if (socialAccounts.length > 0) {
      return (
        <SocialLinks>
          {socialAccounts.map((social, index) => (
            <React.Fragment key={`${index}-${social.url}`}>
              {social.url && social.url !== '' && (
                <a
                  href={social.url}
                  target="_blank"
                  data-cy="social-link"
                  rel="nofollow"
                >
                  <IconWrapper>
                    <img src={social.icon} alt={social.name} />
                    <SocialLabel>{social.name}</SocialLabel>
                  </IconWrapper>
                </a>
              )}
            </React.Fragment>
          ))}
        </SocialLinks>
      );
    }
  };

  return (
    <TopRowWrapper data-cy="top-row">
      <CandidateAvatar src={image} good={isGood} name={name} size="xl" />
      <H3 style={{ marginTop: '14px' }} data-cy="top-name">
        {name}
      </H3>
      <Body11
        style={{ marginTop: '5px' }}
        className="bold500"
        data-cy="top-position"
      >
        {partyResolver(party)} {isIncumbent ? 'INCUMBENT' : 'CANDIDATE'}
      </Body11>
      {chamberLink()}
      {socialAccountSection()}
    </TopRowWrapper>
  );
};

TopRow.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberName: PropTypes.string,
};

export default TopRow;
