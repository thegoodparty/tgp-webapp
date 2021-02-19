/**
 *
 * ProfileInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { IoMdCloseCircleOutline } from 'react-icons/io';

import { PurpleButton } from 'components/shared/buttons';

import { Body11, Body12, Body13 } from '../../shared/typogrophy';

const HeartIconWhite = '/images/white-heart.svg';

const Img = styled.img`
  top: 4px;
  position: relative;
  height: 16px;
  margin-right: 10px;

  &.heart {
    top: 4px;
    width: 24px;
  }
`;

const InnerButton = styled(Body13)`
  text-align: center;
  color: #fff;
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

function SupportButton({
  supportCallback,
  removeSupportCallback,
  isUserSupportCandidate,
}) {
  return (
    <>
      {isUserSupportCandidate ? (
        <Support>
          <GrayLogo src="https://assets.thegoodparty.org/gray9-heart.svg" />
          <AddName>YOU SUPPORT THIS CANDIDATE</AddName>
          <IoMdCloseCircleOutline
            size={16}
            style={{ marginLeft: '4px', cursor: 'pointer' }}
            onClick={removeSupportCallback}
          />
        </Support>
      ) : (
        <PurpleButton fullWidth onClick={supportCallback}>
          <InnerButton>
            <Img src={HeartIconWhite} alt="share" />
            <span>ENDORSE CANDIDATE</span>
          </InnerButton>
        </PurpleButton>
      )}
    </>
  );
}

SupportButton.propTypes = {
  supportCallback: PropTypes.func,
  removeSupportCallback: PropTypes.func,
  isUserSupportCandidate: PropTypes.bool,
};

export default SupportButton;
