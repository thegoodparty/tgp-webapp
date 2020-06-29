describe('GuestHeader', () => {
  it('finds correct text', () => {
    cy.visit('/you');
    cy.get('[data-cy=elections]').contains('ELECTIONS');
    cy.get('[data-cy=you]').contains('YOU');
  });

  const sizes = ['iphone-6', 'ipad-2', [1024, 768]];

  sizes.forEach(size => {
    // an array of different viewports
    it(`check nav links on ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.visit('/you');
      cy.get('[data-cy=elections]').click();
      cy.url().should('include', '/intro/zip-finder');

      cy.get('[data-cy=zipcode]').type('90210');
      cy.get('[data-cy=submit]').click();

      cy.url().should('include', '/elections/district/90210');
      cy.get('[data-cy=you]').click();
      cy.url().should('include', '/you');

      cy.get('[data-cy=elections]').click();
      cy.url().should('include', '/elections/district/90210');

      cy.get('[data-cy=party]').click();
      cy.url().should('include', '/party');
    });
  });
});
