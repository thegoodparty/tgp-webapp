/**
 *
 * ProfileInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Hidden from '@material-ui/core/Hidden';
import Sticky from 'react-sticky-el';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { partyResolver } from 'helpers/electionsHelper';
import { numberFormatter } from 'helpers/numberHelper';
import { achievementsHelper } from 'helpers/achievementsHelper';

import { H3, Body13 } from '../../shared/typogrophy';
import SupportersProgressBar from '../SupportersProgressBar';
import CandidateAvatar from '../../shared/CandidateCard/CandidateAvatar';
import RecentlyJoined from './RecentlyJoined';
import SupportButton from './SupportButton';

const ScrollArea = styled.div`
  height: calc(100% - 80px - 65px);
  position: relative;
  top: 0;
  left: 0;
  width: 416px;
  margin-top: -25px;
`;

const Inner2 = styled.div`
  padding-top: 25px;
`;

const ProfileInfoWrapper = styled.div`
  border-radius: 8px;
  padding: 0 18px 0;

  .sticky {
    z-index: 1000;
    .box {
      margin-top: 0 !important;
    }
    .box {
      width: 50%;
      display: inline-block;
    }
    .box-left {
      padding-right: 5px;
    }
    .box-right {
      padding-left: 5px;
    }
  }
`;

const AvatarSection = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 24px;
  margin-top: 24px;
  flex-direction: row-reverse;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: block;
    margin-top: 0;
  }
`;

const CandidateName = styled(H3)`
  text-align: left;
  font-size: 16px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    text-align: center;
    margin-top: 12px;
    margin-bottom: 8px;
  }
`;

const PartyName = styled(Body13)`
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    text-align: center;
  }
`;

const TitleCase = styled.span`
  text-transform: capitalize;
`;

const VerticalOrder = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    flex-direction: column-reverse;
  }
`;

const EndorsmentWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray7};
`;

const Endorsed = styled(Body13)`
  text-align: left;
  color: ${({ theme }) => theme.colors.gray4};
`;

function ProfileInfo({
  candidate,
  isMobile = false,
  supportCallback,
  removeSupportCallback,
  isUserSupportCandidate,
  candidateSupports,
  total,
  adminDeleteSupportCallback,
}) {
  const router = useRouter();

  const { firstName, lastName, image, race, party } = candidate;

  const WrapperElement = ({ children }) =>
    isMobile ? (
      <div>{children}</div>
    ) : (
      <ScrollArea className="scroll-area">
        <Sticky
          boundaryElement=".scroll-area"
          hideOnBoundaryHit={false}
          dontUpdateHolderHeightWhenSticky
        >
          <Inner2 className="inner">{children}</Inner2>
        </Sticky>
      </ScrollArea>
    );
  const supportCount = candidateSupports?.length || 0;

  const achievements = achievementsHelper(supportCount);

  return (
    <WrapperElement>
      <ProfileInfoWrapper>
        <VerticalOrder>
          <div>
            <Endorsed>
              <strong>
                {supportCount} {supportCount === 1 ? 'person' : 'people'}{' '}
                endorsed.
              </strong>{' '}
              Let's get to {numberFormatter(achievements.nextStep)}!
            </Endorsed>

            <SupportersProgressBar
              showSupporters={false}
              votesNeeded={achievements.nextStep}
              peopleSoFar={supportCount}
              fullWidth
              showSuffix={false}
              withAchievement
            />
          </div>
          <Hidden mdUp>
            <RecentlyJoined
              candidateSupports={candidateSupports}
              adminDeleteSupportCallback={adminDeleteSupportCallback}
              candidateId={candidate.id}
              total={total}
              previewMode
              scrollForMore
            />
          </Hidden>
          <AvatarSection>
            <CandidateAvatar
              avatar={image}
              party={party}
              size={isMobile ? 'small' : 'large'}
              partyBadge
            />
            <div style={{ flex: 1 }}>
              <CandidateName>
                {firstName} {lastName}
              </CandidateName>
              <PartyName>
                {party === 'S' ? (
                  'SAM Party'
                ) : (
                  <TitleCase>{partyResolver(party).toLowerCase()}</TitleCase>
                )}{' '}
                candidate running for {race}
              </PartyName>
            </div>
          </AvatarSection>
        </VerticalOrder>

        <Hidden smDown>
          <RecentlyJoined
            candidateSupports={candidateSupports}
            adminDeleteSupportCallback={adminDeleteSupportCallback}
            candidateId={candidate.id}
            total={total}
            previewMode
          />

          <EndorsmentWrapper>
            <SupportButton
              supportCallback={supportCallback}
              removeSupportCallback={removeSupportCallback}
              isUserSupportCandidate={isUserSupportCandidate}
            />
            <div style={{ marginTop: '12px' }}>
              Your endorsement is a free and powerful way to show and grow
              grassroots support.{' '}
              <Link
                href={`${router.asPath}?article=1ic6T6fhH0jZLNvX5aZkDe`}
                passHref
              >
                <a>Read more.</a>
              </Link>
            </div>
          </EndorsmentWrapper>
        </Hidden>
      </ProfileInfoWrapper>
    </WrapperElement>
  );
}

ProfileInfo.propTypes = {
  candidate: PropTypes.object,
  isMobile: PropTypes.bool,
  supportCallback: PropTypes.func,
  removeSupportCallback: PropTypes.func,
  isUserSupportCandidate: PropTypes.bool,
  candidateSupports: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  total: PropTypes.number,
  adminDeleteSupportCallback: PropTypes.func,
  trackShareCallback: PropTypes.func,
};

export default ProfileInfo;
