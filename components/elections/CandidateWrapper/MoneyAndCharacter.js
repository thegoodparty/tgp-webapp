import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import { Body13, Body } from 'components/shared/typogrophy';

import { percHelper } from 'helpers/numberHelper';
import { getComparedIncumbent } from 'helpers/candidatesHelper';
import GrayCheckbox from 'public/images/icons/checkbox-gray.svg';
import RedCheckbox from 'public/images/icons/checkbox-red.svg';
import GreenCheckbox from 'public/images/icons/checkbox-green.svg';
import QuestionMarkGray from 'public/images/icons/question-mark.svg';

const CheckboxRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 16px;
`;

const CheckboxImg = styled.img`
  margin-right: 12px;
  margin-top: 5px;
`;

const ColoredText = styled.span`
  color: ${({ theme }) => theme.colors.red};
  &.green {
    color: ${({ theme }) => theme.colors.green};
  }
  &.gray {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const MoneyAndCharacter = ({ candidate, incumbent }) => {
  const [comparedIncumbent, setComparedIncumbent] = useState({});
  let isGood;
  if (candidate) {
    ({ isGood } = candidate);
  }

  useEffect(() => {
    if (incumbent) {
      setComparedIncumbent(getComparedIncumbent(totalRaised, incumbent));
    } else {
      setComparedIncumbent({});
    }
  }, [incumbent]);

  const {
    name,
    totalRaised,
    smallDonorPerc,
    largeDonorPerc,
    isIncumbent,
    isAligned,
    isBigMoney,
  } = candidate;

  const isUnkown = isGood === null;
  const isGoodOrUnkwown = isGood || isUnkown;

  const perc = isGoodOrUnkwown
    ? percHelper(smallDonorPerc, true)
    : percHelper(largeDonorPerc, true);

  const nameArr = name ? name.split(' ') : [];
  let lastName = name ? nameArr[nameArr.length - 1] : '';
  if ((lastName === 'Jr.' || lastName === 'Sr.') && nameArr.length > 2) {
    lastName = nameArr[nameArr.length - 2];
  }

  const coloredGood = () => {
    if (isGood) {
      return (
        <ColoredText className="green" data-cy="colored-good">
          <strong>Potentially Good</strong>
        </ColoredText>
      );
    }
    if (isUnkown) {
      return (
        <ColoredText className="gray" data-cy="colored-good">
          <strong>Not Yet Rated</strong>
        </ColoredText>
      );
    }
    return (
      <ColoredText className="red" data-cy="colored-good">
        <strong>Not Good Enough</strong>
      </ColoredText>
    );
  };

  const followTheMoney = () => {
    if (!isGoodOrUnkwown) {
      // NOT GOOD ENOUGH
      if (isBigMoney) {
        return (
          <CheckboxRow>
            <CheckboxImg src={RedCheckbox} />
            <Body13 data-cy="is-big-money">
              <strong>
                <ColoredText>Follow the Money:</ColoredText>{' '}
              </strong>
              Candidate has raised most of funding (&gt;50%) from Big Money
              sources.
            </Body13>
          </CheckboxRow>
        );
      } else {
        // NOT ALIGNED SMALL MONEY.
        return (
          <CheckboxRow>
            <CheckboxImg src={GrayCheckbox} />
            <Body13 data-cy="is-big-money">
              <strong>Follow the Money:</strong> Candidate has raised most of
              funding (>50%) from Small Indiv. Donors (&lt;$200). This is good,
              but not enough because of failing the character check.
            </Body13>
          </CheckboxRow>
        );
      }
    } else if (isGood) {
      // GOOD ENOUGH
      let goodText;
      if (isBigMoney || isIncumbent || perc > 50) {
        // GOOD ENOUGH SMALL MONEY
        goodText =
          'Candidate has raised most of funding (>50%) from Small Indiv. Donors (<$200)';
      } else {
        // GOOD ENOUGH BIG MONEY
        goodText =
          'Candidate has raised less than 50% of the total funding of the incumbent in this race.';
      }
      return (
        <CheckboxRow>
          <CheckboxImg src={GreenCheckbox} />
          <Body13 data-cy="is-big-money">
            <strong>
              <ColoredText className="green">Follow the Money:</ColoredText>
            </strong>{' '}
            {goodText}
          </Body13>
        </CheckboxRow>
      );
    } else {
      // GOODNESS UNKNOWN
      return (
        <CheckboxRow>
          <CheckboxImg src={GreenCheckbox} />
          <Body13 data-cy="is-big-money">
            <strong>
              <ColoredText className="green">Follow the Money:</ColoredText>
            </strong>{' '}
            {comparedIncumbent.relativePerc < 50 ? (
              'Candidate has raised less than 50% of the total funding of the incumbent in this race.'
            ) : (
              <>
                Candidate has raised most of funding (&gt;50%) from Small Indiv.
                Donors (&lt;$200).
              </>
            )}
          </Body13>
        </CheckboxRow>
      );
    }
  };

  const characterCheck = () => {
    if (!isGoodOrUnkwown) {
      // ALIGNED BUT NOT GOOD ENOUGH
      if (isAligned === 'yes') {
        return (
          <CheckboxRow>
            <CheckboxImg src={GrayCheckbox} />
            <Body13 data-cy="character-check">
              <strong>Character Check:</strong> Candidate passes{' '}
              <Link href="?article=66i4vRRLkX1yf8MnCQvYSb" data-cy="link">
                our minimum standard of civility
              </Link>
              .
            </Body13>
          </CheckboxRow>
        );
      } else {
        if (isAligned === 'no') {
          // NOT ALIGNED AND NOT GOOD ENOUGH
          return (
            <CheckboxRow>
              <CheckboxImg src={RedCheckbox} />
              <Body13 data-cy="character-check">
                <strong>
                  <ColoredText>Character Check:</ColoredText>{' '}
                </strong>
                Candidate fails to meet{' '}
                <Link href="?article=66i4vRRLkX1yf8MnCQvYSb" data-cy="link1">
                  our minimum standard of civility
                </Link>
                . Candidate has engaged in a pattern of activities or{' '}
                <Link href="?article=5bwvf0PwsbpFEe8IJ9sHhX" data-cy="link2">
                  hate-speech
                </Link>{' '}
                encouraging intolerance, discrimination or hostility towards a
                constitutionally or state-protected group or class.
              </Body13>
            </CheckboxRow>
          );
        } else {
          // UNKNOWN AND NOT GOOD ENOUGH
          return (
            <CheckboxRow>
              <CheckboxImg src={QuestionMarkGray} />
              <Body13 data-cy="character-check">
                <strong>
                  <ColoredText className="gray">Character Check:</ColoredText>{' '}
                </strong>
                Candidate has not yet been vetted. Do you have factual info
                about this candidate we should consider?{' '}
                <a
                  href={`mailto:info@thegoodparty.org?subject=Character%20Check:%20Candidate%20Page&body=${
                    window.location.href
                  }`}
                  data-cy="link"
                >
                  Please let us know
                </a>
              </Body13>
            </CheckboxRow>
          );
        }
      }
    }

    if (isGood) {
      if (isAligned === 'yes') {
        // GOOD AND ALIGNED
        return (
          <CheckboxRow>
            <CheckboxImg src={GreenCheckbox} />
            <Body13 data-cy="character-check">
              <strong>
                <ColoredText className="green">Character Check:</ColoredText>
              </strong>{' '}
              Candidate passes{' '}
              <Link href="?article=66i4vRRLkX1yf8MnCQvYSb" data-cy="link">
                minimum standard of civility
              </Link>
              .
            </Body13>
          </CheckboxRow>
        );
      } else {
        // GOOD AND NOT ALIGNED
        return (
          <CheckboxRow>
            <CheckboxImg src={RedCheckbox} />
            <Body13 data-cy="character-check">
              <strong>
                <ColoredText>Candidate Policy Positions:</ColoredText>{' '}
              </strong>
              Candidate positions are not aligned with{' '}
              <Link href="?article=2Pv9KNb6rng0sMfqwu1xKm" data-cy="link">
                The Good Party Platform.
              </Link>
            </Body13>
          </CheckboxRow>
        );
      }
    }

    if (isUnkown) {
      return (
        <CheckboxRow>
          <CheckboxImg src={QuestionMarkGray} />
          <Body13 data-cy="character-check">
            <strong>Character Check: </strong>
            Candidate has not yet been vetted. Do you have factual info about
            this candidate we should consider?{' '}
            <a
              href={`mailto:info@thegoodparty.org?subject=Character%20Check:%20Candidate%20Page&body=${
                window.location.href
              }`}
              data-cy="link"
            >
              Please let us know
            </a>
          </Body13>
        </CheckboxRow>
      );
    }
  };

  return (
    <>
      <Body style={{ margin: '32px 0' }} data-cy="why">
        Why {lastName} is {coloredGood()}
      </Body>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {followTheMoney()}
        </Grid>
        <Grid item xs={12} md={6}>
          {characterCheck()}
        </Grid>
      </Grid>
    </>
  );
};

MoneyAndCharacter.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  incumbent: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default MoneyAndCharacter;
