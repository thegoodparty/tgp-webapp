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

import { Body13, H3 } from '/components/shared/typogrophy';
import JoditEditorWrapper from '/components/admin/AdminEditCandidate/JoditEditor';
import { PurpleButton } from '/components/shared/buttons';
import CandidateAvatar from '/components/shared/CandidateAvatar';
import ImageUploadContainer from '/containers/shared/ImageUploadContainer';

import PortalPageWrapper from '../CandidatePortalHomeWrapper/PortalPageWrapper';

const Wrapper = styled.div`
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const SectionContent = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray4};
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 24px 0;
`;

function PortalCampaignManagerWrapper({
  candidate,
  candidateUgc,
  updateUgcCallback,
  role,
  uploadImageCallback,
  loading,
  s3Url,
}) {
  const [ugc, setUgc] = useState({});
  const [updateImage, setUpdateImage] = useState(false);
  useEffect(() => {
    if (candidateUgc) {
      setUgc(candidateUgc);
    }
  }, [candidateUgc]);
  const fields = [
    { label: 'Race (Office Seeking)', key: 'race', maxLength: 120 },
    { label: 'Hero Video (YouTube id)', key: 'heroVideo' },
    { label: 'Headline', key: 'headline' },
    { label: 'Race Date', key: 'raceDate', isDate: true },
    { label: 'About', key: 'about', isRichText: true },
    { label: 'Zip Code', key: 'zip' },
    { label: 'Facebook', key: 'facebook' },
    { label: 'Twitter', key: 'twitter' },
    { label: 'TikTok', key: 'tiktok' },
    { label: 'Snap', key: 'snap' },
    { label: 'Instagram', key: 'instagram' },
    { label: 'YouTube', key: 'youtube' },
    { label: 'Twitch', key: 'twitch' },
    { label: 'Reddit', key: 'reddit' },
    { label: 'Website', key: 'website' },
  ];

  const updateUgc = (key, value) => {
    setUgc({
      ...ugc,
      [key]: value,
    });
  };

  const handleUpload = (url) => {
    uploadImageCallback(candidate.id, url);
  };

  return (
    <PortalPageWrapper role={role}>
      <Wrapper>
        <ImageWrapper>
          {loading ? (
            <div>Uploading...</div>
          ) : (
            <>
              {(candidate.image || s3Url) && !updateImage ? (
                <div>
                  <CandidateAvatar src={candidate.image} />
                  <br />
                  <PurpleButton onClick={() => setUpdateImage(true)}>
                    <strong>Change Image</strong>
                  </PurpleButton>
                </div>
              ) : (
                <div>
                  <strong>Upload an Image</strong>
                  <br />
                  <ImageUploadContainer
                    uploadCallback={handleUpload}
                    maxFileSize={1000000}
                  />
                </div>
              )}
            </>
          )}
        </ImageWrapper>
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
                    label={field.isDate ? '' : field.label}
                    name={field.label}
                    variant="outlined"
                    value={ugc[field.key]}
                    type={field.isDate ? 'date' : 'text'}
                    onChange={(e) => updateUgc(field.key, e.target.value)}
                    inputProps={{ maxLength: field.maxLength || 80 }}
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
  role: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  uploadImageCallback: PropTypes.func,
};

export default PortalCampaignManagerWrapper;
