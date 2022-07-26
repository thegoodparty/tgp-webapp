import promisify from 'cypress-promise';
import { candidateRoute, partyResolver } from '../../../helpers/electionsHelper';
import { achievementsNextStepHelper } from '../../../helpers/achievementsHelper';
import { numberFormatter } from '../../../helpers/numberHelper';
import { daysTill } from '../../../helpers/dateHelper';
import { validateLink } from '../../../helpers/linkHelper';

const sampleCandidateList = [26, 29, 43];
context('Candidate', async () => {
    let candidatePageData = {}, candidate, candidateSupports, total;
    sampleCandidateList.forEach(candidateId => {
        describe(`check candidate page - ${candidateId}`, () => {
            it(`loads candidate data`, async () => {
                cy.visit(candidateRoute({id: candidateId, firstName: 'test', lastName: 'test'}));
                candidate = await promisify(
                    cy.getCandidate(candidateId).then(response => response.body),
                );
            });
            it('test Site Header', () => {
              cy.testSiteHeader();
            });
            it('test Site Footer', () => {
              cy.testSiteFooter();
            });
            it(`loads candidate support data`, async () => {
                console.log(candidate);
                ({ candidateSupports, total } = await promisify(
                    cy.getCandidateSupports(candidateId).then(response => response.body),
                ));
                console.log(candidate);
                candidatePageData = {
                    candidate: candidate.candidate,
                    candidatePositions: candidate.candidatePositions || [],
                    similarCampaigns: candidate.similarCampaigns || [],
                    id: candidateId,
                    candidateSupports,
                    supportCount: total,
                };
            });
          //   it(`test Endorse / Share`, () => {
              
          //     cy.get('[data-cy=profile-card-title]')
          //       .contains('Meet the Candidate');
              
          // });
          //   it(`test ProfileCard`, () => {
          //       const { firstName, lastName, party, race } = candidate.candidate;
          //       cy.get('[data-cy=profile-card-title]')
          //         .contains('Meet the Candidate');
          //       cy.get('[data-cy=profile-card-name]')
          //         .contains(firstName)
          //         .contains(lastName);
          //       cy.get('[data-cy=profile-card-party]')
          //         .contains(partyResolver(party));
          //   });
          //   it(`test EndorseSection`, () => {
          //       const supportCount = total;
          //       const achievements = achievementsNextStepHelper(supportCount).nextStep;
          //       cy.get('[data-cy=endorse-supportcount-wrapper]')
          //         .contains(numberFormatter(supportCount));
          //       cy.get('[data-cy=endorse-supportcount]')
          //         .contains(supportCount);
          //       cy.testSupportersProgressBar(supportCount, achievements.nextStep, null, false, '', '')
          //   });
          //   it(`test RecentlyJoined`, () => {
          //       const AnonymousIconPurple = '/images/anonymous-icon-purple.svg';

          //       cy.get('[data-cy=supporter-item]')
          //         .should('have.length', 2)
          //         .each(($el, index) => {
          //           cy.wrap($el)
          //             .find('[data-cy=supporter-item-icon]')
          //             .should('have.attr', 'src', AnonymousIconPurple);
          //           cy.wrap($el)
          //             .find('[data-cy=supporter-item-name]')
          //             .contains(candidateSupports[index].user);
          //           cy.wrap($el)
          //             .find('[data-cy=supporter-item-time]')
          //             .contains(candidateSupports[index].timeAgo)
          //             .contains(candidateSupports[index].type);
          //       });
          //   });
          //   it(`test Updates`, () => {
          //       const { updatesList } = candidate.candidate;
          //       console.log(updatesList);
          //       const deepLink = (update) => {
          //           return `#candidate-update-${update.id}`;
          //       };
          //       cy.get('[data-cy=updates-title]')
          //         .contains('Updates');
          //       cy.get('[data-cy=updates-item]')
          //         .should('have.length', updatesList.length)
          //         .each(($el, index) => {
          //           cy.wrap($el)
          //             .find('[data-cy=updates-link]')
          //             .should('have.attr', 'href', deepLink(updatesList[index]));
          //           if(updatesList[index].title) {
          //             cy.wrap($el)
          //               .find('[data-cy=updates-link]')
          //               .contains(updatesList[index].title);
          //           }
                      
          //           cy.wrap($el)
          //             .find('[data-cy=updates-time]')
          //             .contains(updatesList[index].timeAgo);
          //       });
          //   });
          //   it(`test Follow`, () => {
          //       const {
          //           firstName,
          //           lastName,
          //           facebook,
          //           linkedin,
          //           twitter,
          //           tiktok,
          //           snap,
          //           instagram,
          //           youtube,
          //           twitch,
          //           reddit,
          //           website,
          //       } = candidate.candidate;
          //       const channels = [
          //           { link: validateLink(facebook) },
          //           { link: validateLink(twitter) },
          //           { link: validateLink(tiktok) },
          //           { link: validateLink(snap) },
          //           { link: validateLink(linkedin) },
          //           {
          //             link: validateLink(instagram),
          //           },
          //           {
          //             link: validateLink(youtube),
          //           },
          //           { link: validateLink(twitch) },
          //           { link: validateLink(reddit) },
          //           { link: validateLink(website) },
          //       ];
          //       cy.get('[data-cy=follow-title]')
          //         .contains(firstName)
          //         .contains(lastName);
          //       cy.get('[data-cy=follow-item]')
          //         .should('have.length', channels.length);
          //   });
            it(`test Endorsements`, () => {
                const { endorsements } = candidate.candidate;
                if(endorsements && endorsements.length > 0) {

                  cy.get('[data-cy=endorsement-title]')
                    .contains('Featured Endorsements');
                  cy.get('[data-cy=endorsement-item]')
                    .should('have.length', endorsements.length)
                    .each(($el, index) => {
                          if(endorsements[index].link) {
                              cy.wrap($el)
                                .find('[data-cy=endorsement-item-link]')
                                .should('have.attr', 'href', endorsements[index].link);
                              cy.wrap($el)
                                .find('[data-cy=endorsement-item-link]')
                                .contains('Show More');
                          }
                          cy.wrap($el)
                            .find('[data-cy=endorsement-item-title]')
                            .contains(endorsements[index].title);
                          cy.wrap($el)
                            .find('[data-cy=endorsement-item-summary]')
                            .contains(endorsements[index].summary);
                  });
                }
            });
            it(`test SimliarCampaigns`, () => {
                const { similarCampaigns } = candidate.candidate;
                if(similarCampaigns && similarCampaigns.length > 0) {
                  cy.get('[data-cy=similar-campaigns-title]')
                    .contains('View Similar Campaigns');
                  cy.get('[data-cy=similar-campaigns-item]')
                    .should('have.length', similarCampaigns.length)
                    .each(($el, index) => {
                          cy.wrap($el)
                            .find('[data-cy=similar-campaigns-item-link]')
                            .should('have.attr', 'href', candidateRoute(similarCampaigns[index].candidate));
                          cy.wrap($el)
                            .find('[data-cy=similar-campaigns-item-link]')
                            .contains(similarCampaigns[index].candidate.firstName)
                            .contains(similarCampaigns[index].candidate.lastName);
                          cy.wrap($el)
                            .find('[data-cy=similar-campaigns-item-content]')
                            .contains(partyResolver(similarCampaigns[index].candidate.party))
                            .contains(partyResolver(similarCampaigns[index].candidate.race));
                          cy.get('[data-cy=similar-campaigns-item-match]')
                            .should('have.length', similarCampaigns[index].matchingIssues.length)
                            .each(($el1, index) => {
                                  cy.wrap($el1)
                                    .contains(similarCampaigns[index].matchingIssues[index].name);
                            });
                  });
                }
                
            });
            it(`test HeroSection`, () => {
                const { raceDate } = candidate.candidate;
                const days = daysTill(raceDate);
                if(raceDate) {
                  if(days >= 0) {
                    cy.get('[data-cy=hero-days]')
                      .contains(days);
                  }
                  else {
                      cy.get('[data-cy=hero-year]')
                        .contains(new Date(raceDate).getFullYear());
                  }
                }
                
            });
            it(`test TopIssues`, () => {
                const { candidatePositions } = candidate.candidate;
                if(candidatePositions && candidatePositions.length > 0) {
                  cy.get('[data-cy=top-issues-title]')
                    .contains('Top Issues');
                  cy.get('[data-cy=top-issue]')
                    .should('have.length', candidatePositions.length)
                    .each(($el, index) => {
                      cy.wrap($el)
                        .find('[data-cy=top-issue-position]')
                        .contains(candidatePositions[index].position?.name);
                      cy.wrap($el)
                        .find('[data-cy=top-issue-name]')
                        .contains(candidatePositions[index].topIssue?.name)
                        .contains(candidatePositions[index].description);
                  });
                }
                
            });
            // it(`test Summary`, () => {
            //     cy.get('[data-cy=summary-title]')
            //       .contains('Campaign Summary');
            // });
        });
    });
});
