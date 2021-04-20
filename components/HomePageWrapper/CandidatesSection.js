import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import { Body, Body11, H2 } from '../shared/typogrophy';
import CandidateCard from '../shared/CandidateCard';
import StyledH2 from './StyledH2';

const SeeMore = styled(Body11)`
  color: ${({ theme }) => theme.colors.purple};
  border: solid 1px ${({ theme }) => theme.colors.purple};
  display: inline-block;
  border-radius: 8px;
  padding: 14px 18px;
  font-weight: 500;
  margin-top: 24px;
  cursor: pointer;
`;

const Title = styled(StyledH2)`
  color: #000;
  position: relative;
  text-align: center;
`;

const CandidatesSection = ({ homepageCandidates, maxRows = 3 }) => {
  const columns = 12 / maxRows;

  return (
    <>
      <Title
        style={{ marginBottom: '8px', color: '#000', position: 'relative' }}
      >
        Featured crowd-voting campaigns
      </Title>

      {homepageCandidates && homepageCandidates.length > 0 ? (
        <>
          <Grid
            container
            spacing={5}
            alignItems="center"
            style={{ marginTop: '12px' }}
          >
            {homepageCandidates.map(candidate => (
              <Grid item xs={12} md={columns}>
                <CandidateCard candidate={candidate} />
              </Grid>
            ))}
          </Grid>
          <Link href="/candidates">
            <div className="text-center">
              <SeeMore>SEE MORE</SeeMore>
            </div>
          </Link>
        </>
      ) : (
        <>
          <Body>
            We are actively recruiting candidates now, and will have some to
            show you very soon. In the meanwhile, if you know any good
            candidates please nominate them!
          </Body>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe78SJOH5edK4jTyOWVhs-b8AIf9_ElONlc5opPgzHnnpm_0Q/viewform?usp=sf_link"
            target="_blank"
            rel="nofollow"
          >
            <SeeMore style={{ marginTop: '12px' }}>
              NOMINATE A CANDIDATE
            </SeeMore>
          </a>
        </>
      )}
    </>
  );
};

CandidatesSection.propTypes = {
  homepageCandidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  maxRows: PropTypes.number,
};

export default CandidatesSection;
