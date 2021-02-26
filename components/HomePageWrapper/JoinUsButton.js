import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { PurpleButton } from '../shared/buttons';
import { Body } from '../shared/typogrophy';

const StyledBody = styled(Body)`
  color: #fff;
  padding: 0 24px;
`;

const JoinUsButton = () => {
  return (
    <Link href="?register=true" passHref>
      <a>
        <PurpleButton>
          <StyledBody>JOIN US</StyledBody>
        </PurpleButton>
      </a>
    </Link>
  );
};

export default JoinUsButton;
