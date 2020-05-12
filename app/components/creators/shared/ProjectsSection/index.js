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

import { ProjectButton } from '../buttons';
import Project from '../Project';
const SectionWrapper = styled.div`
  padding: 6rem 8rem;
  background-color: ${({ theme }) => theme.colors.blue};
`;
const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;
const Title = styled.h2`
  font: normal 800 4.5rem ${({ theme }) => theme.typography.fontFamily};
  color: #fff;
  text-transform: uppercase;
  margin: 0;
`;

const TitleButtonIcon = styled.img`
  margin-right: 0.5rem;
`;
const SectionHeaderActions = styled.div`
  display: flex;
  align-items: center;
`;
function ProjectsSection() {
  const projects= [
    {
      "title": "Illustrations for the native iOS and Android app",
      "summary": "We are creating a set of illustrations for the on-boarding flow of the mobile app. We are still seeking designers and copy editors. All levels welcome! Fork the Figma file to learn how you can contribute. 🙏",
      "topics": [
        "Design",
        "Mobile"
        ],
      "links": [
        "https://www.figma.com/file/7NuJwqxamDxrvEMi3ci9eu/Creators…",
        "https://www.notion.so/thegoodparty/16d9a13ad3124632a1f9023…"
      ],
      "video": "https://www.youtube.com/watch?v=f5xLNypFrV4",
      "images": [
         "//images.ctfassets.net/g08ybc4r0f4b/3Uxio1F0Asvi0zJA8zSiln/bd34e45f98428ab1d4b3499827d53ddf/illustration.png"
      ],
      "id": "4VRegxhtEzoPg7z14QLpi7"
    },
    {
      "title": "Illustrations for the native iOS and Android app",
      "summary": "We are creating a set of illustrations for the on-boarding flow of the mobile app. We are still seeking designers and copy editors. All levels welcome! Fork the Figma file to learn how you can contribute. 🙏",
      "topics": [
        "Design",
        "Mobile"
        ],
      "links": [
        "https://www.figma.com/file/7NuJwqxamDxrvEMi3ci9eu/Creators…",
        "https://www.notion.so/thegoodparty/16d9a13ad3124632a1f9023…"
      ],
      "video": "https://www.youtube.com/watch?v=f5xLNypFrV4",
      "images": [
         "//images.ctfassets.net/g08ybc4r0f4b/3Uxio1F0Asvi0zJA8zSiln/bd34e45f98428ab1d4b3499827d53ddf/illustration.png"
      ],
      "id": "4VRegxhtEzoPg7z14QLpi7"
    }
  ];
  return (
  <SectionWrapper>
    <SectionHeader>
      <Title>Projects</Title>
      <SectionHeaderActions>
        <ProjectButton><TitleButtonIcon src={SearchList} /> Search</ProjectButton>
        <ProjectButton><TitleButtonIcon src={ExpandList} /> List your project</ProjectButton>
      </SectionHeaderActions>
    </SectionHeader>
    {projects.map(project => {
      return (<Project project={project} />);
    })}
    <Project showMore></Project>
  </SectionWrapper>
  );
}

ProjectsSection.propTypes = {};

export default ProjectsSection;
