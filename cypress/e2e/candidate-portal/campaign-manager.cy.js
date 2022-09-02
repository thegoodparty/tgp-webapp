import promisify from 'cypress-promise';

const id = 37;
const fields = [
    { label: 'First Name', key: 'firstName', required: true },
    { label: 'Last Name', key: 'lastName', required: true },
    { label: 'Zip Code', key: 'zip' },
    {
      label: 'Political party affiliation',
      key: 'party',
      type: 'select',
      options: ['I', 'GP', 'L', 'W', 'F', 'Other'],
      required: true,
    },
  
    { label: 'Other Party', key: 'otherParty', isHidden: true },
    { label: 'Twitter', key: 'twitter', isUrl: true },
    { label: 'Facebook', key: 'facebook', isUrl: true },
    { label: 'YouTube', key: 'youtube', isUrl: true },
    { label: 'LinkedIn', key: 'linkedin', isUrl: true },
    { label: 'Snap', key: 'snap', isUrl: true },
    { label: 'TikTok', key: 'tiktok', isUrl: true },
    { label: 'Instagram', key: 'instagram', isUrl: true },
    { label: 'Twitch', key: 'twitch', isUrl: true },
    { label: 'Website', key: 'website', isUrl: true },
 ];
  
const fields2 = [
    { label: 'Office being sought ', key: 'race', required: true },
    {
      label: 'Date of election ',
      key: 'raceDate',
      isDate: true,
      columns: 6,
      required: true,
    },
    {
      label: 'State ',
      key: 'state',
      columns: 6,
      type: 'select',
    //   options: flatStates,
      required: true,
    },
    {
      label: 'Ballot filing deadline ',
      key: 'ballotDate',
      isDate: true,
      columns: 6,
    },
    {
      label: 'Early voting date',
      key: 'earlyVotingDate',
      isDate: true,
      columns: 6,
    },
    { label: 'District (if applicable)', key: 'district' },
    { label: 'Headline', key: 'headline', required: true },
    { label: 'Summary', key: 'about', isRichText: true, required: true },
    { label: 'Committee name', key: 'committeeName' },
    { label: 'Campaign Video (YouTube Id)', key: 'heroVideo' },
];
  
const fields3 = [
    { label: 'First Name ', key: 'contactFirstName' },
    { label: 'Last Name ', key: 'contactLastName' },
    { label: 'Email ', key: 'contactEmail', type: 'email' },
    { label: 'Phone ', key: 'contactPhone', type: 'phone' },
  ];
  
const panels = [
    { fields, label: 'Candidate Information' },
    { fields: fields2, label: 'Campaign Information' },
    { fields: fields3, label: 'Contact Information' },
];
let state = {}, candidate;
describe('Candidate Portal - Campaign Manager', () => {
    it('test Site Footer', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/candidate-portal/campaign-manager/${id}`);
        cy.testSiteFooter();
    });
    
    it('load CampaignCandidate', async () => {
        const content = await promisify(
            cy.getCampaignCandidate(id).then(response => response.body),
        );
        ({ candidate } = content);
        panels.forEach((panel) => {
            panel.fields.forEach((field) => {
                state[field.key] = candidate[field.key] || '';
            });
        });
        console.log(state);
    });
    it('test Campaign Manage Panel', () => {
        // cy.get('[data-cy=page-title]')
        //   .contains('Edit Campaign Page');
        cy.get('[data-cy=campaign-manage-panel]')
          .should('have.length', panels.length)
          .each(($el, index) => {
            const panel = panels[index];
            cy.wrap($el)
              .find('[data-cy=panel-title]')
              .contains(panel.label);
            cy.wrap($el)
              .find('[data-cy=panel-field]')
              .should('have.length', panel.fields.filter(field => !field.isHidden).length)
              .each(($el1, index1) => {
              });
        });
    });
});
