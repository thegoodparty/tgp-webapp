import TestComponent from '../TestComponent';

describe('Breadcrumbs.cy.js', () => {
  it('Should render component', () => {
    const breadcrumbsLinks = [
      { href: '/', label: 'Good Party' },
      {
        href: '/faqs',
        label: 'Frequently asked questions',
      },
    ];
    cy.mount(
      <TestComponent Component={BreadCrumbs} links={breadcrumbsLinks} />
    );
    cy.get('[data-cy=breadcrumb-link]')
      .should('have.length', breadcrumbsLinks.length - 1) 
      .each(($el, index) => {
        cy.wrap($el)
          .get('[data-cy=breadcrumb-link]')
          .should('have.attr', 'href', breadcrumbsLinks[index].href)
          .contains(breadcrumbsLinks[index].label);
      });
    cy.get('[data-cy=breadcrumb-label]')
      .should('exist')
      .contains(breadcrumbsLinks[breadcrumbsLinks.length - 1].label);
  })
})