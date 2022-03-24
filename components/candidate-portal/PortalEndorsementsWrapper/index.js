/**
 *
 * PortalEndorsementsWrapper
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import Grid from '@material-ui/core/Grid';

import { EndorsementsContext } from '/containers/candidate-portal/PortalEndorsementsPage';
import PortalPageWrapper from '../shared/PortalPageWrapper';
import { FontH1 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';
import NewEndorsementForm from './NewEndorsementForm';

const Wrapper = styled.div`
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const Endorsement = styled.div`
  padding: 10px;
`;

function PortalEndorsementsWrapper() {
  const { role, endorsements } = useContext(EndorsementsContext);
  const [showAdd, setShowAdd] = useState(false);
  return (
    <PortalPageWrapper role={role}>
      <Wrapper>
        <FontH1>Endorsements</FontH1>
        <div className="text-right">
          <PurpleButton onClick={() => setShowAdd(true)}>
            &nbsp; <FaPlus /> &nbsp; Add Endorsement &nbsp;
          </PurpleButton>
        </div>
        {showAdd && <NewEndorsementForm closeAdd={() => setShowAdd(false)} />}
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <strong>Title</strong>
          </Grid>
          <Grid item xs={12} md={3}>
            <strong>Summary</strong>
          </Grid>
          <Grid item xs={12} md={3}>
            <strong>Link</strong>
          </Grid>
          <Grid item xs={12} md={3}>
            <strong>Image</strong>
          </Grid>

          {endorsements.map((endorsement) => (
            <React.Fragment key={endorsement.id}>
              <Grid item xs={12} md={3}>
                {endorsement.title}
              </Grid>
              <Grid item xs={12} md={3}>
                {endorsement.summary}
              </Grid>
              <Grid item xs={12} md={3}>
                {endorsement.link}
              </Grid>
              <Grid item xs={12} md={3}>
                {endorsement.image && (
                  <img src={endorsement.image} className="full-image" />
                )}
              </Grid>

              <Grid xs={12}>
                <hr />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Wrapper>
    </PortalPageWrapper>
  );
}

PortalEndorsementsWrapper.propTypes = {};

export default PortalEndorsementsWrapper;
