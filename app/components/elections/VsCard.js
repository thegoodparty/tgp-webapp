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
import { numberFormatter } from '../../helpers/numberHelper';

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

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18px;
`;

const BarBg = styled.div`
  margin: 10px 0;
  width: 80%;
  position: relative;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.grayC};
  border-radius: 3px;
  overflow: hidden;
`;

const Bar = styled.div`
  position: absolute;
  height: 5px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.blue};
  left: 0;
  top: 0;
  width: 0;
  transition: width 0.5s;
`;

const BarBody11 = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const BarBody9 = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const VsCard = ({
  title,
  candidates = [],
  peopleSoFar = 530435,
  votesNeeded = 65853514,
}) => {
  const { good, notGood } = candidates;
  const [width, height] = useWindowSize();

  const progress = (peopleSoFar * 100) / votesNeeded;

  if (candidates.length === 0 || (!good && !notGood)) {
    return (
      <Card>
        <CircularProgress />
      </Card>
    );
  }

  if (candidates.good.length === 0) {
    good.push({
      id: 'whatever',
      name: 'NONE YET',
      party: 'VETTING CHALLENGERS',
      image: noCandidateImage,
      isGood: true,
    });
  }

  const avatarSpace = width > theme.breakpoints.mdPx ? 55 : 40;
  return (
    <Card>
      <H3>{title}</H3>
      <Row>
        <Sider>
          <Body9>NOT GOOD ENOUGH</Body9>
          <AvatarsWrapper>
            {notGood.map((candidate, index) => (
              <React.Fragment key={`notGood-${candidate.id}`}>
                {index < 3 && (
                  <AvatarAbsolute
                    className={`avatar-${index}`}
                    style={{
                      left: avatarSpace * index + 'px',
                      zIndex: 5 - index,
                    }}
                  >
                    <CandidateAvatar
                      size="responsive"
                      src={candidate.image || noCandidateImage}
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
        <Middler>
          <Line />
          <Vs>VS</Vs>
        </Middler>
        <Sider className="right">
          <Body9>GOOD ENOUGH</Body9>
          <AvatarsWrapper>
            {good.map((candidate, index) => (
              <React.Fragment key={`good-${candidate.id}`}>
                {index < 3 && (
                  <AvatarAbsolute
                    style={{
                      right: avatarSpace * index + 'px',
                      zIndex: 5 - index,
                    }}
                  >
                    <CandidateAvatar
                      size="responsive"
                      src={candidate.image || noCandidateImage}
                      good
                    />
                  </AvatarAbsolute>
                )}
              </React.Fragment>
            ))}
          </AvatarsWrapper>
          {good.length > 1 && <Name>{good.length} CANDIDATES</Name>}
          {good.length === 1 && (
            <>
              <Name>{good[0].name.toUpperCase()}</Name>
              <Role>
                {good[0].isIncumbent
                  ? 'INCUMBENT'
                  : partyResolver(good[0].party)}
              </Role>
            </>
          )}
        </Sider>
      </Row>
      <ProgressBarWrapper>
        <BarBody11>
          {numberFormatter(peopleSoFar)} Good Party People so far
        </BarBody11>
        <BarBg>
          <Bar style={{ width: `${progress}%` }} />
        </BarBg>
        <BarBody9>{numberFormatter(votesNeeded)} VOTES NEEDED TO WIN!</BarBody9>
      </ProgressBarWrapper>
    </Card>
  );
};

VsCard.propTypes = {
  title: PropTypes.string,
  candidates: PropTypes.array,
  peopleSoFar: PropTypes.number,
  votesNeeded: PropTypes.number,
};

export default VsCard;
