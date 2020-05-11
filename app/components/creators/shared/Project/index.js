/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SampleImage from 'images/illustration.png'
import {
  Grid
} from '@material-ui/core';
const ProjectWrapper = styled.div`
  border-radius: 16px;
  padding: 2rem;
  background-color: #fff;
  
`;
const ProjectBodyWrapper = styled(Grid)`

`;
const Title = styled.h3`
  font: normal bold 2rem/130% ${({ theme }) => theme.typography.fontFamily};
  color: #000;
`;
function Project(project) {

  return (
  <ProjectWrapper>
    <ProjectBodyWrapper container>
      <Grid item xs={7}>
        <Title>{project.title}</Title>
        <Topics>
          {project.topics.map(topic => {
            return (<Topic>{topic}</Topic>)
          })}
        </Topics>
        <Summary>{project.summary}</Summary>
      </Grid>
      <Grid item xs={5}>
        <img src={SampleImage} />
      </Grid>

    </ProjectBodyWrapper>
  </ProjectWrapper>
  );
}

Project.propTypes = {};

export default Project;
