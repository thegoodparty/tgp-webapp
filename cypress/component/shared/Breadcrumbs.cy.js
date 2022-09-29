import { ConnectedRouter } from 'connected-next-router';
import { mount } from 'cypress/react'
import { ThemeProvider as UiThemeProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import Breadcrumbs from '../../../components/shared/Breadcrumbs';
import theme from '../../../theme';

const Component = (props) => (
    <UiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Breadcrumbs {...props} />
      </ThemeProvider>
    </UiThemeProvider>
)
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
      <Component links={breadcrumbsLinks} />
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