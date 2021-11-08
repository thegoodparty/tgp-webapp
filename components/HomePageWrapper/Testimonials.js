import React from 'react';
import styled from 'styled-components';
import { H2 } from '../shared/typogrophy';

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
  padding: 48px 0;
`;

const Padder = styled.div`
  padding: 40px 80px 140px;
  background-color: ${({ theme }) => theme.colors.grayF};
`;

const StyledH2 = styled(H2)`
  font-size: 42px;
  line-height: 58px;
  font-weight: 700;

  .large {
    margin-top: 40px;
    display: block;
    font-size: 80px;
    color: ${({ theme }) => theme.colors.purple};
  }
`;

const Heart = styled.img`
  width: 200px;
  height: auto;
  margin-top: 40px;
`;

const GrayBg = styled.div`
  position: relative;
  margin-top: -160px;
  background: url('https://assets.goodparty.org/homepage/testimonial-bg.svg')
    bottom center no-repeat;
  background-size: contain;

  .hidden {
    opacity: 0;
  }
`;

const GrayText = styled.div`
  position: absolute;
  top: 50%;
  color: #fff;
  left: 80px;
  font-size: 36px;
  font-weight: 700;
`;

const TestWrapper = styled.div`
  position: relative;
  margin-top: -100px;
  padding: 0 80px;
`;

const Test = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  img {
    width: 160px;
    border-radius: 50%;
    box-shadow: 0 0 12px 1px rgba(0, 0, 0, 0.15);
  }
`;

const TestContent = styled.div`
  margin-left: 36px;
  font-size: 26px;
  line-height: 32px;
`;

const Name = styled.div`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.orange};
  font-weight: 500;
  margin-top: 8px;
`;

const Position = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray7};
  font-weight: 500;
  letter-spacing: 1px;
`;

const testimonials = [
  {
    img: 'https://assets.goodparty.org/testimonials/jeff-ayeroff.jpg',
    text: 'Good Party is rock the vote on steroids!',
    name: 'Jeff Ayeroff',
    position: 'FOUNDER, ROCK THE VOTE',
  },
  {
    img: 'https://assets.goodparty.org/testimonials/naval-ravikant1.jpg',
    text:
      'Outside of Good Party hacks like crowd-voting, you’re never going to get an independent or 3rd party elected.',
    name: 'Naval Ravikant',
    position: 'FOUNDER & CHAIRMAN, ANGELLIST',
  },
];

const Testimonials = () => {
  return (
    <Wrapper>
      <Padder className="text-center">
        <StyledH2>
          Together we can change things for<span className="large">GOOD</span>
        </StyledH2>
        <Heart src="/images/heart.svg" alt="admin menu" />
      </Padder>
      <GrayBg>
        <img
          src="https://assets.goodparty.org/homepage/testimonial-bg.svg"
          className="full-image hidden"
        />
        <GrayText>Who’s Into it</GrayText>
      </GrayBg>
      <TestWrapper>
        {testimonials.map((test, index) => (
          <Test
            key={test.name}
            style={index === testimonials.length - 1 ? { marginBottom: 0 } : {}}
          >
            <img src={test.img} />
            <TestContent>
              &quot;{test.text}&quot;<Name>{test.name}</Name>
              <Position>{test.position}</Position>
            </TestContent>
          </Test>
        ))}
      </TestWrapper>
    </Wrapper>
  );
};

Testimonials.propTypes = {};

export default Testimonials;
