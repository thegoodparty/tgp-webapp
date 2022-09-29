import { ThemeProvider as UiThemeProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import FeedbackWrapper from '../../../components/shared/FeedbackWrapper';
import theme from '../../../theme';

const Component = (props) => (
    <UiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <FeedbackWrapper {...props} />
      </ThemeProvider>
    </UiThemeProvider>
)
describe('FeedbackWrapper.cy.js', () => {
  it('Should render component with isOpen=false', () => {
    cy.mount(
        <Component 
            sendFeedbackCallback={() => {}} 
            toggleModalCallback={() => {}} 
            isOpen={false} 
        />
    );
    cy.get('[data-cy=feedback-side-button]')
      .should('exist')
      .contains('Feedback');
    cy.get('[data-cy=feedback-form-wrapper]')
      .should('not.exist');
  })
  it('Should render component with isOpen=true', () => {
    cy.mount(
        <Component 
            sendFeedbackCallback={() => {}} 
            toggleModalCallback={() => {}} 
            isOpen={true} 
        />
    );
    cy.get('[data-cy=feedback-side-button]')
      .should('exist')
      .contains('Feedback');
    cy.get('[data-cy=feedback-form-wrapper]')
      .should('exist');
    cy.get('[data-cy=feedback-subtitle]')
      .should('exist')
      .contains('Please let us know your thoughts about Good Party');
    cy.get('[data-cy=feedback-description]')
      .should('exist')
      .contains('How do you feel about plans to:');
    cy.get('[data-cy=feedback-thumbs-down]')
      .should('exist')
      .should('have.class', 'red');
    cy.get('[data-cy=feedback-thumbs-down]').click();
    cy.get('[data-cy=feedback-thumbs-down]')
      .should('have.class', 'active');
    cy.get('[data-cy=feedback-thumbs-up]')
      .should('exist')
      .should('have.class', 'green');
    cy.get('[data-cy=feedback-thumbs-up]').click();
    cy.get('[data-cy=feedback-thumbs-up]')
      .should('have.class', 'active');
    cy.get('[data-cy=feedback-cancel]')
      .should('exist')
      .contains('Cancel');
    cy.get('[data-cy=feedback-submit]')
      .should('exist')
      .contains('Send');
  })
})