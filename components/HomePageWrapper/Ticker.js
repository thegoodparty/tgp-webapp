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

const randomNum = () => Math.random() * 5000 + 1500;
const cookieName = 'ticker';

let timeout1;
let timeout2;

const Ticker = () => {
  const [transition, setTransition] = useState(false);
  const [reduced, setReduced] = useState(10);
  const { totalFollowers } = useContext(HomePageContext);
  const [followers, setFollowers] = useState(totalFollowers - reduced);
  useEffect(() => {
    let cookieValue = getCookie(cookieName);

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
      setFollowers(totalFollowers - tickReduce - 1);
      setReduced(tickReduce - 1);
      setCookie(cookieName, tickReduce - 1, 0.24);
      clearTimeout(timeout2);
      timeout2 = setTimeout(() => {
        tick(tickReduce - 1);
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
