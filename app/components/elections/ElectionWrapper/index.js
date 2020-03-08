import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Wrapper from 'components/shared/Wrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/Nav';
import { Body, H1 } from 'components/shared/typogrophy';
import TopQuestions from 'components/shared/TopQuestions';
import Ama from 'components/shared/Ama';
import articlesHelper from 'helpers/articlesHelper';
import BlueButton from 'components/shared/buttons/BlueButton';
import GoodPartyStats from '../GoodPartyStats';
import VsList from '../VsList';

const GrayPage = styled.div`
  background-color: ${({ theme }) => theme.colors.grayBg};
`;

const Description = styled(Body)`
  margin-top: 10px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  max-width: 400px;
  margin: 16px auto 24px;
`;

const ElectionWrapper = ({ electionType, candidates = {}, content }) => {
  let articles = [];
  if (content && content.faqArticles) {
    articles = articlesHelper(content.faqArticles, 'election');
  }

  return (
    <GrayPage>
      {candidates ? (
        <>
          <Nav />
          <Wrapper>
            <MobileHeader />

            <H1>{electionType} Elections</H1>
            <Description>
              If we count enough support, we will use the{' '}
              <strong>write-in vote</strong> to bypass the corrupt partisan
              system and get our best candidate elected!{' '}
            </Description>
            <ButtonWrapper>
              <Link to="/elections/rank-presidential-candidates">
                <BlueButton
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  RANK CANDIDATES
                </BlueButton>
              </Link>
            </ButtonWrapper>
            <VsList candidates={candidates} />

            <GoodPartyStats />
            <TopQuestions articles={articles} />
          </Wrapper>
          <Ama />
        </>
      ) : (
        <Wrapper>
          <MobileHeader />
          <LoadingAnimation />
        </Wrapper>
      )}
    </GrayPage>
  );
};

ElectionWrapper.propTypes = {
  electionType: PropTypes.string,
  candidates: PropTypes.object,
  content: PropTypes.object,
};

export default ElectionWrapper;
