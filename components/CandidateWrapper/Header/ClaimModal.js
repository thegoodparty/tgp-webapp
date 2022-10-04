/**
 *
 * ClaimModal
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Image from 'next/image';
import { MdClose } from 'react-icons/md';

import { CandidateContext } from '/containers/CandidatePage';
import Row from '../../shared/Row';
import { partyRace } from '../../../helpers/candidatesHelper';
import EmailInput, { isValidEmail } from '../../shared/EmailInput';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import { getUserCookie } from '../../../helpers/cookieHelper';
import PhoneInput, { isValidPhone } from '../../shared/PhoneInput';

const Wrapper = styled.div`
  padding: 18px;
  background-color: #fff;
  border-radius: 12px;
  max-width: 600px;
  min-width: 300px;
  font-size: 16px;
  position: relative;
  @media only screen and (min-width: 1024px) {
    padding: 60px;
  }

  .MuiInputBase-input {
    line-height: 22px;
    font-size: 16px;

    @media only screen and (min-width: 768px) {
      font-size: 20px;
      line-height: 26px;
    }
  }
`;

const CloseWrapper = styled.div`
  display: inline-block;
  padding: 12px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  @media only screen and (min-width: 1024px) {
    padding: 24px;
  }
`;

const Title = styled.div`
  font-size: 33px;
  font-weight: 900;
  margin-bottom: 36px;
`;

const ImageWrapper = styled.div`
  height: 32px;
  width: 32px;
  position: relative;
  margin-right: 10px;

  img {
    object-fit: cover;
    object-position: top center;
    border-radius: 50%;
  }
`;

const Gray = styled.div`
  color: #999;
  font-size: 15px;
  margin-top: 2px;
`;

const Line = styled.div`
  height: 1px;
  margin: 26px 0 48px;
  background-color: #ececec;
`;

const Back = styled.div`
  margin-top: 48px;
  text-decoration: underline;
  cursor: pointer;
`;
function ClaimModal({ closeModalCallback }) {
  const { candidate, claimCampaignCallback, claiming } =
    useContext(CandidateContext);
  const user = getUserCookie(true);
  const [state, setState] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    phone: user ? user.phone : '',
    formSent: false,
  });
  const { image, firstName, lastName } = candidate;

  const onChangeField = (event, key) => {
    setState({
      ...state,
      [key]: event.target.value,
    });
  };

  const canSubmit = () => {
    return (
      isValidEmail(state.email) &&
      state.name.length > 2 &&
      (state.phone === '' || isValidPhone(state.phone))
    );
  };

  const submitForm = () => {
    if (canSubmit()) {
      claimCampaignCallback(state.name, state.email, state.phone, candidate.id);
      setState({
        ...state,
        formSent: true,
      });
    }
  };

  const showSuccess = claiming === false && state.formSent;
  return (
    <Wrapper>
      <CloseWrapper onClick={closeModalCallback}>
        <MdClose />
      </CloseWrapper>
      <Title>Claim this campaign</Title>
      <Row>
        {image && (
          <ImageWrapper>
            <Image src={image} layout="fill" />
          </ImageWrapper>
        )}
        <div>
          <strong>
            {firstName} {lastName}
          </strong>
          <br />
          <Gray>{partyRace(candidate, false)}</Gray>
        </div>
      </Row>
      <Line />
      {showSuccess ? (
        <div className="text-center">
          <span role="img" aria-label="Party" style={{ fontSize: '33px' }}>
            🎉
          </span>
          <Title style={{ marginBottom: '22px' }}>Thank you!</Title>
          <div>
            Someone will be reaching out to
            <br />
            you from our team shortly.
          </div>

          <Back onClick={closeModalCallback}>Back to campaign</Back>
        </div>
      ) : (
        <form noValidate onSubmit={(e) => e.preventDefault()}>
          <TextField
            fullWidth
            primary
            label="Name"
            variant="outlined"
            value={state.name}
            onChange={(e) => onChangeField(e, 'name')}
            error={state.name != '' && state.name.length < 2}
          />
          <br />
          <br />
          <br />
          <EmailInput
            hideIcon
            onChangeCallback={(e) => onChangeField(e, 'email')}
            value={state.email}
          />
          <br />
          <br />
          <br />
          <PhoneInput
            hideIcon
            onChangeCallback={(value) =>
              onChangeField({ target: { value } }, 'phone')
            }
            value={state.phone}
          />
          <BlackButton
            disabled={!canSubmit()}
            onClick={submitForm}
            id="claim-campaign-modal"
            type="submit"
          >
            <InnerButton>Submit</InnerButton>
          </BlackButton>
        </form>
      )}
    </Wrapper>
  );
}

export default ClaimModal;
