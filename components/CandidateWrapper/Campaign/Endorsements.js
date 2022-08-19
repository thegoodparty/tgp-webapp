/**
 *
 *Endorsements
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { CandidateContext } from '/containers/CandidatePage';
import { FontH3 } from '../../shared/typogrophy';

const Wrapper = styled.article``;

const EndorsementWrapper = styled.div`
  display: flex;
`;

const Img = styled.div`
  height: 80px;
  width: 80px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  margin-right: 24px;
`;

const Truncated = styled.div`
  display: block;
  display: -webkit-box;
  max-width: 100%;
  height: 64px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.h3`
  font-size: 16px;
  margin: 0 0 15px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

function Endorsements() {
  const { candidate } = useContext(CandidateContext);
  const { endorsements } = candidate;
  if (endorsements?.length === 0) {
    return <></>;
  }

  return (
    <Wrapper>
      <Title data-cy="endorsement-title">Featured Endorsements</Title>
      <Grid container spacing={2}>
        {endorsements.map((item) => (
          <Grid item xs={12} key={item.id} data-cy="endorsement-item">
            <EndorsementWrapper>
              {item.image && (
                <div>
                  {
                    <Img
                      style={{ backgroundImage: `url(${item.image})` }}
                      data-cy="endorsement-item-img"
                    />
                  }
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div
                  style={{ marginBottom: '12px' }}
                  data-cy="endorsement-item-title"
                >
                  <strong>{item.title}</strong>
                </div>
                <Truncated data-cy="endorsement-item-summary">
                  {item.summary}
                </Truncated>
                {item.link && (
                  <div className="text-right">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      data-cy="endorsement-item-link"
                    >
                      Show More
                    </a>
                  </div>
                )}
              </div>
            </EndorsementWrapper>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default Endorsements;
