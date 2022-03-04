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

const Wrapper = styled.article`
  padding: 36px 0;
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

const Truncated = styled.div`
  display: block;
  display: -webkit-box;
  max-width: 100%;
  height: 43px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function Endorsements() {
  const { candidate } = useContext(CandidateContext);
  const { endorsements } = candidate;

  if (!endorsements || endorsements.length === 0) {
    return <></>;
  }
  return (
    <Wrapper>
      <FontH3 style={{ margin: '0 0 24px' }}>Featured Endorsements</FontH3>
      <Grid container spacing={8}>
        {endorsements.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <EndorsementWrapper>
              {item.image && (
                <div>
                  {<Img style={{ backgroundImage: `url(${item.image})` }} />}
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '12px' }}>
                  <strong>{item.title}</strong>
                </div>
                <Truncated>{item.summary}</Truncated>
                {item.link && (
                  <div className="text-right">
                    <a href={item.link} target="_blank" rel="noreferrer">
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
