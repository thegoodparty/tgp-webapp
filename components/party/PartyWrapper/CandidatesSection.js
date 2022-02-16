import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import { Body, Body11, H2 } from '/components/shared/typogrophy';
import CandidateCard from '/components/shared/CandidateCard';

const StyledH2 = styled.h2`
  color: #000;
  font-size: 23px;
  line-height: 30px;
  font-weight: 700;
  margin: 0 0 4px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 30px;
    line-height: 35px;
    margin-bottom: 8px;
  }
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 40px;
    line-height: 48px;
  }
`;

const StyledH3 = styled.h3`
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 24px;
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.gray4};
  font-weight: 400;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 19px;
    line-height: 25px;
    margin-top: 8px;
  }
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 27px;
    line-height: 32px;
    margin-bottom: 40px;
  }
`;

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

const Badge = styled.img`
  height: 16px;
  width: auto;
  margin: 0 4px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    height: 19px;
    margin: 0 6px;
  }
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    height: 27px;
    margin: 0 8px;
  }
`;

const CandidatesSection = ({
  homepageCandidates,
  maxRows = 3,
  hideSeeMore = false,
}) => {
  const columns = 12 / maxRows;

  return (
    <>
      <Title
        style={{ marginBottom: '8px', color: '#000', position: 'relative' }}
      >
        Featured campaigns{' '}
      </Title>

      <StyledH3
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>of</span>{' '}
        <Badge
          src="images/icons/certification-badge.svg"
          alt="tgp certified"
          width={27}
          height={27}
        />{' '}
        <span>Good Certified candidates</span>
      </StyledH3>

      {homepageCandidates && homepageCandidates.length > 0 ? (
        <>
          <Grid
            container
            spacing={5}
            alignItems="center"
            style={{ marginTop: '12px' }}
          >
            {homepageCandidates.map(candidate => (
              <Grid item xs={12} md={columns} key={candidate.id}>
                <CandidateCard candidate={candidate} />
              </Grid>
            ))}
          </Grid>
          {!hideSeeMore && (
            <Link href="/candidates">
              <div className="text-center">
                <SeeMore>SEE MORE</SeeMore>
              </div>
            </Link>
          )}
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
            rel="noopener noreferrer nofollow"
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
  hideSeeMore: PropTypes.bool,
};

export default CandidatesSection;
