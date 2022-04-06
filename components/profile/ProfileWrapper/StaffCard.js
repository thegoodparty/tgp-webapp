/**
 *
 * StaffCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import CandidateAvatar from '../../shared/CandidateCard/CandidateAvatar';
import { PurpleButton } from '../../shared/buttons';
import { Body, Body14 } from '../../shared/typogrophy';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.purple3};
  border-radius: 8px;
  padding: 20px 25px;
  text-align: center;
  box-shadow: -9px 18px 30px rgba(224, 212, 234, 0.2),
    18px -18px 30px rgba(224, 212, 234, 0.2),
    -18px -18px 30px rgba(255, 255, 255, 0.9),
    18px 18px 30px rgba(224, 212, 234, 0.9),
    inset 1px 1px 2px rgba(255, 255, 255, 0.3),
    inset -1px -1px 2px rgba(224, 212, 234, 0.5);
`;

const Name = styled.h3`
  font-size: 23px;
  font-weight: 700;
  margin: 20px 0;
  color: #000;
`;

const Role = styled(Body14)`
  font-size: 23px;
  font-weight: 500;
  margin: 20px 0;
  color: #666;
  text-transform: capitalize;
`;

const ButtonInner = styled.div`
  padding: 0 40px;
  font-size: 13px;
  font-weight: 600;
`;

function StaffCard({ staff }) {
  if (!staff || !staff.candidate) {
    return <></>;
  }
  if (typeof staff.candidate === 'string') {
    staff.candidate = JSON.parse(staff.candidate);
  }

  const { id, image, firstName, lastName, party, isDraft } = staff.candidate;
  return (
    <Link href={`/candidate-portal/${id}`} passHref>
      <a>
        <Wrapper>
          <CandidateAvatar
            avatar={image}
            party={party}
            size="medium"
            partyBadge
            centered
            hideBadge={isDraft}
          />
          <Name>
            {firstName} {lastName}
          </Name>
          <Role>
            Role: {staff.role}
          </Role>

          <PurpleButton>
            <ButtonInner>Manage Campaign</ButtonInner>
          </PurpleButton>
        </Wrapper>
      </a>
    </Link>
  );
}

StaffCard.propTypes = {
  staff: PropTypes.object,
};

export default StaffCard;
