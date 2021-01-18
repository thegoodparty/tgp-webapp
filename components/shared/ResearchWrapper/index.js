import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import contentfulHelper, { CmsContentWrapper } from 'helpers/contentfulHelper';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { H1 } from '../typogrophy';
import { OutlinedButton } from '../buttons';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
`;

const ButtonWrapper = styled.div`
  align-self: flex-end;
  width: 250px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ResearchWrapper = ({ content }) => {
  let cmsContent = '';
  if (content && content.researchPage) {
    cmsContent = contentfulHelper(content.researchPage.pageContent);
  }

  const handleClick = () => {
    if (content.researchPage && content.researchPage.signUpLink) {
      window.open(content.researchPage.signUpLink, '_blank');
    }
  };
  return (
    <div>
      <Nav />
      <Wrapper white>
        {/* <MobileHeader /> */}
        {content && content.researchPage && (
          <PageWrapper>
            <H1>{content.researchPage.title}</H1>
            <CmsContentWrapper>{cmsContent}</CmsContentWrapper>
            <br />
            <br />
            <ButtonWrapper>
              <OutlinedButton active onClick={handleClick} fullWidth>
                <span>Sign me up</span>
                <ChevronRightIcon />
              </OutlinedButton>
            </ButtonWrapper>
          </PageWrapper>
        )}
      </Wrapper>
    </div>
  );
};

ResearchWrapper.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default ResearchWrapper;
