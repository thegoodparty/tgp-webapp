/**
 *
 * PortalCampaignManagerWrapper
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import PortalPageWrapper from '../CandidatePortalHomeWrapper/PortalPageWrapper';
import { Body13, H3 } from '../../shared/typogrophy';
import JoditEditorWrapper from '../../admin/AdminEditCandidate/JoditEditor';
import { PurpleButton } from '../../shared/buttons';

const Wrapper = styled.div`
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const SectionContent = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray4};
`;

function PortalCampaignManagerWrapper({
  candidate,
  candidateUgc,
  updateUgcCallback,
}) {
  const [ugc, setUgc] = useState({});
  useEffect(() => {
    if (candidateUgc) {
      setUgc(candidateUgc);
    }
  }, [candidateUgc]);
  const fields = [
    { label: 'Race (Office Seeking)', key: 'race' },
    { label: 'Hero Video (YouTube id)', key: 'heroVideo' },
    { label: 'Headline', key: 'headline' },
    { label: 'About', key: 'about', isRichText: true },
    { label: 'Facebook', key: 'facebook' },
    { label: 'Twitter', key: 'twitter' },
    { label: 'TikTok', key: 'tiktok' },
    { label: 'Snap', key: 'snap' },
    { label: 'Instagram', key: 'instagram' },
    { label: 'YouTube', key: 'youtube' },
    { label: 'Twitch', key: 'twitch' },
    { label: 'Reddit', key: 'reddit' },
  ];

  const updateUgc = (key, value) => {
    setUgc({
      ...ugc,
      [key]: value,
    });
  };

  return (
    <PortalPageWrapper>
      <Wrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <H3 className="text-center">On Production</H3>
          </Grid>
          <Grid item xs={12} md={6}>
            <H3 className="text-center">Updates Requested</H3>
          </Grid>
          <Grid item xs={12}>
            <hr />
          </Grid>
          {fields.map((field) => (
            <React.Fragment key={field.key}>
              <Grid item xs={12} md={6}>
                <strong>{field.label}</strong>
                <br />
                {field.isRichText ? (
                  <SectionContent
                    dangerouslySetInnerHTML={{ __html: candidate[field.key] }}
                  />
                ) : (
                  <Body13>{candidate[field.key] || 'N/A'}</Body13>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                {field.isRichText ? (
                  <JoditEditorWrapper
                    onChangeCallback={(value) => updateUgc(field.key, value)}
                    initialText={ugc[field.key]}
                  />
                ) : (
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.label}
                    variant="outlined"
                    value={ugc[field.key]}
                    onChange={(e) => updateUgc(field.key, e.target.value)}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <hr />
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <PurpleButton
              onClick={() => updateUgcCallback(candidate.id, ugc)}
              fullWidth
            >
              SAVE
            </PurpleButton>
          </Grid>
        </Grid>
      </Wrapper>
    </PortalPageWrapper>
  );
}

PortalCampaignManagerWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  candidateUgc: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  updateUgcCallback: PropTypes.func,
};

export default PortalCampaignManagerWrapper;
