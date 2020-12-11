/**
 *
 * ListProject
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SecondStep from './SecondStep';
import FirstStep from './FirstStep';

function ListProject({ open, handleClose }) {
  const [state, setState] = useState({
    title: null,
    summary: null,
    topics: [],
    video: null,
    images: null,
    links: [''],
    collaborator: false,
  });
  const [firstModal, toggleFirstModal] = useState(true);
  const [secondModal, toggleSecondModal] = useState(false);
  const updateProject = (value, key) => {
    setState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };
  const updateLink = (value, index) => {
    const { links } = state;
    links[index] = value;
    if (value === '' && links.length !== 1) {
      links.splice(index, 1);
    }
    setState(prevState => ({
      ...prevState,
      links,
    }));
  };
  const closeModal = () => {
    toggleFirstModal(false);
    toggleSecondModal(false);
    handleClose();
  };
  const addLink = value => {
    const { links } = state;
    if (links[links.length - 1] === '') {
      return;
    }
    links.push('');
    setState(prevState => ({
      ...prevState,
      links,
    }));
  };
  useEffect(() => {
    if (open) {
      toggleFirstModal(true);
      toggleSecondModal(false);
    }
  }, [open]);

  const toggleModal = () => {
    toggleFirstModal(!firstModal);
    toggleSecondModal(!secondModal);
  };

  const { title, summary, topics, video, images, links, collaborator } = state;
  return (
    <>
      {firstModal && (
        <FirstStep
          title={title}
          summary={summary}
          topics={topics}
          collaborator={collaborator}
          open={open}
          updateProject={updateProject}
          closeModal={closeModal}
          toggleModal={toggleModal}
        />
      )}
      {secondModal && (
        <SecondStep
          video={video}
          images={images}
          links={links}
          open={open}
          updateProject={updateProject}
          closeModal={closeModal}
          addLink={addLink}
          updateLink={updateLink}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
}

ListProject.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default ListProject;
