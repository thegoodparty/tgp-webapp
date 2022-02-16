/**
 *
 * ApplicationWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { RiPencilFill } from 'react-icons/ri';
import Grid from '@material-ui/core/Grid';
import Sticky from 'react-sticky-el';
import { useRouter } from 'next/router';

import PageWrapper from '../../shared/PageWrapper';
import { Body13 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';
import LightPurpleButton from '../../shared/buttons/LightPurpleButton';

const Wrapper = styled.div`
  padding: 16px 0;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding: 36px 0;
    display: flex;
  }
`;

const TopMobileNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  font-size: 13px;
  line-height: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.purple};
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: none;
  }
`;

const TopLinks = styled.div`
  display: flex;
`;

const TopLink = styled.div`
  padding: 3px 8px;
  text-align: center;
  color: #caa9e9;
  font-weight: 500;
  border-radius: 4px;

  &.active {
    background-color: #e7d9f3;
    color: ${({ theme }) => theme.colors.purple};
    font-weight: 600;
  }
`;

const LeftNav = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: block;
    padding: 32px 16px 32px 0;
    width: 180px;

    background-color: ${({ theme }) => theme.colors.purpleBg};
  }
`;

const Review = styled.div`
  color: red;
  font-weight: 600;
  margin-bottom: 24px;
  padding: 8px;
`

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
  padding: 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding: 6px 0 0 32px;
    &.with-sticky {
      margin-left: 180px;
    }
  }
`;

const Paper = styled.div`
  background-color: #fff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.04), 0 0 2px rgba(0, 0, 0, 0.06),
    0 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  padding: 16px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding: 24px;
  }

  &.no-white {
    background-color: transparent;
    box-shadow: none;
  }
`;

const BottomFixed = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  padding: 24px 8px;
  background-color: #fff;
  text-align: center;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const ButtonWrapper = styled.div`
  width: 90%;
  max-width: 800px;
  display: inline-block;
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

const topLinks = {};
leftLinks.forEach(link => {
  topLinks[link.step] = link;
});

function ApplicationWrapper({
  step,
  children,
  canContinue,
  id,
  withWhiteBg = true,
  submitApplicationCallback,
  reviewMode,
  approveApplicationCallback,
  rejectApplicationCallback,
}) {
  const [isSticky, setIsSticky] = useState(false);

  const router = useRouter();

  return (
    <PageWrapper purple>
      <Wrapper className="application-wrapper">
        <TopMobileNav>
          <div>{topLinks[step].label}</div>
          <TopLinks>
            {leftLinks.map(link => (
              <Link
                href={`/campaign-application/${link.step}`}
                passHref
                key={link.step}
              >
                <a>
                  <TopLink className={step === link.step && 'active'}>
                    {link.step}
                  </TopLink>
                </a>
              </Link>
            ))}
          </TopLinks>
        </TopMobileNav>
        <Sticky
          onFixedToggle={isOn => setIsSticky(isOn)}
          boundaryElement=".application-wrapper"
        >
          <LeftNav>
            {reviewMode && <Review>REVIEW MODE</Review>}
            {leftLinks.map(link => (
              <Link
                href={`/campaign-application/${id}/${link.step}`}
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
            <br />
            {!reviewMode && (
              <Link href="/profile/campaign-applications" passHref>
                <a>
                  <PurpleButton
                    className="outline"
                    fullWidth
                    style={{ padding: '4px' }}
                  >
                    <RiPencilFill /> &nbsp; Finish Later
                  </PurpleButton>
                </a>
              </Link>
            )}
          </LeftNav>
        </Sticky>
        <MainWrapper className={isSticky && 'with-sticky'}>
          <Paper className={!withWhiteBg && 'no-white'}>{children}</Paper>
        </MainWrapper>
        <BottomFixed>
          {step === 1 && (
            <ButtonWrapper>
              <Link
                href={
                  canContinue ? `/campaign-application/${id}/2` : router.asPath
                }
                passHref
              >
                <a>
                  {reviewMode ? (
                    <PurpleButton fullWidth>Continue</PurpleButton>
                  ) : (
                    <PurpleButton fullWidth disabled={!canContinue}>
                      Continue
                    </PurpleButton>
                  )}
                </a>
              </Link>
            </ButtonWrapper>
          )}
          {step > 1 && (
            <ButtonWrapper>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Link
                    href={`/campaign-application/${id}/${step - 1}`}
                    passHref
                  >
                    <a>
                      <PurpleButton className="outline" fullWidth>
                        Back
                      </PurpleButton>
                    </a>
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  {step === 7 ? (
                    <>
                      {reviewMode ? (
                        <Link href={`/campaign-application/${id}/8`} passHref>
                          <a>
                            <PurpleButton fullWidth>
                              Approve/Reject
                            </PurpleButton>
                          </a>
                        </Link>
                      ) : (
                        <PurpleButton
                          fullWidth
                          disabled={!canContinue}
                          onClick={() => submitApplicationCallback(id)}
                        >
                          Submit for review
                        </PurpleButton>
                      )}
                    </>
                  ) : (
                    <Link
                      href={
                        canContinue
                          ? `/campaign-application/${id}/${step + 1}`
                          : router.asPath
                      }
                      passHref
                    >
                      <a>
                        <PurpleButton fullWidth disabled={!canContinue}>
                          Continue
                        </PurpleButton>
                      </a>
                    </Link>
                  )}
                </Grid>
              </Grid>
            </ButtonWrapper>
          )}
        </BottomFixed>
      </Wrapper>
    </PageWrapper>
  );
}

ApplicationWrapper.propTypes = {
  children: PropTypes.node,
  step: PropTypes.number,
  canContinue: PropTypes.bool,
  withWhiteBg: PropTypes.bool,
  id: PropTypes.number,
  submitApplicationCallback: PropTypes.func,
  approveApplicationCallback: PropTypes.func,
  rejectApplicationCallback: PropTypes.func,
  reviewMode: PropTypes.bool,
};

export default ApplicationWrapper;
