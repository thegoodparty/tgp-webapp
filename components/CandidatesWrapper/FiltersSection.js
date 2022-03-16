/**
 *
 * FiltersSection
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsFilter } from 'react-icons/bs';
import Sticky from 'react-sticky-el';
import CloseIcon from '@material-ui/icons/HighlightOff';

import { CandidatesContext } from '/containers/CandidatesPage';
import IssuePositionsPickerContainer from '/containers/shared/IssuePositionsPickerContainer';

import { FontH3 } from '../shared/typogrophy';
import BlackButton from '../shared/buttons/BlackButton';
import Modal from '../shared/Modal';

const Section = styled.section`
  padding: 16px 28px;
  background-color: #fafafa;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const ShareWrapper = styled.div`
  text-align: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    text-align: right;
  }
`;

const InnerButton = styled.div`
  padding: 0 24px;
  font-size: 12px;
`;

const FilterBy = styled.div`
  padding: 16px 28px;
  border-top: solid 1px #e6e6e6;
  background-color: #fafafa;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

const StickyWrapper = styled.div`
  .sticky {
    z-index: 10;
  }
  .sticky .sticky-el {
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
  }
`;

const FilterBtn = styled.div`
  display: inline-block;
  padding: 8px;
  border: solid 1px #000;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  transition: background-color 0.5s, color 0.5s;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const ModalInner = styled.div`
  background-color: #fff;
  padding: 24px;
  border-radius: 6px;
  min-width: 50vw;
  max-width: 80vw;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 12px;
  cursor: pointer;
`

function FiltersSection() {
  const { candidates } = useContext(CandidatesContext);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIssueSelected = (selected) => {
    console.log('topic', selected);
  };
  return (
    <>
      <Section>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={9}>
            <FontH3 style={{ margin: 0 }}>
              {candidates.length} Good Certified Candidates who people should
              know about
            </FontH3>
          </Grid>
          <Grid item xs={12} lg={3}>
            <ShareWrapper>
              Spread the word! &nbsp;{' '}
              <Link href={`${router.asPath}?share=true`} passHref>
                <a>
                  <BlackButton style={{ marginLeft: '24px' }}>
                    <InnerButton>Share</InnerButton>
                  </BlackButton>
                </a>
              </Link>
            </ShareWrapper>
          </Grid>
        </Grid>
      </Section>
      <StickyWrapper>
        <Sticky>
          <FilterBy className="sticky-el">
            <FilterBtn onClick={() => setIsModalOpen(true)}>
              <BsFilter />
              &nbsp; FILTER BY...
            </FilterBtn>
          </FilterBy>
        </Sticky>
      </StickyWrapper>
      <Modal
        open={isModalOpen}
        closeModalCallback={() => {
          setIsModalOpen(false);
        }}
        showCloseButton={false}
      >
        <ModalInner>
          <Close onClick={() => setIsModalOpen(false)}>
            <CloseIcon />
          </Close>
          <IssuePositionsPickerContainer onChange={handleIssueSelected} />
        </ModalInner>
      </Modal>
    </>
  );
}

export default FiltersSection;
