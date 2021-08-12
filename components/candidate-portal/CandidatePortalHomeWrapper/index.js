/**
 *
 * CandidatePortalHomeWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';

import PortalPageWrapper from './PortalPageWrapper';
import { Body13, H2, H3, Body } from '../../shared/typogrophy';
import CandidateAvatar from '../../shared/CandidateCard/CandidateAvatar';
import { partyResolver } from '../../../helpers/electionsHelper';
import { leftMenuItems } from '../PortalLeftMenu';

const Wrapper = styled.div`
  text-align: center;
  padding: 24px;
`;

const IconLabel = styled(Body13)`
  color: #fff;
`;

const NavItem = styled.div`
  padding: 24px 8px;
  background: linear-gradient(
    180deg,
    rgba(67, 0, 211, 0.4) 11.17%,
    rgba(67, 0, 211, 0.6) 76.34%
  );
  color: #fff;
  border-radius: 8px;

  @keyframes shadow-drop-2-center {
    0% {
      transform: translateZ(0);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
    100% {
      transform: translateZ(20px);
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.35);
    }
  }
  &:hover {
    animation: shadow-drop-2-center 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
  }
`;

function CandidatePortalHomeWrapper({ candidate, user }) {
  return (
    <PortalPageWrapper>
      <Wrapper>
        <div>
          <H2>Welcome to Good Party Candidate Portal</H2>
          {candidate && (
            <div>
              <br />
              <br />

              <CandidateAvatar
                avatar={candidate.image}
                party={candidate.party}
                size="large"
                partyBadge
              />
              <br />
              <H3>
                {candidate.firstName} {candidate.lastName}
              </H3>
              <Body13>{partyResolver(candidate.party)}</Body13>

              <br />
              <br />
              <Body>
                This candidate portal allows you to manage your campaign on Good
                Party
              </Body>
              <br />
              <br />
              <Grid container spacing={3} alignItems="center" justify="center">
                {leftMenuItems.map(item => (
                  <Grid item xs={12} md={6} lg={3} xl={2} key={item.label}>
                    <Link href={item.link} passHref>
                      <a>
                        <NavItem>
                          <div>{item.icon}</div>
                          <IconLabel>{item.label}</IconLabel>
                        </NavItem>
                      </a>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </div>
      </Wrapper>
    </PortalPageWrapper>
  );
}

CandidatePortalHomeWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default CandidatePortalHomeWrapper;
