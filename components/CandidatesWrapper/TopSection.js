/**
 *
 * TopSection
 *
 */

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FontH1 } from '../shared/typogrophy';
import CertifiedBadge from '../shared/CertifiedBadge';
import BlackOutlinedButton from '../shared/buttons/BlackOutlinedButton';
import GoodCertifiedPoints from './GoodCertifiedPoints';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Subtitle = styled.h2`
  font-size: 16px;
  color: #666;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 48px;
`;

const Why = styled.div`
  margin: 20px 0;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ButtonWrapper = styled.div`
  display: block;
  margin: 10px 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: inline-block;
    margin: 0 10px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

function TopSection() {
  const router = useRouter();
  return (
    <section className="text-center">
      <Row>
        <CertifiedBadge height={50} />
        &nbsp;&nbsp;
        <FontH1 data-cy="candidates-top-section-title">Good Certified Candidates are...</FontH1>
      </Row>
      <Subtitle data-cy="candidates-top-section-subtitle">FROM ACROSS THE POLITICAL SPECTRUM</Subtitle>
      <GoodCertifiedPoints />
      <Why>
        <Link href={`${router.asPath}?article=FqZOWMEEYfcXbASjaRkMU`} passHref>
          <a className="no-underline" data-cy="candidates-article-link">
            <ButtonWrapper>
              <BlackOutlinedButton active data-cy="candidates-article-link-label">
                Why is this important?
              </BlackOutlinedButton>
            </ButtonWrapper>
          </a>
        </Link>
        <Link href="/run" passHref>
          <a data-cy="candidates-run-link">
            <ButtonWrapper data-cy="candidates-run-link-label">Want to Run for Office?</ButtonWrapper>
          </a>
        </Link>
      </Why>
    </section>
  );
}

export default TopSection;
