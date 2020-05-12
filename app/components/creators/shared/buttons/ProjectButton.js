import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    Button
} from "@material-ui/core"

const ProjectButton = styled(Button)`

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

export default ProjectButton;