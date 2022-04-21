/**
 *
 * HowWorksSection
 *
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Element } from 'react-scroll';

import { Font16, Font18, FontH2 } from '../shared/typogrophy';
import { HOW_WORKS_SECTIONS } from '../../utils/constants';

const Section = styled.section`
  margin-top: 90px;
`;
const Line = styled.div`
  border-bottom: 1px solid #b6b6b6;
  width: 120px;
  margin: 12px auto 42px;
`;

const Box = styled.div`
  padding: 40px 20px 20px;
  border: 1px solid #e0dcdc;
  border-radius: 5px;
  text-align: left;
  position: relative;
  max-width: 640px;
  margin: 0 auto;
  cursor: pointer;
  &.expanded {
    cursor: initial;
    .content {
      display: block;
    }
  }

  .content {
    display: none;
  }
`;

const Icon = styled.div`
  position: absolute;
  font-size: 45px;
  width: 100%;
  left: 0;
  text-align: center;
  top: -30px;
`;

const Title = styled(Font18)`
  font-weight: 900;
  margin-bottom: 24px;
  text-align: center;
`;

const Point = styled(Font16)`
  margin-bottom: 16px;
`;

const PointTitle = styled.div`
  margin: 16px 0;

  &.expanded {
    margin: 36px 0 16px;
    font-weight: 900;
  }
`;


function HowWorksSection() {
  const [expanded, setExpanded] = useState([false, false, false]);
  const expand = (index) => {
    const updated = [...expanded];
    updated[index] = true;
    setExpanded(updated);
  };
  return (
    <Section>
      <Element name="questions">
        <FontH2 id="how" data-cy="howworks-title">
          How it works
          <Line />
        </FontH2>
      </Element>
      <Grid container spacing={6}>
        {HOW_WORKS_SECTIONS.map((box, index) => (
          <Grid item xs={12} key={box.title} data-cy="howworks-box">
            <Box
              onClick={() => {
                expand(index);
              }}
              className={expanded[index] && 'expanded'}
            >
              <Icon>{box.icon}</Icon>
              <Title data-cy="howworks-box-title">{box.title}</Title>

              {box.points.map((point) => (
                <Point key={point.title} data-cy="howworks-box-point">
                  <PointTitle className={expanded[index] && 'expanded'} data-cy="howworks-box-point-title">
                    {point.title}
                  </PointTitle>
                  <div className="content" data-cy="howworks-box-point-content">{point.content}</div>
                </Point>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}

HowWorksSection.propTypes = {};

export default HowWorksSection;
