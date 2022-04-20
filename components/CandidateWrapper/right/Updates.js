/**
 *
 * Updates
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';

import { CandidateContext } from '/containers/CandidatePage';
import { Font16, FontH3 } from '/components/shared/typogrophy';
import YouTubeLazyPlayer from '../../shared/YouTubeLazyPlayer';

const Wrapper = styled.section`
  margin-bottom: 48px;
`;

const UpdateWrapper = styled.div`
  height: 100%;
  position: relative;
`;

const UpdateDate = styled.div`
  color: #777777;
  margin-top: 20px;
  position: absolute;
  bottom: 12px;
  left: 38px;
`;

const UpdatedTitle = styled(Font16)`
  color: ${({ theme }) => theme.colors.gray3};
  margin-bottom: 4px;
  font-weight: 700;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 19px;
  }

  &.purple {
    color: ${({ theme }) => theme.colors.purple};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 220px;
  img {
    object-fit: cover;
    object-position: center center;
  }
`;

const TextWrapper = styled.div`
  padding: 24px 38px 38px;

  &.text-only {
    background-color: #f3f3f3;
    height: 100%;
  }
`;

const deepLink = (update) => {
  return `#candidate-update-${update.id}`;
};

function Updates({ updates }) {
  const context = useContext(CandidateContext);
  let updatesList;
  if (context) {
    const candidate = context.candidate;
    ({ updatesList } = candidate);
  } else if (updates) {
    updatesList = updates;
  }

  if (!updatesList || updatesList.length === 0) {
    return <> </>;
  }

  const sortedUpdates = [...updatesList];
  sortedUpdates.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const hasFeatured = (update) => update.youtubeId || update.image;

  return (
    <Wrapper>
      <FontH3 style={{ margin: '0 0 24px' }} data-cy="updates-title">Updates</FontH3>
      <Grid container spacing={6}>
        {sortedUpdates &&
          sortedUpdates.reverse().map((update) => (
            <Grid item xs={12} md={6} key={update.id} data-cy="updates-item">
              <UpdateWrapper id={`candidate-update-${update.id}`}>
                {hasFeatured(update) && (
                  <>
                    {update.youtubeId ? (
                      <YouTubeLazyPlayer
                        id={update.youtubeId}
                        params={`start=${update.start}`}
                        height="250px"
                      />
                    ) : (
                      <ImageWrapper>
                        <Image
                          src={update.image}
                          layout="fill"
                          height="200px"
                          alt=""
                        />
                      </ImageWrapper>
                    )}
                  </>
                )}
                <TextWrapper className={!hasFeatured(update) && 'text-only'}>
                  <a href={deepLink(update)} data-cy="updates-link">
                    <UpdatedTitle>{update.title}</UpdatedTitle>
                  </a>
                  <Font16
                    dangerouslySetInnerHTML={{ __html: update.text }}
                    style={{ marginBottom: 20 }}
                    data-cy="updates-content"
                  />{' '}
                  <UpdateDate data-cy="updates-time">{update.timeAgo}</UpdateDate>
                </TextWrapper>
              </UpdateWrapper>
            </Grid>
          ))}
      </Grid>
    </Wrapper>
  );
}

export default Updates;
