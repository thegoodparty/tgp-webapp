export const achievementsHelper = count => {
  if (count >= 10000) {
    return {
      nextStep: 60000,
      text: (
        <span>
          <strong>At 60,000 endorsements,</strong> this campaign will have more
          supporters than the
          <strong>population of Greenland!</strong>
        </span>
      ),
    };
  }

  if (count >= 5000) {
    return {
      nextStep: 10000,
      text: (
        <span>
          <strong>At 10,000 endorsements,</strong> this campaign is changing the
          <strong>world!</strong> Let's make{' '}
          <strong>people matter more than money!</strong>
        </span>
      ),
    };
  }

  if (count >= 1500) {
    return {
      nextStep: 5000,
      text: (
        <span>
          <strong>At 5,000 endorsements,</strong> this campaign will have enough
          signatures to get on the <strong>ballot.</strong>
        </span>
      ),
    };
  }

  if (count >= 1000) {
    return {
      nextStep: 1500,
      text: (
        <span>
          <strong>At 1,500 endorsements,</strong> this campaign will have{' '}
          <strong>more support</strong> than any independent in the race.
        </span>
      ),
    };
  }

  if (count >= 750) {
    return {
      nextStep: 1000,
      text: (
        <span>
          <strong>At 1,000 endorsements,</strong> this campaign is more likely
          to get picked up by <strong>local media.</strong>
        </span>
      ),
    };
  }

  if (count >= 250) {
    return {
      nextStep: 750,
      text: (
        <span>
          <strong>At 750 endorsements,</strong> this campaign is a{' '}
          <strong>people-powered</strong>
          💪
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
          endorsements than the <strong>corrupt incumbents.</strong>
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
          <strong>At 50 endorsements,</strong> this campaign is making history
          and taking on the <strong>establishment politicians!</strong>
        </span>
      ),
    };
  }

  if (count >= 10) {
    return {
      nextStep: 25,
      text: (
        <span>
          <strong>At 25 endorsements,</strong> this campaign is on the way to
          getting <strong>money out of politics!</strong>
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
          pickup some steam!
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
