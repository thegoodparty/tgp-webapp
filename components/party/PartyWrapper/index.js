import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CandidatesSection from 'components/HomePageWrapper/CandidatesSection';

import contentfulHelper, { CmsContentWrapper } from 'helpers/contentfulHelper';
import PageWrapper from 'components/shared/PageWrapper';
import { Body, H2 } from 'components/shared/typogrophy';

const Content = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
  padding-bottom: 48px;
`;
const Inner = styled.div`
  max-width: 680px;
  margin: 40px auto 0;
  &> div:first-child > h2 {
    font-size: 40px;
  }
`;

const HowWorks = styled.div`
  margin: 48px 0;
`;

const WorksItem = styled.div`
  display: flex;
  margin-top: 24px;
`;

const Img = styled.img`
  width: 90px;
  height: auto;
  margin-right: 24px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-right: 36px;
  }
`;

const ItemTitle = styled(Body)`
  font-weight: 700;
  margin-bottom: 6px;
`;

const ItemText = styled(Body)``;

const PartyWrapper = ({ content, candidates }) => {
  let mainContent = '';
  if (content && content.partyPage) {
    mainContent = contentfulHelper(content.partyPage.content);
  }

  return (
    <PageWrapper purple isFullWidth>
      <div style={{ padding: '0 20px' }}>
        <Content>
          <Inner>
            {content && <CmsContentWrapper>{mainContent}</CmsContentWrapper>}
            <HowWorks>
              <H2>How Crowd Voting Works:</H2>
              <WorksItem style={{ marginTop: '32px' }}>
                <div>
                  <Img src="images/see-good-candidates.svg" />
                </div>
                <ItemText>
                  <ItemTitle>Launch</ItemTitle>
                  We provide a platform for you to meet indie grassroots
                  candidates and for good candidates to run free campaigns. No
                  more big dollar donations necessary
                </ItemText>
              </WorksItem>
              <WorksItem>
                <div>
                  <Img src="images/join-campaigns.svg" />
                </div>
                <ItemText>
                  <ItemTitle>Empower</ItemTitle>
                  You can make a difference in getting good candidates elected,
                  by simply clicking “endorse” and sharing with your friends. We
                  will never ask you for a donation.
                </ItemText>
              </WorksItem>
              <WorksItem>
                <div>
                  <Img src="images/tell-others.svg" />
                </div>
                <ItemText>
                  <ItemTitle>Change</ItemTitle>
                  With your help, our free and open technology is changing the
                  political landscape and the world. Allowing good candidates to
                  run for office without taking big donations.
                  <div style={{ marginTop: '32px' }}>
                    Finally, we have a way to get money out of politics and have
                    our voices heard!
                  </div>
                </ItemText>
              </WorksItem>
            </HowWorks>
            {candidates && (
              <CandidatesSection homepageCandidates={candidates} maxRows={2} />
            )}
          </Inner>
        </Content>
      </div>
    </PageWrapper>
  );
};

PartyWrapper.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  candidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default PartyWrapper;
