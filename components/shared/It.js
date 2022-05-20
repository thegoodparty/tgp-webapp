import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

const It = () => {
  return (
    <ScrollLink
      className="pointer"
      to="what-is-it"
      duration={350}
      smooth
      offset={-90}
    >
      <u>
        <i>It</i>
      </u>
    </ScrollLink>
  );
};

export default It;
