import TestComponent from '../TestComponent';
import UserAvatar from '../../../components/shared/UserAvatar';
import { getInitials } from '../../../helpers/userHelper';


let user = {
  "id" : 90,
  "phone" : "",
  "email" : "blueshark0811@gmail.com",
  "uuid" : "zpzeclooe0",
  "name" : "Peter Asaro",
  "feedback" : "The Good Party",
  "socialId" : null,
  "socialProvider" : null, 
  "displayAddress" : "",
  "addressComponents": "",
  "zip" : "95001",
  "isPhoneVerified" : false,
  "isEmailVerified" : true,
  "avatar": "https://assets.goodparty.org/uploads/user-htzxz8.jpeg",
  "hasPassword" : true,
  "voteStatus" : "",
  "guestReferrer" : null,
  "crewCount" : 1,
  "isAdmin" : true,
  "metaData" : null,
  "address" : "asdf",
  "city" : "Aptos",
  "displayName" : "",
  "pronouns": "",
  "referrer": null
}
describe('UserAvatar.cy.js', () => {
  it('Should render component with avatar', () => {
    
    cy.mount(
      <TestComponent Component={UserAvatar} user={user} />
    );
    cy.get('[data-cy=avatar-img]')
      .should('exist')
      .should('have.css', 'background-image', `url("${user.avatar}")`);
    cy.get('[data-cy=avatar-initials]')
      .should('not.exist');
  });

  it('Should render component without avatar', () => {
    user.avatar = null;
    cy.mount(
      <TestComponent Component={UserAvatar} user={user} />
    );
    cy.get('[data-cy=avatar-img]')
      .should('not.exist');
    cy.get('[data-cy=avatar-initials]')
      .should('exist')
      .contains(getInitials(user.name));
  });
})