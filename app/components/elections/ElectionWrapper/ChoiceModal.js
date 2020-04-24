import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Cancel';

import heartImg from 'images/heart.svg';
import { Body, H1, Body11, Body9 } from 'components/shared/typogrophy';
import { OutlinedButton } from 'components/shared/buttons';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import { partyResolver } from 'helpers/electionsHelper';
import { numberFormatter } from 'helpers/numberHelper';
import SupportersProgressBar from '../SupportersProgressBar';
import ShareButton from '../../shared/ShareButton';
import { uuidUrl } from '../../../helpers/userHelper';
import { setCookie } from '../../../helpers/cookieHelper';

const Wrapper = styled.div`
  background-color: #fff;
  padding: 48px 18px 32px;
  border-radius: 8px;
  position: relative;
  width: 85vw;
  margin: 0 auto;
  max-width: 500px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 48px 24px 32px;
  }
`;

const Close = styled.div`
  position: absolute;
  padding: 16px;
  top: 0;
  right: 0;
  color: ${({ theme }) => theme.colors.gray4};
  cursor: pointer;
`;

const BodyText = styled(Body)`
  margin: 16px 0;
  letter-spacing: 0.2px;
`;

const Row = styled(Body)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  padding: 0 10px;
  width: 100%;
`;

const AvatarWrapper = styled(Body)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const SupportersWrapper = styled.div`
  flex: 6;
`;

const SupportersRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  position: relative;
`;

const SupportersCount = styled(H1)`
  color: ${({ theme }) => theme.colors.gray7};
  position: absolute;
  left: 45px;
  top: -5px;
  animation-fill-mode: forwards;

  @keyframes animate-in {
    0% {
      opacity: 0;
      top: -25px;
    }
    100% {
      opacity: 1;
      top: -5px;
    }
  }

  @keyframes animate-out {
    0% {
      opacity: 1;
      top: -5px;
    }
    100% {
      opacity: 0;
      top: 15px;
    }
  }
`;

const HeartImg = styled.img`
  height: auto;
  width: 36px;
  margin-right: 8px;
`;

const SuppoetersBody = styled(Body)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const ShareWrapper = styled.div``;

const ChoiceModal = ({
  candidate,
  open,
  votesNeeded,
  user,
  chamberCount,
  animateCount,
  closeCallback,
  cancelCallback,
}) => {
  if (!candidate) {
    return <> </>;
  }
  const notGood = candidate.isGood === false;

  let { isGood } = candidate;
  if (candidate.unknown) {
    isGood = null;
  }

  const url = uuidUrl(user);

  const cancelChoice = () => {
    cancelCallback(candidate.id);
    closeCallback();
  };

  const saveShare = () => {
    setCookie('isSharedModal', true);
  };

  const countWithUser = user ? chamberCount : chamberCount - 1;

  return (
    <Dialog
      onClose={closeCallback}
      aria-labelledby="Ranking not Allowed"
      open={open}
    >
      <Wrapper>
        <Close onClick={closeCallback}>
          <CloseIcon />
        </Close>
        {notGood ? (
          <>
            <H1>
              Umm, Really?{' '}
              <span role="img" aria-label="oh really">
                🤔
              </span>
            </H1>
            <BodyText>
              We respect your freedom to choose who you like. However, The Good
              Party has <strong>not</strong> been set up to help Big Money
              candidates who who have raised a majority (&gt;50%) of their
              funding from Corporate Lobbyists, Political Action Committees
              (PACs), and other Big Money Donors.
              <br />
              <br />
              To see more details please visit this candidate’s profile page.
            </BodyText>
            <ButtonRow>
              <ButtonWrapper>
                <OutlinedButton fullWidth onClick={cancelChoice} active>
                  <span className="bold500">CANCEL</span>
                </OutlinedButton>
              </ButtonWrapper>
              <ButtonWrapper>
                <OutlinedButton fullWidth onClick={closeCallback} active>
                  <span className="bold500">OK</span>
                </OutlinedButton>
              </ButtonWrapper>
            </ButtonRow>
          </>
        ) : (
          <>
            <H1>Good Choice!</H1>
            <BodyText>
              Now tell some friends! Let&apos;s see if we can grow this voting
              bloc enough to win!
            </BodyText>
            <Row>
              <SupportersWrapper>
                <SupportersRow>
                  <HeartImg src={heartImg} alt="tgp" />
                  {animateCount ? (
                    <>
                      <SupportersCount
                        style={{
                          animation: `animate-out 1s ease-in-out forwards`,
                        }}
                      >
                        {numberFormatter(countWithUser)}
                      </SupportersCount>
                      <SupportersCount
                        style={{
                          animation: `animate-in 1s ease-in-out forwards`,
                        }}
                      >
                        {numberFormatter(countWithUser + 1)}
                      </SupportersCount>
                    </>
                  ) : (
                    <SupportersCount>
                      {numberFormatter(chamberCount)}
                    </SupportersCount>
                  )}
                </SupportersRow>
                <SuppoetersBody>Good Party Supporters so far</SuppoetersBody>
                <SupportersProgressBar
                  votesNeeded={votesNeeded}
                  peopleSoFar={chamberCount}
                  showSupporters={false}
                  alignLeft
                />
              </SupportersWrapper>
              <div>
                <AvatarWrapper>
                  <CandidateAvatar
                    good={isGood}
                    size="responsive"
                    src={candidate.image}
                    name={candidate.name}
                  />
                  <Body11 style={{ margin: '8px 0 4px' }}>
                    {candidate.name}
                  </Body11>
                  <Body9>{partyResolver(candidate.party)}</Body9>
                </AvatarWrapper>
              </div>
            </Row>
            <ShareWrapper onClick={saveShare}>
              <ShareButton url={url} />
            </ShareWrapper>
          </>
        )}
      </Wrapper>
    </Dialog>
  );
};

ChoiceModal.propTypes = {
  open: PropTypes.bool,
  closeCallback: PropTypes.func,
  cancelCallback: PropTypes.func,
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  votesNeeded: PropTypes.number,
  chamberCount: PropTypes.number,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  animateCount: PropTypes.bool,
};

export default ChoiceModal;
