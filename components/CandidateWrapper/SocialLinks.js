/**
 *
 * SocialLinks
 *
 */

import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { CandidateContext } from '/containers/CandidatePage';
import { candidateHash } from '/helpers/candidatesHelper';
import { IoMdShareAlt } from 'react-icons/io';

import styles from './SocialLinks.module.scss';
import { InnerButton } from '../shared/buttons/BlackButton';
import PinkButton from '../shared/buttons/PinkButton';
import Row from '../shared/Row';
import { CandidateWrapperContext } from './index';

function SocialLinks() {
  const { candidate } = useContext(CandidateContext);
  const { showShareModalCallback } = useContext(CandidateWrapperContext);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.h3}>Get ‘em trending, tag posts with</h3>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <div className={styles.hash}>#{candidateHash(candidate)}</div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.row}>
            <PinkButton onClick={showShareModalCallback}>
              <InnerButton>
                <Row>
                  <div style={{ marginRight: '24px' }}>Post</div>{' '}
                  <IoMdShareAlt size={24} />
                </Row>
              </InnerButton>
            </PinkButton>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SocialLinks;
