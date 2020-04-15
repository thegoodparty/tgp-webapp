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
    const hoursDelta = timeZoneToHours(timeZone);
    const date = new Date(orgDate);
    const now = new Date();
    const myOffset = now.getTimezoneOffset() / 60;
    const noTimeZoneDate = new Date(
      date.getTime() - (hoursDelta + myOffset) * ONE_HOUR,
    );
    return `${dateTimeUsHelper(noTimeZoneDate).toString()} ${timeZone}`;
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

// returns date in format yyyy-MM-dd'T'HH:mm:ss.SSS'Z' (for calendar)
export const dateISOStringHelper = (orgDate, addHours = 0) => {
  if (!orgDate) {
    return orgDate;
  }
  try {
    const newDate = new Date(orgDate);
    const utcDate = new Date(newDate.toISOString());
    const hoursDelta = 0;

    utcDate.setHours(utcDate.getHours() - hoursDelta + addHours);
    return utcDate;
  } catch (err) {
    return orgDate;
  }
};

const timeZoneToHours = timezone => {
  // is daylight saving?
  const now = new Date();
  const jan = new Date(now.getFullYear(), 0, 1);
  const jul = new Date(now.getFullYear(), 6, 1);
  const isDstObserved =
    now.getTimezoneOffset() <
    Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());

  const timeOffest = isDstObserved ? 1 : 0;
  if (!timezone) {
    return 0;
  }
  if (timezone === 'PST') {
    return -8 + timeOffest;
  }
  if (timezone === 'EST') {
    return -5 + timeOffest;
  }
  if (timezone === 'CST') {
    return -6 + timeOffest;
  }
  return 0;
};
