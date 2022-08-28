/**
 *
 *Endorsements
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { CandidateContext } from '/containers/CandidatePage';

const Wrapper = styled.article`
  margin-bottom: 36px;
`;

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

const Title = styled.h3`
  font-size: 16px;
  margin: 0 0 15px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

const Summary = styled.div`
  max-width: calc(100vw - 48px);
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    max-width: 382px;

    .with-image {
      max-width: 278px;
    }
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
                      alt="Endorsement"
                    />
                  }
                </div>
              )}
              <div style={{ flex: 1 }}>
                <Summary
                  style={{ marginBottom: '12px' }}
                  data-cy="endorsement-item-title"
                  className={`break-word ${item.image && 'with-image'}`}
                >
                  <strong>{item.title}</strong>
                </Summary>
                <Summary
                  data-cy="endorsement-item-summary"
                  className={`break-word ${item.image && 'with-image'}`}
                >
                  {item.summary}
                </Summary>
                {item.link && (
                  <div className="text-right" style={{ marginTop: '8px' }}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      data-cy="endorsement-item-link"
                    >
                      Learn More <FaExternalLinkAlt size={12} />
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
