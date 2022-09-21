/**
 *
 * RegisterComboWrapper
 *
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import Image from 'next/image';

import BlackButton, { InnerButton } from '../buttons/BlackButton';

const Wrapper = styled.div`
  padding: 32px;
  border-radius: 12px;
  min-width: 280px;
  width: 100%;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    max-width: 800px;
    width: 80vw;
  }

  input {
    padding: 18px 10px;
    border: 1px solid #c2c2c2;
    width: 100%;
    outline: none;

    &:focus {
      border: 1px solid #000;
    }
  }
  #register-email {
    border-radius: 4px 4px 0 0;
    border-bottom: none;
  }

  #register-zip {
    border-radius: 0 0 4px 4px;
    border-top: none;
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    input {
      border-radius: 4px;
    }
    #register-email {
      border: 1px solid #c2c2c2;
      border-radius: 4px;
    }

    #register-zip {
      border: 1px solid #c2c2c2;
      border-radius: 4px;
    }
  }
`;

const Title = styled.h3`
  font-size: 28px;
  margin: 0 0 20px;
  font-weight: 900;
`;

const SubTitle = styled.div`
  padding-bottom: 35px;
  margin-bottom: 35px;
  font-size: 17px;
  border-bottom: solid 1px #ececec;
`;

const Overflow = styled.div`
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    width: 100%;
    overflow: hidden;
  }
`;

const Inner = styled.div`
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    width: 300%;
    transition: width 0.4s, border 0.4s;

    &.active {
      width: 100%;
      border: solid 2px #000;
      border-radius: 4px;

      input {
        border: none;
        border-right: 1px solid #c2c2c2;
        border-radius: 0;

        &#register-zip {
          border: none;
        }
        &#register-email {
          border-radius: 0;
          border: none;
          border-right: 1px solid #c2c2c2;
        }
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 13px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-left: 16px;
    margin-top: 0;
  }
`;

const ResponsiveRow = styled.div`
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: flex;
    align-items: center;
  }
`;

const BottomRow = styled.div`
  margin-top: 30px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-top: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-top: 70px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    text-align: left;
    margin-top: 0;
  }
`;

function RegisterComboWrapper() {
  const [isActive, setIsActive] = useState(false);
  return (
    <Wrapper>
      <Title>Sign Up</Title>
      <SubTitle>
        Get Good Party updates and track indie campaigns near you!
      </SubTitle>
      <form noValidate onSubmit={(e) => e.preventDefault()}>
        <ResponsiveRow>
          <Overflow>
            <Inner className={isActive && 'active'}>
              <Grid container spacing={0}>
                <Grid xs={12} lg={4}>
                  <input
                    name="email"
                    type="email"
                    id="register-email"
                    placeholder="Email"
                    onBlur={() => setIsActive(false)}
                    onFocus={() => setIsActive(true)}
                  />
                </Grid>
                <Grid xs={12} lg={4}>
                  <input
                    name="name"
                    type="text"
                    id="register-name"
                    placeholder="Name"
                    onBlur={() => setIsActive(false)}
                    onFocus={() => setIsActive(true)}
                  />
                </Grid>
                <Grid xs={12} lg={4}>
                  <input
                    name="zip"
                    type="text"
                    id="register-zip"
                    placeholder="Zip"
                    onBlur={() => setIsActive(false)}
                    onFocus={() => setIsActive(true)}
                  />
                </Grid>
              </Grid>
            </Inner>
          </Overflow>
          <ButtonWrapper>
            <BlackButton
              type="submit"
              style={{ backgroundColor: '#868686', border: '#868686' }}
            >
              <InnerButton style={{ whiteSpace: 'nowrap' }}>
                JOIN US
              </InnerButton>
            </BlackButton>
          </ButtonWrapper>
        </ResponsiveRow>
      </form>
      <BottomRow>
        <div>
          Already signed up?{' '}
          <Link href="/login" passHref>
            <a className="underline">
              <strong>Login</strong>
            </a>
          </Link>
        </div>
        <LogoWrapper>
          <Image
            src="/images/black-logo.svg"
            width={151}
            height={15}
            alt="GOOD PARTY"
          />
        </LogoWrapper>
      </BottomRow>
    </Wrapper>
  );
}

RegisterComboWrapper.propTypes = {};

export default RegisterComboWrapper;
