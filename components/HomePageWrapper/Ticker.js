import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { HomePageContext } from '/containers/HomePage';
import { numberFormatter } from '../../helpers/numberHelper';
import { getCookie, setCookie } from '../../helpers/cookieHelper';

const Num = styled.span``;

const Digit = styled.span`
  transition: opacity 0.1s ease-in;

  &.active {
    opacity: 1;
  }

  &.not-active {
    opacity: 0;
  }
`;

const randomNum = () => Math.random() * 15000 + 1500;
const randomIncrement = () => Math.floor(Math.random() * 3 + 1);

let timeout1;
let timeout2;

const REDUCED_COUNT = 100;
const COOKIE_NAME = 'ticker';

const Ticker = () => {
  const [transition, setTransition] = useState(false);
  const [reduced, setReduced] = useState(REDUCED_COUNT);
  const { totalFollowers } = useContext(HomePageContext);
  const [followers, setFollowers] = useState(totalFollowers - reduced);
  const [prevFollowers, setPrevFollowers] = useState(totalFollowers - reduced);
  useEffect(() => {
    let cookieValue = getCookie(COOKIE_NAME);

    if (cookieValue) {
      cookieValue = parseInt(cookieValue, 10);
      setReduced(cookieValue);
      tick(cookieValue);
    } else {
      tick(reduced);
    }
  }, []);

  const tick = (tickReduce) => {
    if (tickReduce <= 0) {
      setFollowers(totalFollowers);
      return;
    }
    setTransition(true);
    clearTimeout(timeout1);
    timeout1 = setTimeout(() => {
      const rnd = randomNum();
      const increment = randomIncrement();
      setPrevFollowers(totalFollowers - tickReduce);
      setFollowers(totalFollowers - tickReduce - increment);
      setReduced(tickReduce - increment);
      setCookie(COOKIE_NAME, tickReduce - increment, 0.03);
      clearTimeout(timeout2);
      timeout2 = setTimeout(() => {
        tick(tickReduce - increment);
      }, rnd);
      setTransition(false);
    }, 250);
  };
  const num = numberFormatter(followers);
  const digits = num.split('');

  const prev = numberFormatter(prevFollowers);
  const prevDigits = prev.split('');
  return (
    <Num>
      {digits.map((digit, index) => (
        <Digit
          key={index}
          className={
            transition && digit !== prevDigits[index] ? 'not-active' : 'active'
          }
        >
          {digit}
        </Digit>
      ))}
    </Num>
  );
};

export default Ticker;
