import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import Card from 'components/shared/Card';
import { H3, Body9, Body11 } from 'components/shared/typogrophy';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import noCandidateImage from 'components/shared/noCandidateImageUrl';
import { useWindowSize } from 'customHooks/useWindowSize';
import theme from 'theme';
import { partyResolver } from 'helpers/electionsHelper';
import SupportersProgressBar from './SupportersProgressBar';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Sider = styled.div`
  margin-top: 11px;
  flex-basis: calc(50% - 10px);

  &.right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

const Middler = styled.div`
  flex-basis: 2px;
  text-align: center;
  position: relative;

  & > div {
    color: ${({ theme }) => theme.colors.gray9};
  }
`;

const AvatarsWrapper = styled.div`
  margin-top: 12px;
  position: relative;
  height: 56px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 80px;
  }
`;

const AvatarAbsolute = styled.div`
  position: absolute;
  top: 0;
`;

const Name = styled(Body9)`
  margin-top: 12px;
  margin-bottom: 4px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.blue};

  &.gray {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const Role = styled(Body9)`
  opacity: 0.8;
`;

const Line = styled.div`
  width: 1px;
  border: solid 0.5px #cdcdcd;
  height: calc(100% - 30px);
  margin-top: 20px;
`;

const Vs = styled(Body11)`
  position: absolute;
  top: calc(50% - 15px);
  background-color: #fff;
  padding: 10px 0;
  width: 20px;
  left: -10px;
  text-align: center;
`;

const Red = styled.span`
  color: ${({ theme }) => theme.colors.red};
`;

const Green = styled.span`
  color: ${({ theme }) => theme.colors.green};
`;

const VsCard = ({ title, candidates = {}, suffixText = '' }) => {
  const { good, notGood, unknown } = candidates;
  const [width, height] = useWindowSize();
  const { topRank } = candidates;

  const votesNeeded = candidates.threshold;

  if (!good && !notGood && !unknown) {
    return (
      <Card>
        <CircularProgress />
      </Card>
    );
  }
  const cloneGood = [...good];

  if (cloneGood.length === 0) {
    cloneGood.push({
      id: 'noneyet',
      name: 'NONE YET',
      party: 'VC',
      image: 'http://assets.thegoodparty.org/gray-heart.png',
      isGood: true,
    });
  }

  if (
    notGood &&
    notGood.length === 0 &&
    unknown &&
    unknown.length === 0 &&
    cloneGood.length === 1 &&
    cloneGood[0].id === 'noneyet'
  ) {
    return <div />;
  }

  const avatarSpace = width > theme.breakpoints.mdPx ? 55 : 40;
  return (
    <Card>
      <H3>{title}</H3>
      <Row>
        <Sider>
          <Body9>
            <Green>POTENTIALLY GOOD</Green>
          </Body9>
          <AvatarsWrapper>
            {cloneGood.map((candidate, index) => (
              <React.Fragment key={`good-${candidate.id}`}>
                {index < 3 && (
                  <AvatarAbsolute
                    style={{
                      left: avatarSpace * index + 'px',
                      zIndex: 5 - index,
                    }}
                  >
                    <CandidateAvatar
                      size="responsive"
                      src={candidate.image}
                      name={candidate.name}
                      good
                    />
                  </AvatarAbsolute>
                )}
              </React.Fragment>
            ))}
          </AvatarsWrapper>
          {cloneGood.length > 1 && <Name>{cloneGood.length} CANDIDATES</Name>}
          {cloneGood.length === 1 && (
            <>
              <Name className={(cloneGood[0].id === 'noneyet' ? 'gray' : '')}>
                {cloneGood[0].name.toUpperCase()}
              </Name>
              <Role>
                {cloneGood[0].isIncumbent
                  ? 'INCUMBENT'
                  : partyResolver(cloneGood[0].party)}
              </Role>
            </>
          )}
        </Sider>
        <Middler>
          <Line />
          <Vs>VS</Vs>
        </Middler>
        <Sider className="right">
          <Body9>
            <Red>NOT GOOD ENOUGH</Red>
          </Body9>
          <AvatarsWrapper>
            {notGood.map((candidate, index) => (
              <React.Fragment key={`notGood-${candidate.id}`}>
                {index < 3 && (
                  <AvatarAbsolute
                    className={`avatar-${index}`}
                    style={{
                      right: avatarSpace * index + 'px',
                      zIndex: 5 - index,
                    }}
                  >
                    <CandidateAvatar
                      size="responsive"
                      src={candidate.image}
                      name={candidate.name}
                    />
                  </AvatarAbsolute>
                )}
              </React.Fragment>
            ))}
          </AvatarsWrapper>
          {notGood.length > 1 && <Name>{notGood.length} CANDIDATES</Name>}
          {notGood.length === 1 && (
            <>
              <Name>{notGood[0].name.toUpperCase()}</Name>
              <Role>
                {notGood[0].isIncumbent
                  ? 'INCUMBENT'
                  : partyResolver(notGood[0].party)}
              </Role>
            </>
          )}
        </Sider>
      </Row>
      <SupportersProgressBar
        peopleSoFar={topRank}
        votesNeeded={votesNeeded}
        userState={candidates.userState}
        suffixText={suffixText}
      />
    </Card>
  );
};

VsCard.propTypes = {
  title: PropTypes.string,
  candidates: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  showElectorsCount: PropTypes.bool,
  suffixText: PropTypes.string,
};

export default VsCard;
