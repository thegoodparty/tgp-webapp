describe('ZipFinder', () => {
  beforeEach(() => {
    cy.visit('/intro/zip-finder');
  });
  it('finds correct text', () => {
    cy.get('[data-cy=title]').contains(
      'Enter your zip code to see your Federal elections',
    );
    cy.get('[data-cy=form-label]').contains('Enter Home Zip Code');
    cy.get('[data-cy=geo-location-button]').contains(
      'I’m Home, Use my Current Location',
    );
    cy.get('[data-cy=submit]').contains('SUBMIT');
  });
  it('check correct zipcode', () => {
    cy.chooseCorrectZipcode('90210');
  });
  it('check invalid numeric zipcode', () => {
    cy.get('[data-cy=zipcode]').type('11111');
    cy.get('[data-cy=submit]').click();
    cy.get('[data-cy=alert').contains('Invalid Zip Code');
    cy.get('[data-cy=zipcode]')
      .get('input')
      .should('have.value', '11111');
  });
  it('check invalid non-numeric zipcode', () => {
    cy.get('[data-cy=zipcode]').type('aaaaa');
    cy.get('[data-cy=submit]').click();
    cy.get('[data-cy=alert').contains('Invalid Zip Code');
    cy.get('[data-cy=zipcode]')
      .get('input')
      .should('have.value', 'aaaaa');
  });
});
