/**
 *
 * Updates
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import { Body19, Body13 } from '../../shared/typogrophy';

const SectionWrapper = styled.div`
  margin-top: 48px;
`;

const SectionHeader = styled(Body19)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray4};
  margin-bottom: 18px;

  &.center {
    color: ${({ theme }) => theme.colors.gray70};
    text-align: center;
  }
  span {
    font-size: 16px;
    font-weight: normal;
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-bottom: 24px;
  }
`;

const UpdateWrapper = styled.div`
  margin-bottom: 32px;
  border-bottom: solid 1px #ccc;
  padding-bottom: 24px;
`;

const YoutubePlayerWrapper = styled.div`
  [data-jodit_iframe_wrapper] {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0 !important;
    width: 100% !important;
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  &.top {
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.07), 0 0 12px rgba(0, 0, 0, 0.08),
      0 0 16px rgba(0, 0, 0, 0.12);
  }
`;

const UpdateDate = styled.div`
  font-size: 0.9em;
  font-weight: 500;
  margin-bottom: 18px;
`;

const UpdatedTitle = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray3};
  margin-bottom: 4px;
  font-weight: 700;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 19px;
  }
`;

function Updates({ candidate }) {
  const { updatesList } = candidate;
  if (!updatesList) {
    return <> </>;
  }

  const sortedUpdates = [...updatesList];
  sortedUpdates.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <SectionWrapper>
      <SectionHeader>Updates ({(updatesList || []).length})</SectionHeader>
      {sortedUpdates &&
        sortedUpdates.reverse().map(update => (
          <UpdateWrapper>
            <Grid container spacing={3}>
              <Grid item xs={12} md={update.youtubeId ? 7 : 12}>
                <YoutubePlayerWrapper key={update.id}>
                  <UpdatedTitle>{update.title}</UpdatedTitle>
                  <UpdateDate>{update.date}</UpdateDate>
                  <Body13
                    dangerouslySetInnerHTML={{ __html: update.text }}
                    style={{ marginBottom: 20 }}
                  />
                </YoutubePlayerWrapper>
              </Grid>
              {update.youtubeId && (
                <Grid item xs={12} md={5}>
                  <LiteYouTubeEmbed
                    id={update.youtubeId}
                    height="250px"
                    params={`start=${update.start}`}
                  />
                </Grid>
              )}
            </Grid>
          </UpdateWrapper>
        ))}
    </SectionWrapper>
  );
}

Updates.propTypes = {
  candidate: PropTypes.object,
};

export default Updates;
