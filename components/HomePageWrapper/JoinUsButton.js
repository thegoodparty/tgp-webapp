import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

import { PurpleButton } from '../shared/buttons';
import { Body } from '../shared/typogrophy';

const StyledBody = styled(Body)`
  color: #fff;
  padding: 0 24px;
`;

const JoinUsButton = ({ style = {}, label = 'JOIN US' }) => {
  return (
    <Link href="?register=true" passHref>
      <a>
        <PurpleButton style={style}>
          <StyledBody>{label}</StyledBody>
        </PurpleButton>
      </a>
    </Link>
  );
};

JoinUsButton.propTypes = {
  style: PropTypes.object,
  label: PropTypes.string,
};

export default JoinUsButton;
