/**
 *
 * AdminEditCandidate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import LoadingAnimation from '../../shared/LoadingAnimation';
import { Body13, Body11, H1 } from '../../shared/typogrophy';
import { partyResolver } from '../../../helpers/electionsHelper';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding-top: 36px;
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
`;

const StyledH1 = styled(H1)`
  margin: 1.5rem auto;
  text-align: center;
`;

const AttrName = styled(Body11)`
  background-color: ${({ theme }) => theme.colors.grayC};
  font-weight: 600;
  padding: 0.5rem;
`;

const AttrValue = styled(Body11)`
  background-color: ${({ theme }) => theme.colors.grayC};
  padding: 0.5rem;
`;

function AdminEditCandidate({ candidate }) {
  let candData = [];
  if (candidate) {
    candData = [
      { name: 'Name', value: candidate.name },
      { name: 'Open Secrets ID', value: candidate.openSecretsId },
      { name: 'source (Ballotpedia)', value: candidate.source },
      { name: 'Facebook', value: candidate.facebook },
      { name: 'Twitter', value: candidate.twitter },
      { name: 'Website', value: candidate.website },
      { name: 'Order', value: candidate.order },
      { name: 'Chamber', value: candidate.chamber },
      { name: 'State', value: candidate.state },
      { name: 'District', value: candidate.district },
      { name: 'party', value: partyResolver(candidate.party) },
      { name: 'Is Aligned', value: candidate.isAligned ? 'Yes' : 'No' },
      { name: 'Is Approved', value: candidate.isApproved ? 'Yes' : 'No' },
      { name: 'Is Big Money', value: candidate.isBigMoney ? 'Yes' : 'No' },
      { name: 'Is Good', value: candidate.isGood ? 'Yes' : 'No' },
      { name: 'Small Contributions', value: candidate.smallContributions },
      { name: 'Raised', value: candidate.combinedRaised ? candidate.combinedRaised : candidate.raised },
      { name: 'Outside Report Date', value: candidate.outsideReportDate },
      { name: 'Campaign Report Date', value: candidate.campaignReportDate },
    ];
  }
  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Nav />
      <MobileHeader />
      {candidate ? (
        <Wrapper>
          <StyledH1>Edit Candidate</StyledH1>
          <Grid container spacing={3}>
            {candData.map(data => (
              <React.Fragment key={data.name}>
                <Grid item xs={6}>
                  <AttrName>{data.name}:</AttrName>
                </Grid>
                <Grid item xs={6}>
                  <AttrValue>{data.value ? data.value : 'N/A'}</AttrValue>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Wrapper>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
}

AdminEditCandidate.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default AdminEditCandidate;
