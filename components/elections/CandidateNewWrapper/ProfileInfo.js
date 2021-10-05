/**
 *
 * ProfileInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Hidden from '@material-ui/core/Hidden';
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
import Stats from './Stats';

const ProfileInfoWrapper = styled.div`
  border-radius: 8px;
  padding: 0;

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
  user,
}) {
  const router = useRouter();

  const {
    firstName,
    lastName,
    image,
    race,
    party,
    isDraft,
    draftOffice,
  } = candidate;

  const supportCount = total || 0;

  const achievements = achievementsHelper(supportCount);

  return (
    <ProfileInfoWrapper>
      <VerticalOrder>
        <div>
          <Endorsed>
            <div style={{ paddingLeft: '10px' }}>
              <strong>
                {supportCount} {supportCount === 1 ? 'person' : 'people'}{' '}
                endorsed.
              </strong>{' '}
              Let's get to {numberFormatter(achievements.nextStep)}!
            </div>
          </Endorsed>

          <SupportersProgressBar
            showSupporters={false}
            votesNeeded={achievements.nextStep}
            peopleSoFar={supportCount}
            fullWidth
            showSuffix={false}
            withAchievement
          />
          <Stats candidate={candidate} />
        </div>
        <Hidden mdUp>
          <div style={{ paddingLeft: '10px' }}>
            <RecentlyJoined
              candidateSupports={candidateSupports}
              adminDeleteSupportCallback={adminDeleteSupportCallback}
              candidateId={candidate.id}
              total={total}
              previewMode
              scrollForMore
            />
          </div>
        </Hidden>
        <AvatarSection>
          <CandidateAvatar
            avatar={image}
            party={party}
            size={isMobile ? 'small' : 'large'}
            partyBadge
            hideBadge={isDraft}
          />
          <div style={{ flex: 1 }}>
            <CandidateName>
              {firstName} {lastName}
            </CandidateName>
            <PartyName>
              {isDraft && draftOffice !== '' ? (
                draftOffice
              ) : (
                <>
                  {party === 'S' ? (
                    'SAM Party'
                  ) : (
                    <TitleCase>{partyResolver(party).toLowerCase()}</TitleCase>
                  )}{' '}
                  candidate running for {race}{' '}
                </>
              )}
            </PartyName>
          </div>
        </AvatarSection>
      </VerticalOrder>

      <Hidden smDown>
        <div style={{ paddingLeft: '8px' }}>
          <RecentlyJoined
            candidateSupports={candidateSupports}
            adminDeleteSupportCallback={adminDeleteSupportCallback}
            candidateId={candidate.id}
            total={total}
            previewMode
          />
        </div>
        <EndorsmentWrapper>
          <SupportButton
            supportCallback={supportCallback}
            removeSupportCallback={removeSupportCallback}
            isUserSupportCandidate={isUserSupportCandidate}
            trackingLabel="top endorse button"
            withForm
            user={user}
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
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default ProfileInfo;
