export const achievementsHelper = count => {
  if (count >= 10000) {
    return {
      nextStep: 50000,
      text: (
        <span>
          <strong>At 50,000 endorsements,</strong> this campaign is more likely
          to win the race!
        </span>
      ),
    };
  }

  if (count >= 5000) {
    return {
      nextStep: 10000,
      text: (
        <span>
          <strong>At 10,000 endorsements,</strong> this campaign is more likely
          to get picked up by <strong>national media!</strong>
        </span>
      ),
    };
  }

  if (count >= 2500) {
    return {
      nextStep: 5000,
      text: (
        <span>
          <strong>At 5,000 endorsements,</strong> this campaign is likely to
          have enough signatures to get on the <strong>ballot!</strong>
        </span>
      ),
    };
  }

  if (count >= 1000) {
    return {
      nextStep: 2500,
      text: (
        <span>
          <strong>At 2,500 endorsements,</strong> this campaign is more likely
          to get picked up by <strong>regional media!</strong>
        </span>
      ),
    };
  }

  if (count >= 500) {
    return {
      nextStep: 1000,
      text: (
        <span>
          <strong>At 1,000 endorsements,</strong> this campaign is more likely
          to get picked up by <strong>local media!</strong>
        </span>
      ),
    };
  }

  if (count >= 250) {
    return {
      nextStep: 500,
      text: (
        <span>
          <strong>At 500 endorsements,</strong> this campaign is becoming truly{' '}
          <strong>people-powered</strong> 💪.
        </span>
      ),
    };
  }

  if (count >= 100) {
    return {
      nextStep: 250,
      text: (
        <span>
          <strong>At 250 endorsements,</strong> this campaign will have more
          endorsements than <strong>all the competitors combined</strong>.
        </span>
      ),
    };
  }

  if (count >= 50) {
    return {
      nextStep: 100,
      text: (
        <span>
          <strong>At 100 endorsements,</strong> this campaign will have more
          endorsements than <strong>Shaquille O'Neal.</strong>
        </span>
      ),
    };
  }

  if (count >= 25) {
    return {
      nextStep: 50,
      text: (
        <span>
          <strong>At 50 endorsements,</strong> this campaign will have more
          endorsements than the competitors!
        </span>
      ),
    };
  }

  if (count >= 10) {
    return {
      nextStep: 25,
      text: (
        <span>
          <strong>At 25 endorsements,</strong> this campaign is more than just
          neighbors and friends!
        </span>
      ),
    };
  }

  if (count >= 1) {
    return {
      nextStep: 10,
      text: (
        <span>
          <strong>At 10 endorsements,</strong> this campaign is starting to
          pick up some steam!
        </span>
      ),
    };
  }
  return {
    nextStep: 10,
    text: (
      <span>
        The <strong>first endorsement</strong> is the most important!
      </span>
    ),
  };
};
