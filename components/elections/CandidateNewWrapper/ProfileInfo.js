/**
 *
 * ProfileInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Sticky from 'react-sticky-el';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { partyResolver } from 'helpers/electionsHelper';
import { kFormatter } from 'helpers/numberHelper';

import { Body9, Body11, H3, Body13 } from '../../shared/typogrophy';
import SupportersProgressBar from '../SupportersProgressBar';
import CandidateAvatar from '../../shared/CandidateCard/CandidateAvatar';
import RecentlyJoined from './RecentlyJoined';
import SupportButton from './SupportButton';
import ShareButton from './ShareButton';

const Inner = styled.div`
  background-color: ${({ theme }) => theme.colors.purple3};
  z-index: 5000;
  padding: 12px 0;
`;

const ProfileInfoWrapper = styled.div`
  border-radius: 8px;
  padding: 24px 18px 0;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    box-shadow: -1px 0px 12px rgba(0, 0, 0, 0.2);
    padding: 24px 24px 32px 24px;
  }

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
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const CandidateName = styled(H3)`
  text-align: left;
  font-size: 16px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: center;
    margin-top: 12px;
    margin-bottom: 8px;
  }
`;

const PartyName = styled(Body13)`
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: center;
  }
`;

const TitleCase = styled.span`
  text-transform: capitalize;
`;

const LikelyVoters = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray7};
  span {
    color: ${({ theme }) => theme.colors.gray3};
    font-size: 16px;
    font-weight: 600;
    margin-right: 4px;
  }
`;

const EndorsementDescription = styled(Body11)`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.gray7};
`;

function ProfileInfo({
  candidate,
  isMobile = false,
  supportCallback,
  removeSupportCallback,
  isUserSupportCandidate,
  candidateSupports,
  adminDeleteSupportCallback,
}) {
  const router = useRouter();

  const {
    firstName,
    lastName,
    image,
    race,
    party,
    likelyVoters,
    votesNeeded,
  } = candidate;

  const StickyWrapperElement = ({ children }) => (
    <>
      {!isMobile ? (
        <div>{children}</div>
      ) : (
        <Sticky
          boundaryElement=".scroll-area"
          hideOnBoundaryHit={false}
          dontUpdateHolderHeightWhenSticky
        >
          <Inner>{children}</Inner>
        </Sticky>
      )}
    </>
  );
  const supportCount = candidateSupports?.length || 0;
  const intLikelyVoters = parseInt(likelyVoters, 10);

  return (
    <div>
      <ProfileInfoWrapper>
        <AvatarSection>
          <CandidateAvatar
            avatar={image}
            party={party}
            size={isMobile ? 'small' : 'large'}
          />
          <div>
            <CandidateName>
              {firstName} {lastName}
            </CandidateName>
            <PartyName>
              <TitleCase>{partyResolver(party).toLowerCase()}</TitleCase> for{' '}
              {race}
            </PartyName>
          </div>
        </AvatarSection>
        <Grid container>
          <Grid item xs={6}>
            <LikelyVoters>
              <span>{kFormatter(intLikelyVoters + supportCount)}</span> likely
              voters
            </LikelyVoters>
          </Grid>
          <Grid item xs={6}>
            {supportCount === 0 ? (
              <>&nbsp;</>
            ) : (
              <LikelyVoters>
                <span>{supportCount}</span>
                {supportCount === 1 ? 'person' : 'people'} endorsing
              </LikelyVoters>
            )}
          </Grid>
        </Grid>
        <SupportersProgressBar
          showSupporters={false}
          votesNeeded={votesNeeded}
          peopleSoFar={supportCount + intLikelyVoters}
          fullWidth
        />
        <StickyWrapperElement>
          <Box style={{ marginTop: 24 }} className="box box-left">
            <ShareButton />
          </Box>
          <Box style={{ marginTop: 8 }} className="box box-right">
            <SupportButton
              isUserSupportCandidate={isUserSupportCandidate}
              removeSupportCallback={removeSupportCallback}
              supportCallback={supportCallback}
            />
          </Box>
        </StickyWrapperElement>

        <EndorsementDescription>
          Your endorsement is a free way to show and grow grassroots support.{' '}
          <Link
            href={`${router.asPath}?article=1ic6T6fhH0jZLNvX5aZkDe`}
            passHref
          >
            <a>Read more</a>
          </Link>
        </EndorsementDescription>
        <Hidden xsDown>
          <RecentlyJoined
            candidateSupports={candidateSupports}
            adminDeleteSupportCallback={adminDeleteSupportCallback}
            candidateId={candidate.id}
          />
        </Hidden>
      </ProfileInfoWrapper>
    </div>
  );
}

ProfileInfo.propTypes = {
  candidate: PropTypes.object,
  isMobile: PropTypes.bool,
  supportCallback: PropTypes.func,
  removeSupportCallback: PropTypes.func,
  isUserSupportCandidate: PropTypes.bool,
  candidateSupports: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  adminDeleteSupportCallback: PropTypes.func,
};

export default ProfileInfo;
