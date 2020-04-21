const ONE_HOUR = 60 * 60 * 1000;

export const dateUsHelper = orgDate => {
  if (!orgDate) {
    return orgDate;
  }
  // return new Date(orgDate).toLocaleString("en-US")
  try {
    const date = new Date(orgDate);
    const pstDate = new Date(date.getTime() + 8 * ONE_HOUR);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(pstDate);
  } catch (err) {
    console.log('error', err);
    return orgDate;
  }
};

// returns December 12, 2020 * 4 AM
export const formatDateWithTimezone = (orgDate, timeZone) => {
  if (!orgDate) {
    return '';
  }
  try {
    const date = new Date(orgDate);
    return `${dateTimeUsHelper(date).toString()} ${timeZone}`;
  } catch (err) {
    return orgDate;
  }
};

// returns December 12, 2020 * 4 AM
export const dateTimeUsHelper = orgDate => {
  if (!orgDate) {
    return orgDate;
  }
  try {
    const date = orgDate;
    const justDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    }).format(date);

    // show minutes only it is not 0 (4PM and 4:30PM)

    const minutes = new Intl.DateTimeFormat('en-US', {
      minute: 'numeric',
    }).format(date);

    let time;
    if (minutes === '0') {
      time = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
      }).format(date);
    } else {
      time = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(date);
    }

    return `${justDate} \u00b7 ${time.replace(' ', '')}`;
  } catch (err) {
    return orgDate;
  }
};
