import React from 'react';
import It from '../components/shared/It';

//text1
const divided = (
  <>
    <It /> wants us divided &amp; hopeless.
  </>
);
const systemDivided = 'The system wants us divided and hopeless.';

const stickers = 'Get free stickers and swag to host a';

const bummer = (
  <>
    <It /> is a bummer right now.
  </>
);

const doAbout = (
  <>
    What can we do about <It />?
  </>
);

const tuesdays = 'Tuesdays are the new Friday.';

const dontOwn = (
  <>
    Don’t let <It /> own us.
  </>
);

const trusted = (
  <>
    <It /> can’t be trusted.
  </>
);

const sad = (
  <>
    <It /> wants you to be sad.
  </>
);

// text2
const voteIt = (
  <>
    Vote <It /> Out!
  </>
);

const fuckIt = (
  <>
    F*ck <It />!
  </>
);

const overIt = (
  <>
    Get Over <It />!
  </>
);

const forgetIt = (
  <>
    Forget <It />!
  </>
);

const kickIt = (
  <>
    Kick <It /> out!
  </>
);

const effIt = (
  <>
    Eff <It />!
  </>
);

const screwIt = (
  <>
    Screw <It />!
  </>
);

const united = 'Be united and hopeful!';

const fuckItHappy = (
  <>
    Fuck <It />, and be happy!
  </>
);
const makeIt = (
  <>
    Make <It />, stop!
  </>
);

const forgetAboutIt = (
  <>
    Forget about <It />!
  </>
);

const defyIt = (
  <>
    Defy <It />!
  </>
);

const hashGp = '#goodparty';
const whatsNot = 'You know what’s not?';
const knowWhy = 'Wanna know why?';

const withGP = '(with a #goodparty)';

const doFk = {
  text1: doAbout,
  text2: (
    <>
      Fuck <It />
    </>
  ),
  text3: withGP,
};

const doOver = {
  text1: doAbout,
  text2: (
    <>
      Get over <It />
    </>
  ),
  text3: withGP,
};

const doHost = {
  text1: doAbout,
  text2: (
    <>
      Host <It />
    </>
  ),
  text3: 'a #goodparty',
};

const doForget = {
  text1: doAbout,
  text2: (
    <>
      Forget <It />
    </>
  ),
  text3: withGP,
};

const doVote = {
  text1: doAbout,
  text2: voteIt,
  text3: withGP,
};

const waitHost = {
  text1: (
    <>
      <It /> says wait for the weekend to party.
    </>
  ),
  text2: <>Host</>,
  text3: 'a #goodparty on Tuesdays',
};

const doResist = {
  text1: doAbout,
  text2: (
    <>
      Resist <It />
    </>
  ),
  text3: withGP,
};

const defaultMsg = {
  text1: divided,
  text2: fuckIt,
  text3: withGP,
};

const utms = {
  'us_younger_divided-hopeless-fk': defaultMsg,
  'us_younger_divided-hopeless-get-over': {
    text1: divided,
    text2: overIt,
    text3: withGP,
  },
  'us_younger_system-divided-fk': {
    text1: systemDivided,
    text2: fuckIt,
    text3: withGP,
  },
  'us_younger_free-stickers': {
    text1: stickers,
    text2: hashGp,
    text3: '',
  },
  'us_younger_it-sucks': {
    text1: bummer,
    text2: whatsNot,
    text3: hashGp,
  },
  'us_younger_fk-it': {
    text1: '',
    text2: fuckIt,
    text3: withGP,
  },
  'us_younger_forget-it': {
    text1: '',
    text2: forgetIt,
    text3: withGP,
  },
  'us_younger_vote-it-out': {
    text1: '',
    text2: kickIt,
    text3: hashGp,
  },
  'us_younger_tuesdays-new-fridays': {
    text1: tuesdays,
    text2: '',
    text3: knowWhy,
  },
  'us_younger_dont-let-it-own': {
    text1: dontOwn,
    text2: forgetIt,
    text3: withGP,
  },

  //

  'us_younger_eff-it': {
    text1: divided,
    text2: effIt,
    text3: withGP,
  },

  'us_younger_screw-it': {
    text1: divided,
    text2: screwIt,
    text3: withGP,
  },

  'us_younger_cant-be-trusted': {
    text1: trusted,
    text2: fuckIt,
    text3: withGP,
  },

  'us_younger_united-hopeful': {
    text1: divided,
    text2: united,
    text3: withGP,
  },

  'us_younger_be-happy': {
    text1: sad,
    text2: fuckItHappy,
    text3: withGP,
  },

  'us_younger_make-it-stop': {
    text1: divided,
    text2: makeIt,
    text3: withGP,
  },

  'us_younger_forget-about-it': {
    text1: divided,
    text2: forgetAboutIt,
    text3: withGP,
  },

  'us_younger_defy-it': {
    text1: divided,
    text2: defyIt,
    text3: withGP,
  },

  //

  default: defaultMsg,
};

export default utms;
