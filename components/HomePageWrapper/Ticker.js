import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { HomePageContext } from '/containers/HomePage';
import { numberFormatter } from '../../helpers/numberHelper';
import { getCookie, setCookie } from '../../helpers/cookieHelper';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  height: 50px;
`;

const Num = styled.span`
  position: absolute;
  top: 0;
  left: 0;
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

  return (
    <Wrapper>
      <Num className={transition ? 'not-active' : 'active'}>
        {numberFormatter(followers)}
      </Num>
    </Wrapper>
  );
};

export default Ticker;
