/**
 *
 * ApplicationStep7
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { FiMinusCircle } from 'react-icons/fi';
import Link from 'next/link';

import ApplicationWrapper from './ApplicationWrapper';
import { Body14 } from '../../shared/typogrophy';
import { step2fields, step2Socials, step3Fields, step3Socials } from './fields';
import { Title } from './ApplicationStep1';

const SectionWrapper = styled.div`
  margin-bottom: 28px;
`;

const Title14 = styled(Body14)`
  color: #1a1a1a;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const Field = styled(Body14)`
  font-weight: 500;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  color: #808080;

  &.completed {
  color: #7DB212;
`;

const IconWrapper = styled.div`
  margin-right: 8px;
`;

const Req = styled.div`
  margin-left: 8px;
  color: #cc3366;
`;

// const requiredKeys = [];
// step2fields.forEach(field => {
//   if (field.required) {
//     requiredKeys.push(field);
//   }
// });

const allFields = [
  [{ stepKey: 'candidate' }, ...step2fields],
  [{ stepKey: 'campaign' }, ...step3Fields],
  [{ stepKey: 'socialMedia' }, ...step2Socials, ...step3Socials],
];

function ApplicationStep7({
  step,
  application,
  submitApplicationCallback,
  reviewMode,
}) {
  const [state, setState] = useState([]);
  const [canSubmit, setCanSubmit] = useState(false);


  useEffect(() => {
    let requiredFilled = true;
    if (application) {
      const sections = [
        {
          title: '1. Good Party Pledge',
          fields: [
            {
              label: 'Pledged',
              required: true,
              completed: application.pledge?.isCompleted,
            },
          ],
        },
        {
          title: '2. Candidate Details',
          fields: [],
        },
        {
          title: '3. Campaign Details',
          fields: [],
        },
        {
          title: '4. Social Media',
          fields: [],
        },
        {
          title: '5. Top Issues',
          fields: [],
        },
        {
          title: '6. Key Endorsements',
          fields: [],
        },
      ];
      requiredFilled = application.pledge?.isCompleted;

      allFields.forEach((stepFields, index) => {
        const { stepKey } = stepFields[0];
        stepFields.forEach((field) => {
          if (field.label) {
            const completed =
              application[stepKey] &&
              application[stepKey][field.key] !== field.defaultValue;
            sections[index + 1].fields.push({
              label: field.shortLabel || field.label,
              required: field.required,
              completed,
            });
            if (field.required && !completed) {
              requiredFilled = false;
            }
          }
        });
      });
      // issues
      const issuesCount = application.issues?.positions?.length || 0;
      sections[4].fields.push({
        label:
          issuesCount === 0
            ? 'No issues selected'
            : `${issuesCount} issue${issuesCount > 1 ? 's' : ''} completed`,
        completed: issuesCount > 0,
        required: true,
      });
      if (issuesCount === 0) {
        requiredFilled = false;
      }
      // endorsements
      const endorsementsCount = application.endorsements?.length || 0;
      sections[5].fields.push({
        label:
          endorsementsCount === 0
            ? 'No endorsements provided'
            : `${endorsementsCount} endorsements${
                endorsementsCount > 1 ? 's' : ''
              } provided`,
        completed: endorsementsCount > 0,
      });

      setState(sections);
      setCanSubmit(requiredFilled);
    }
  }, [application]);
  return (
    <ApplicationWrapper
      step={step}
      canContinue={canSubmit}
      id={application.id}
      submitApplicationCallback={submitApplicationCallback}
      reviewMode={reviewMode}
    >
      <Title>Step 7: Review Application Checklist</Title>
      {state.map((section, index) => (
        <SectionWrapper key={index}>
          <Link
            href={`/campaign-application/${application.id}/${index + 1}`}
            passHref
          >
            <a>
              <Title14>{section.title}</Title14>
            </a>
          </Link>
          {section.fields.map((field, index) => (
            <Field className={field.completed && 'completed'} key={index}>
              <IconWrapper>
                {field.completed ? <FaCheck /> : <FiMinusCircle />}
              </IconWrapper>{' '}
              <div>{field.label}</div>
              {!field.completed && field.required && <Req>Required</Req>}
            </Field>
          ))}
        </SectionWrapper>
      ))}
    </ApplicationWrapper>
  );
}

ApplicationStep7.propTypes = {
  step: PropTypes.number,
  application: PropTypes.object,
  submitApplicationCallback: PropTypes.func,
  reviewMode: PropTypes.bool,
};

export default ApplicationStep7;
