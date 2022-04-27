/**
 *
 * ProfileInfo
 *
 */

import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { IoMdCloseCircleOutline } from 'react-icons/io';

import { logEvent } from '/services/AnalyticsService';

import { Font16 } from '/components/shared/typogrophy';
import { CandidateContext } from '/containers/CandidatePage';
import BlackButton from '../../shared/buttons/BlackButton';

const HeartIconWhite = '/images/white-heart.svg';

const Img = styled.img`
  top: 3px;
  position: relative;
  height: 12px;
  margin-right: 5px;

  @media only screen and (min-width: 500px) {
    top: 4px;
    margin-right: 10px;
    height: 16px;
  }
`;

const InnerButton = styled(Font16)`
  text-align: center;
  color: #fff;
  font-weight: 600;
`;

const AddName = styled.div`
  text-align: center;
`;
const Support = styled(Font16)`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray9};
`;

const GrayLogo = styled.img`
  height: 16px;
  width: auto;
  margin-right: 4px;
`;

const Input = styled(TextField)`
  && {
    margin-bottom: 18px;

    .MuiInputBase-input {
      line-height: 22px;
      font-size: 16px;
      letter-spacing: 0.1px;
      background-color: #fff;
      border-radius: 4px;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpointsPixels.md}) {
        font-size: 20px;
        line-height: 26px;
      }
    }
  }
`;

const Error = styled(Font16)`
  margin-bottom: 8px;
  color: red;
`;

const fields = [
  {
    label: 'Full Name',
    key: 'name',
    type: 'text',
    required: true,
  },
  {
    label: 'Email or 10 digits Phone number',
    key: 'email',
    type: 'email',
    required: true,
  },

  {
    label: 'Zip Code',
    key: 'zipcode',
    type: 'text',
    required: true,
  },
];

function SupportButton() {
  const {
    candidate,
    user,
    isUserSupportCandidate,
    userSupportCallback,
    guestSupportCallback,
    removeSupportCallback,
  } = useContext(CandidateContext);

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    zipcode: '',
    error: false,
    errorField: false,
  });

  const handleSupport = () => {
    logEvent('Endorse Candidate', 'Candidate endorse button', 'Endorsements');
    if (user) {
      userSupportCallback(candidate.id);
    } else {
      if (formData.name === '') {
        setFormData({
          ...formData,
          error: 'Name is required',
          errorField: 'name',
        });
        return;
      }
      if (formData.email === '') {
        setFormData({
          ...formData,
          error: 'Email or phone are required',
          errorField: 'email',
        });
        return;
      }
      if (formData.zipcode === '') {
        setFormData({
          ...formData,
          error: 'Zip code is required',
          errorField: 'zipcode',
        });
        return;
      }
      const fiveDigits = /^\d{5}$/;
      if (!fiveDigits.test(formData.zipcode)) {
        setFormData({
          ...formData,
          error: 'Please enter a 5 digit zipcode',
          errorField: 'zipcode',
        });
        return;
      }

      const format =
        /^([a-zA-Z0-9_+\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;
      if (!format.test(formData.email)) {
        setFormData({
          ...formData,
          error: 'Please enter a valid email or 10 digits phone number',
        });
        return;
      }
      const tenDigits = /^\d{10}$/;
      if (tenDigits.test(formData.email)) {
        guestSupportCallback(candidate.id, {
          name: formData.name,
          phone: formData.email,
          zip: formData.zipcode,
        });
      } else {
        guestSupportCallback(candidate.id, {
          name: formData.name,
          email: formData.email,
          zip: formData.zipcode,
        });
      }
    }
  };
  const handleRemoveSupport = () => {
    logEvent(
      'Remove Endorse Candidate',
      'Candidate endorse button',
      'Endorsements',
    );

    removeSupportCallback(candidate.id);
  };
  const onChangeField = (event, key) => {
    setFormData({
      ...formData,
      [key]: event.target.value,
    });
  };
  // const canEndorse = () => {};

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  const { color } = candidate;
  const brightColor = color?.color ? color.color : '#000';

  return (
    <>
      {isUserSupportCandidate ? (
        <>
          <Support>
            <GrayLogo src="https://assets.goodparty.org/gray9-heart.svg" />
            <AddName>YOU HAVE ENDORSED THIS CANDIDATE</AddName>
            <IoMdCloseCircleOutline
              size={16}
              style={{ marginLeft: '4px', cursor: 'pointer' }}
              onClick={handleRemoveSupport}
            />
          </Support>
          <Link href={`${router.asPath}?share=true`} passHref>
            <a>
              <BlackButton
                fullWidth
                style={{
                  marginTop: '12px',
                  backgroundColor: brightColor,
                  borderColor: brightColor,
                }}
              >
                Share
              </BlackButton>
            </a>
          </Link>
        </>
      ) : (
        <>
          <form noValidate onSubmit={handleSubmitForm}>
            {!user && (
              <div>
                {fields.map((field, index) => (
                  <Input
                    key={index}
                    value={formData[field.key]}
                    label={field.label}
                    required={field.required}
                    size="medium"
                    fullWidth
                    type={field.type}
                    name={field.key}
                    variant="outlined"
                    onChange={(e) => onChangeField(e, field.key)}
                    helperText={field.helperText}
                    id={`endorse-${field.key}`}
                    error={formData.errorField === field.key}
                  />
                ))}
                {formData.error && <Error>{formData.error}</Error>}
              </div>
            )}

            <BlackButton
              fullWidth
              onClick={handleSupport}
              style={{
                border: `solid 2px ${brightColor}`,
                backgroundColor: brightColor,
              }}
              type="submit"
            >
              <InnerButton>
                <Img src={HeartIconWhite} alt="share" data-cy="support-icon"/>
                <span  data-cy="support-button">ENDORSE CANDIDATE</span>
              </InnerButton>
            </BlackButton>
          </form>
        </>
      )}
    </>
  );
}

export default SupportButton;
