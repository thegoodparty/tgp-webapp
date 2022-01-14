/**
 *
 * ApplicationStep8
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  color: ${({ theme }) => theme.colors.purple};
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
  const router = useRouter();
  return (
    <PageWrapper purple>
      <Wrapper>
        <div>
          <StyledH1 className="purple">
            Thanks for submitting your campaign!
          </StyledH1>
          <Body style={{ marginBottom: '40px', color: '#1a1a1a' }}>
            We will review your submission and get back to you soon.
          </Body>
          <Link href="/profile" passHref>
            <A>
              <LightPurpleButton fullWidth>
                <InnerButton>Complete your Good Party profile</InnerButton>
              </LightPurpleButton>
            </A>
          </Link>
          <Link href={`${router.asPath}?share=true`}>
            <A style={{ marginBottom: '8px', display: 'block' }}>
              <LightPurpleButton fullWidth>
                <InnerButton> Spread the word about Good Party</InnerButton>
              </LightPurpleButton>
            </A>
          </Link>
          <Link href="/candidates" passHref>
            <A>
              <LightPurpleButton fullWidth>
                <InnerButton> Support other Good Party candidates</InnerButton>
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
