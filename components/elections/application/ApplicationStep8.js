/**
 *
 * ApplicationStep8
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import PageWrapper from '../../shared/PageWrapper';
import { Body, H1 } from '../../shared/typogrophy';
import LightPurpleButton from '../../shared/buttons/LightPurpleButton';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  height: 100%;
  min-height: calc(100vh - 80px);
`;

const StyledH1 = styled(H1)`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 16px;
`;

const A = styled.a`
  margin-bottom: 8px;
  display: block;
`;

const InnerButton = styled.span`
  font-weight: 600;
`;

function ApplicationStep8() {
  return (
    <PageWrapper purple>
      <Wrapper>
        <div>
          <StyledH1>
            Thanks for submitting your campaign!
          </StyledH1>
          <Body style={{ marginBottom: '40px', color: '#1a1a1a' }}>
            We will review your submission and get back to you soon.
          </Body>
          <Link href="/" passHref>
            <A>
              <LightPurpleButton fullWidth>
                <InnerButton>Back to Homepage</InnerButton>
              </LightPurpleButton>
            </A>
          </Link>
        </div>
      </Wrapper>
    </PageWrapper>
  );
}

ApplicationStep8.propTypes = {};

export default ApplicationStep8;
