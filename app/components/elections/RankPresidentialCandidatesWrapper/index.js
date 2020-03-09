import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import Wrapper from 'components/shared/Wrapper';
import GreyWrapper from 'components/shared/GrayWrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/Nav';
import { Body, Body12, Body9, H1, H3 } from 'components/shared/typogrophy';
import Card from 'components/shared/Card';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import {
  partyResolver,
  rankText,
  presidentialCandidateRoute,
} from 'helpers/electionsHelper';
import BottomPopup from 'components/shared/BottomPopup';

const Reset = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
  text-align: right;
  margin-top: 16px;
  cursor: pointer;
  text-decoration: underline;
`;
const Submit = styled(Body12)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.blue};
  position: absolute;
  cursor: pointer;
  text-decoration: none;
  top: 20px;
  padding: 8px;
  right: 1rem;
  font-weight: 600;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0;
    position: static;
    text-align: right;
    margin-top: 16px;
    margin-left: 1rem;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RowBetween = styled(Row)`
  justify-content: space-between;
`;

const CardRight = styled.div`
  margin-left: 11px;
  flex-grow: 1;
`;

const StyledH3 = styled(H3)`
  font-weight: 400;
  margin-bottom: 4px;
`;

const ChoiceButton = styled(Body9)`
  border: solid 1px ${({ theme }) => theme.colors.blue};
  padding: 8px 6px;
  border-radius: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.blue};
  margin-top: 12px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.blue};
    color: #fff;
  }

  &.selected {
    background-color: ${({ theme }) => theme.colors.blue};
    color: #fff;
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 0;
  }
`;

const PopupButton = styled(Body12)`
  border: solid 2px ${({ theme }) => theme.colors.gray7};
  padding: 12px 16px;
  border-radius: 40px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray7};
  cursor: pointer;
  width: 48%;
  font-weight: 500;

  transition: background-color 0.3s, color 0.3s;

  &.blue {
    border: solid 2px ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.blue};

    &:hover {
      background-color: ${({ theme }) => theme.colors.blue};
      color: #fff;
    }
  }
`;

const RankPresidentialCandidatesWrapper = ({
  candidates = [],
  handleRankingCallback,
  saveRankingCallback,
  presidentialRank = [],
}) => {
  const [choices, setChoices] = useState({});
  const [choicesOrder, setChoicesOrder] = useState([]);
  const [showSubmit, setShowSubmit] = useState(false);
  const [skipPopup, setSkipPopup] = useState(false);
  const [skipGoodPopup, setSkipGoodPopup] = useState(false);
  const [submitWithoutGood, setSubmitWithoutGood] = useState(false);

  useEffect(() => {
    if (!skipGoodPopup && areAllGoodSelected()) {
      setShowSubmit(true);
    }
    setSkipGoodPopup(false);
  }, [choices]);

  useEffect(() => {
    const initialChoices = cookieOrderToChoicesHash();
    if (initialChoices !== {}) {
      setSkipGoodPopup(true);
    }
    setChoices(initialChoices);
    setChoicesOrder(presidentialRank || []);
  }, [candidates, presidentialRank]);

  const selectCandidate = async id => {
    if (
      choicesOrder.length <
      candidates.good.length + candidates.notGood.length
    ) {
      if (!choices[id]) {
        const newChoices = { ...choices };
        const newChoicesOrder = [...choicesOrder];
        newChoices[id] = choicesOrder.length + 1;
        console.log('newChoices', newChoices);
        await setChoices(newChoices);
        console.log('choices after', choices);
        newChoicesOrder.push(id);
        await setChoicesOrder(newChoicesOrder);
        saveRankingCallback(newChoicesOrder);
      } else {
        // deselect and remove all previous choices.
        let idPop;
        const newChoices = { ...choices };
        const newChoicesOrder = [...choicesOrder];
        while (newChoicesOrder.length > 0 && idPop !== id) {
          idPop = newChoicesOrder.pop();
          delete newChoices[idPop];
        }
        setChoices(newChoices);
        setChoicesOrder(newChoicesOrder);
      }
    }
  };

  const cookieOrderToChoicesHash = () => {
    if (!presidentialRank || presidentialRank.length === 0) {
      return {};
    } else {
      const newChoices = {};
      presidentialRank.map((order, i) => {
        newChoices[order] = i + 1;
      });
      return newChoices;
    }
  };

  const areAllGoodSelected = () => {
    if (!candidates.good) {
      return false;
    }
    for (let i = 0; i < candidates.good.length; i++) {
      const candidate = candidates.good[i];
      if (!choices[candidate.id]) {
        return false;
      }
    }
    return true;
  };

  const reset = () => {
    setChoices({});
    setChoicesOrder([]);
    saveRankingCallback([]);
  };

  const handleKeepRanking = () => {
    setShowSubmit(false);
    setSkipPopup(true);
    setSubmitWithoutGood(false);
  };

  const handleSubmit = e => {
    e.stopPropagation();
    if (!submitWithoutGood && !areAllGoodSelected()) {
      setSubmitWithoutGood(true);
    } else {
      saveRankingCallback(choicesOrder);
      handleRankingCallback(choicesOrder);
    }
  };

  const CandCard = (candidate, id) => {
    return (
      <Card style={{ cursor: 'default' }} key={id}>
        <Row>
          <Link to={presidentialCandidateRoute(candidate)}>
            <CandidateAvatar src={candidate.image} good={candidate.isGood} />
          </Link>
          <CardRight>
            <Grid container spacing={0} alignItems="center">
              <Grid item xs={12} md={6}>
                <Link to={presidentialCandidateRoute(candidate)}>
                  <StyledH3 className="pointer">{candidate.name}</StyledH3>
                  <Body9 className="pointer">
                    {partyResolver(candidate.party)}
                  </Body9>
                </Link>
              </Grid>
              <Grid item xs={12} md={6}>
                <ChoiceButton
                  className={choices[candidate.id] ? 'selected' : ''}
                  onClick={() => {
                    selectCandidate(candidate.id);
                  }}
                >
                  {choices[candidate.id] ? (
                    <>{rankText(choices[candidate.id])}</>
                  ) : (
                    <>{rankText(choicesOrder.length + 1)}</>
                  )}{' '}
                  CHOICE
                </ChoiceButton>
              </Grid>
            </Grid>
          </CardRight>
        </Row>
      </Card>
    );
  };

  return (
    <GreyWrapper>
      {candidates ? (
        <>
          <Nav />
          <Wrapper>
            <MobileHeader />
            <H1>Rank Choice of Presidential Candidates</H1>
            <Body style={{ marginTop: '8px' }}>
              Rank candidates you would be willing to do a{' '}
              <strong>write-in vote</strong> for if we could guarantee a win.
            </Body>
            <Reset onClick={reset}>
              RESET CHOICES <Submit onClick={handleSubmit}>DONE</Submit>
            </Reset>
            {candidates.good.map(candidate => (
              <React.Fragment key={candidate.id}>
                {candidate.isGood && CandCard(candidate, candidate.id)}
              </React.Fragment>
            ))}
            {candidates.notGood.map(candidate => (
              <React.Fragment key={candidate.id}>
                {!candidate.isGood && CandCard(candidate, candidate.id)}
              </React.Fragment>
            ))}
          </Wrapper>
          <BottomPopup
            open={showSubmit && !skipPopup}
            handleClose={() => {
              setShowSubmit(false);
            }}
          >
            <H3 className="text-center" style={{ marginBottom: '12px' }}>
              You Ranked all the Good Candidates. Submit Ranking?
            </H3>
            <RowBetween>
              <PopupButton onClick={handleKeepRanking}>
                RANK CHOICES
              </PopupButton>
              <PopupButton onClick={handleSubmit} className="blue">
                DONE
              </PopupButton>
            </RowBetween>
          </BottomPopup>

          <BottomPopup
            open={submitWithoutGood}
            handleClose={() => {
              setSubmitWithoutGood(false);
            }}
          >
            <H3 className="text-center" style={{ marginBottom: '12px' }}>
              You did not rank all Good candidates
            </H3>
            <RowBetween>
              <PopupButton onClick={handleKeepRanking} className="blue">
                RANK CHOICES
              </PopupButton>
              <PopupButton onClick={handleSubmit}>THAT'S OK</PopupButton>
            </RowBetween>
          </BottomPopup>
        </>
      ) : (
        <Wrapper>
          <MobileHeader />
          <LoadingAnimation />
        </Wrapper>
      )}
    </GreyWrapper>
  );
};

export default RankPresidentialCandidatesWrapper;
