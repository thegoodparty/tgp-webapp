/**
 *
 * ProjectsSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button } from '@material-ui/core';
import SearchList from 'images/icons/search.svg';
import ExpandList from 'images/icons/expand.svg';

const SectionWrapper = styled.div`
  padding: 6rem 8rem;
  background-color: ${({ theme }) => theme.colors.blue};
  margin-bottom: 3rem;
`;
const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.h2`
  font: normal 800 4.5rem ${({ theme }) => theme.typography.fontFamily};
  color: #fff;
  text-transform: uppercase;
  margin: 0;
`;

const TitleButton = styled(Button)`
&& {
  padding: 1rem 2rem;
  font: normal bold 1rem ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) => theme.colors.blue};
  text-transform: uppercase;
  background-color: #fff;
  line-height: 100%;
  border-radius: 2rem;
  margin-left: 1.2rem;
}
`;
const TitleButtonIcon = styled.img`
  margin-right: 0.5rem;
`;
const SectionHeaderActions = styled.div`
  display: flex;
  align-items: center;
`;
function ProjectsSection() {
  return (
  <SectionWrapper>
    <SectionHeader>
      <Title>Projects</Title>
      <SectionHeaderActions>
        <TitleButton><TitleButtonIcon src={SearchList} /> Search</TitleButton>
        <TitleButton><TitleButtonIcon src={ExpandList} /> List your project</TitleButton>
      </SectionHeaderActions>
    </SectionHeader>
  </SectionWrapper>
  );
}

ProjectsSection.propTypes = {};

export default ProjectsSection;
