import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import ShareImg from 'images/share.png';
import { Body19, Subtitle } from 'components/shared/typogrophy';

const TellMeMoreSectionWrapper = styled.div`
  margin: 24px 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 10rem 0 4rem;
  }
`;

const SectionTitle = styled(Subtitle)`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const RightCol = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LeftCol = styled(Grid)`
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-right: 5rem;
  }
`;

const ImageWrapper = styled.div`
  padding: 24px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0;
  }
`;

const SectionDescription = styled(Body19)`
  padding-right: 1.5rem;
  margin-top: 1rem;
`;

const TellMeMoreForm = styled(Grid)`
  margin-top: 2rem;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-right: 4rem;
  }
`;

const EmailInput = styled.input`
  border: 2px solid ${({ theme }) => theme.colors.grayE};
  border-top-left-radius: 39px;
  border-bottom-left-radius: 39px;

  height: 56px;
  padding: 1rem 0 1rem 2rem;
  font-size: 19px;
  width: 100%;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    border-width: 1.5px;
    height: 40px;
    padding: 0.6rem 0 0.6rem 2rem;
    font-size: 13px;
  }
  &:focus {
    outline: none;
  }
`;

const EamilSubmitButton = styled(Button)`
  && {
    border: ${({ theme }) => `2px solid ${theme.colors.gray9}`};
    border-top-right-radius: 39px;
    border-bottom-right-radius: 39px;
    height: 56px;
    font-size: 16px;
    width: 100%;
    color: ${({ theme }) => theme.colors.gray9};
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
      border-width: 1.5px;
      height: 40px;
      font-size: 11px;
    }
    &:focus {
      outline: none;
    }
  }
`;
const TellMeMoreSection = ({ subscribeEmailCallback }) => {
  const [email, setEmail] = useState('');
  const onSubmitForm = e => e.preventDefault();
  return (
    <TellMeMoreSectionWrapper>
      <Grid container>
        <LeftCol item xs={12} md={5}>
          <ImageWrapper>
            <LazyLoadImage
              src={ShareImg}
              alt="share-tgp"
              className="faq-image"
            />
          </ImageWrapper>
        </LeftCol>
        <RightCol item xs={12} md={7}>
          <SectionTitle>
            The Good Party is here to make votes matter more than money
          </SectionTitle>
          <SectionDescription>
            We are building free open-source systems to enable any candidate
            with good ideas to gather supporters and to turn them into the votes
            needed to win.
          </SectionDescription>
          <form noValidate onSubmit={onSubmitForm}>
            <TellMeMoreForm container>
              <Grid item xs={8}>
                <EmailInput
                  placeholder="your@email.org"
                  type="email"
                  name="EMAIL"
                  className="required email"
                  value={email}
                  onChange={ev => setEmail(ev.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <EamilSubmitButton
                  type="submit"
                  name="subscribe"
                  onClick={() => subscribeEmailCallback(email)}
                >
                  Tell Me More
                </EamilSubmitButton>
              </Grid>
            </TellMeMoreForm>
          </form>
          {/* </form> */}
        </RightCol>
      </Grid>
    </TellMeMoreSectionWrapper>
  );
};

TellMeMoreForm.propTypes = {
  subscribeEmailCallback: PropTypes.func
}

export default TellMeMoreSection;
