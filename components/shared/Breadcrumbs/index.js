/**
 *
 * Breadcrumbs
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { JsonLd } from 'react-schemaorg';
import { useRouter } from 'next/router';

import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import { Body11 } from '../typogrophy';

const Wrapper = styled(Body11)`
  display: flex;
  align-items: center;
  padding: 0;
  white-space: nowrap;
  max-width: 100vw;
  overflow-x: auto;
`;

const StyledBreadCrumbs = styled(MuiBreadcrumbs)`
  && {
    .MuiBreadcrumbs-ol {
      flex-wrap: nowrap;
    }
  }
`;

const GrayBody11 = styled(Body11)`
  color: ${({ theme }) => theme.colors.grayBE};
`;

function Breadcrumbs({ links }) {
  const router = useRouter();
  const schema = [];
  links.forEach((link, index) => {
    schema.push({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': link.href || router.asPath,
        name: link.label,
      },
    });
  });

  return (
    <Wrapper>
      <JsonLd
        item={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: schema,
        }}
      />
      <StyledBreadCrumbs aria-label="breadcrumb">
        {links.map((link, index) => (
          <span key={link.label}>
            {index < links.length - 1 && (
              <Link href={link.href} key={link.href} passHref data-cy="breadcrumb-item">
                <a data-cy="breadcrumb-link">
                  <Body11>{link.label}</Body11>
                </a>
              </Link>
            )}
          </span>
        ))}
      </StyledBreadCrumbs>
      <GrayBody11 data-cy="breadcrumb-label">{links[links.length - 1].label}</GrayBody11>
    </Wrapper>
  );
}

Breadcrumbs.propTypes = {
  links: PropTypes.array,
};

export default memo(Breadcrumbs);
