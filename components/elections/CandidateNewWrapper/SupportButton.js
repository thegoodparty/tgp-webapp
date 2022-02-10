/**
 *
 * ProfileInfo
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import { IoMdCloseCircleOutline } from 'react-icons/io';

import { PurpleButton } from '/components/shared/buttons';
import { logEvent } from '/services/AnalyticsService';

import { Body11, Body13 } from '../../shared/typogrophy';

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

const InnerButton = styled(Body13)`
  text-align: center;
  color: #fff;
  font-size: 9px;
  @media only screen and (min-width: 500px) {
    font-size: 13px;
  }
`;

const AddName = styled.div`
  text-align: center;
`;
const Support = styled(Body11)`
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

const Error = styled(Body13)`
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

function SupportButton({
  supportCallback,
  removeSupportCallback,
  isUserSupportCandidate,
  trackingLabel = '',
  withForm = false,
  user,
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    zipcode: '',
    error: false,
    errorField: false,
  });

  const handleSupport = () => {
    logEvent('Endorse Candidate', trackingLabel, 'Endorsements');
    if (withForm) {
      if (user) {
        supportCallback();
      }
      if (formData.name === '') {
        console.log('name');
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

      const format = /^([a-zA-Z0-9_+\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;
      if (!format.test(formData.email)) {
        setFormData({
          ...formData,
          error: 'Please enter a valid email or 10 digits phone number',
        });
        return;
      }
      const tenDigits = /^\d{10}$/;
      if (tenDigits.test(formData.email)) {
        supportCallback({
          name: formData.name,
          phone: formData.email,
          zip: formData.zipcode,
        });
      } else {
        supportCallback({
          name: formData.name,
          email: formData.email,
          zip: formData.zipcode,
        });
      }
    } else {
      const endorseInput = document.getElementById('endorse-name');
      if (endorseInput) {
        endorseInput.focus();
      }
    }
  };
  const handleRemoveSupport = () => {
    logEvent('Remove Endorse Candidate', trackingLabel, 'Endorsements');

    removeSupportCallback();
  };
  const onChangeField = (event, key) => {
    setFormData({
      ...formData,
      [key]: event.target.value,
    });
  };
  // const canEndorse = () => {};

  const handleSubmitForm = e => {
    e.preventDefault();
  };

  return (
    <>
      {isUserSupportCandidate ? (
        <Support>
          <GrayLogo src="https://assets.goodparty.org/gray9-heart.svg" />
          <AddName>YOU HAVE ENDORSED THIS CANDIDATE</AddName>
          <IoMdCloseCircleOutline
            size={16}
            style={{ marginLeft: '4px', cursor: 'pointer' }}
            onClick={handleRemoveSupport}
          />
        </Support>
      ) : (
        <>
          <form noValidate onSubmit={handleSubmitForm}>
            {withForm && !user && (
              <div>
                {fields.map(field => (
                  <Input
                    value={formData[field.key]}
                    label={field.label}
                    required={field.required}
                    size="medium"
                    fullWidth
                    type={field.type}
                    name={field.key}
                    variant="outlined"
                    onChange={e => onChangeField(e, field.key)}
                    helperText={field.helperText}
                    id={`endorse-${field.key}`}
                    error={formData.errorField === field.key}
                  />
                ))}
                {formData.error && <Error>{formData.error}</Error>}
              </div>
            )}

            <PurpleButton
              fullWidth
              onClick={handleSupport}
              style={{ border: 'solid 2px #5C00C7' }}
              type="submit"
            >
              <InnerButton>
                <Img src={HeartIconWhite} alt="share" />
                <span>ENDORSE CANDIDATE</span>
              </InnerButton>
            </PurpleButton>
          </form>
        </>
      )}
    </>
  );
}

SupportButton.propTypes = {
  supportCallback: PropTypes.func,
  removeSupportCallback: PropTypes.func,
  isUserSupportCandidate: PropTypes.bool,
  trackingLabel: PropTypes.string,
  withForm: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default SupportButton;
