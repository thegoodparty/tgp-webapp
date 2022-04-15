/**
 *
 * StaffCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from 'next/image';
import { partyResolver } from '/helpers/electionsHelper';
import Link from 'next/link';
import { FontH3 } from '/components/shared/typogrophy';
import BlackButton from '/components/shared/buttons/BlackButton';

const Wrapper = styled.div`
  border-radius: 16px;
  padding: 16px 16px 100px;
  border: 2px solid #ededed;
  color: #000;
  height: 100%;
  position: relative;
  background-color: #fff;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 250px;

  img {
    object-fit: contain;
    object-position: center center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

const Content = styled.div`
  padding: 24px 8px 8px;
`;

const Name = styled(FontH3)`
  font-size: 21px;
  font-weight: 600;
  margin: 0 0 8px;
`;

const Gray = styled.div`
  color: #4d4d4d;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  left: 24px;
  bottom: 24px;
  width: calc(100% - 48px);
`;

function StaffCard({ candidate, role }) {
  if (!candidate) {
    return <></>;
  }
  const { id, firstName, lastName, image, race, party, otherParty } = candidate;
  return (
    <Link href={`/candidate-portal/${id}`} passHref style={{ height: '100%' }}>
      <a style={{ height: '100%' }}>
        <Wrapper>
          <ImageWrapper>
            {image && (
              <Image
                src={image}
                layout="fill"
                alt={`${firstName} ${lastName}`}
              />
            )}
          </ImageWrapper>
          <Content>
            <Name>
              {firstName} {lastName}
            </Name>
            <Gray>
              {partyResolver(party, otherParty)} {party !== 'I' ? 'Party' : ''}{' '}
              Candidate <br />
              for <strong>{race}</strong>
            </Gray>
            <br />
            <strong>Role: {role}</strong>
            <br />
            <ButtonWrapper>
              <BlackButton
                fullWidth
                style={{ textTransform: 'none', marginTop: '32px' }}
              >
                Manage Campaign
              </BlackButton>
            </ButtonWrapper>
          </Content>
        </Wrapper>
      </a>
    </Link>
  );
}

StaffCard.propTypes = {
  candidate: PropTypes.object,
};

export default StaffCard;
