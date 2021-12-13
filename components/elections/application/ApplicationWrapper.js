/**
 *
 * ApplicationWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import PageWrapper from '../../shared/PageWrapper';
import { Body13 } from '../../shared/typogrophy';

const Wrapper = styled.div`
  padding: 36px 0;
  display: flex;
`;

const LeftNav = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: block;
    padding: 32px 0;
  }
`;

const LeftLink = styled(Body13)`
  color: #caa9e9;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;

  &.active {
    background-color: #e7d9f3;
    color: ${({ theme }) => theme.colors.purple};
    font-weight: 600;
  }
`;

const MainWrapper = styled.div`
  flex: 1;
  padding: 6px 32px;
`;

const Paper = styled.div`
  background-color: #fff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.04), 0 0 2px rgba(0, 0, 0, 0.06),
    0 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  padding: 24px;
`;

const leftLinks = [
  { step: 1, label: 'Good Party Pledge' },
  { step: 2, label: 'Candidate Details' },
  { step: 3, label: 'Campaign Details' },
  { step: 4, label: 'Contacts' },
  { step: 5, label: 'Issues' },
  { step: 6, label: 'Endorsements' },
  { step: 7, label: 'Checklist' },
];

function ApplicationWrapper({ step, children }) {
  return (
    <PageWrapper purple>
      <Wrapper>
        <LeftNav>
          {leftLinks.map(link => (
            <Link
              href={`/campaign-application/${link.step}`}
              passHref
              key={link.step}
            >
              <a>
                <LeftLink className={step === link.step && 'active'}>
                  {link.label}
                </LeftLink>
              </a>
            </Link>
          ))}
        </LeftNav>
        <MainWrapper>
          <Paper>{children}</Paper>
        </MainWrapper>
      </Wrapper>
    </PageWrapper>
  );
}

ApplicationWrapper.propTypes = {
  children: PropTypes.node,
  step: PropTypes.number,
};

export default ApplicationWrapper;
