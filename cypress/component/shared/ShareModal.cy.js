import { createContext } from 'react';
import TestComponent from '../TestComponent';
import { sanitizeUrl } from '@braintree/sanitize-url';
import ShareModal from '../../../components/shared/ShareModal';
import { candidateHash } from '../../../helpers/candidatesHelper';
import { uuidUrl } from '../../../helpers/userHelper';

describe('ShareModal.cy.js', () => {
  it('Should render component', () => {
    const shareUrl = 'http://ct.moreover.com/?a=48911039652&p=189&v=1&x=pl9snRhFGzCwXJ406kSAvw ';
    const messageNoUrl = 'Vote different';
    const candidate = null;
    let queryUrl = shareUrl;
    if (queryUrl) {
        queryUrl = sanitizeUrl(queryUrl);
    }

    let url = '';
    if (typeof window !== 'undefined') {
        if (queryUrl) {
        url = queryUrl;
        } else {
        const path = window.location.pathname;
        url = uuidUrl(user, window.location.origin + path);
        }
    }
    const encodedUrl = encodeURIComponent(url);
    const encodedMessageBody = `${messageNoUrl} \n\n ${encodedUrl}`;

    const textMessageBody = `${url} ${'\n %0a'} ${'\n %0a'}${messageNoUrl}`;

    const emailSubject = 'Check this out';

    const emailBody = `${messageNoUrl}%0D%0A%0D%0A${encodedUrl}%0D%0A%0D%0A GOOD PARTY%0D%0AFree software for free elections`;
    let hash;
    if (candidate) {
        hash = candidateHash(candidate);
    }
    const hashQueryTwitter = hash ? `&hashtags=${hash}` : '';
    const hashQueryFacebook = hash ? `&hashtag=${hash}` : '';

    const channels = [
      {
        label: 'Twitter',
        className: 'twitter',
        link: `https://twitter.com/share?url=${encodedUrl}&text=${messageNoUrl}${hashQueryTwitter}`,
      },
      {
        label: 'Facebook',
        className: 'facebook',
        link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}${hashQueryFacebook}`,
      },
      {
        label: 'Messenger',
        className: 'messenger',
        link: `fb-messenger://share/?app_id=241239336921963&link=${encodedUrl}${hashQueryFacebook}`,
      },
      {
        label: 'Text message',
        className: 'sms',
        link: `sms:?&body=${textMessageBody.replace('&', '%26')}`,
      },
      {
        label: 'WhatsApp',
        className: 'whatsapp',
        link: `https://api.whatsapp.com/send?text=${encodedMessageBody}`,
      },
      {
        label: 'Email',
        className: 'email',
        link: `mailto:?body=${emailBody}&subject=${emailSubject}`,
      },
    ];
    const CandidateContext = createContext();
    cy.mount(
      <CandidateContext.Provider value={{}}>
        <TestComponent Component={ShareModal} shareUrl={shareUrl} isTest={true} />
      </CandidateContext.Provider>
    );
    const availableChannels = channels.filter(channel => channel.link);
    cy.get('[data-cy=share-modal-title]')
      .should('exist')
      .contains('Share on');  
    cy.get('[data-cy=share-item]')
      .should('have.length', availableChannels.length)
      .each(($el, index) => {
        cy.wrap($el)
          .get('[data-cy=share-label]')
          .contains(availableChannels[index].label);
      });
  });
})