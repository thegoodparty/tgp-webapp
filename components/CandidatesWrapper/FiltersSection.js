/**
 *
 * FiltersSection
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsFilter } from 'react-icons/bs';

import { CandidatesContext } from '/containers/CandidatesPage';
import { FontH3 } from '../shared/typogrophy';
import BlackButton from '../shared/buttons/BlackButton';

const Section = styled.section`
  padding: 16px 28px;
  background-color: #fafafa;
  border-radius: 16px;
`;

const ShareWrapper = styled.div`
  text-align: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    text-align: right;
  }
`;

const InnerButton = styled.div`
  padding: 0 24px;
  font-size: 12px;
`;

const FilterBy = styled.div`
  padding-top: 16px;
  margin-top: 16px;
  border-top: solid 1px #e6e6e6;
`;

const FilterBtn = styled.div`
  display: inline-block;
  padding: 8px;
  border: solid 1px #000;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  transition: background-color 0.5s, color 0.5s;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

function FiltersSection() {
  const { candidates } = useContext(CandidatesContext);
  const router = useRouter();
  return (
    <Section>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} lg={9}>
          <FontH3 style={{ margin: 0 }}>
            {candidates.length} Good Certified Candidates who people should know
            about
          </FontH3>
        </Grid>
        <Grid item xs={12} lg={3}>
          <ShareWrapper>
            Spread the word! &nbsp;{' '}
            <Link href={`${router.asPath}?share=true`} passHref>
              <a>
                <BlackButton style={{ marginLeft: '24px' }}>
                  <InnerButton>Share</InnerButton>
                </BlackButton>
              </a>
            </Link>
          </ShareWrapper>
        </Grid>
      </Grid>
      <FilterBy>
        <FilterBtn>
          <BsFilter />
          &nbsp; FILTER BY...
        </FilterBtn>
      </FilterBy>
    </Section>
  );
}

export default FiltersSection;
