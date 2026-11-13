// Bitcoin Deepa's journey, year by year. Photos live in /public/images/about.

export interface JourneyPhoto {
  src: string;
  alt: string;
  w: number;
  h: number;
}

export interface JourneyEntry {
  /** e.g. "February" */
  month: string;
  title: string;
  body?: string;
  /** Optional highlighted figure shown beside the text. */
  figure?: { value: string; label: string };
  photos?: JourneyPhoto[];
}

export interface JourneyYear {
  year: string;
  entries: JourneyEntry[];
}

const P = "/images/about";

export const JOURNEY: JourneyYear[] = [
  {
    year: "2022",
    entries: [
      {
        month: "February",
        title: "The first Ceylon Bitcoin Meetups",
        body: "Bitcoiners met in person in Colombo, Galle and Kandy, the start of a meetup series that has travelled the island since.",
        photos: [
          { src: `${P}/2022-colombo-meetup.png`, alt: "Group photo at the Ceylon Bitcoin Meetup in Colombo, February 2022", w: 640, h: 294 },
          { src: `${P}/2022-galle-meetup.png`, alt: "Attendees around a table at the Ceylon Bitcoin Meetup in Galle", w: 640, h: 289 },
          { src: `${P}/2022-kandy-meetup.png`, alt: "Group photo at the Ceylon Bitcoin Meetup in Kandy", w: 512, h: 384 },
        ],
      },
      {
        month: "April",
        title: "Donate Sri Lanka: a COVID crowdfund",
        body: "The community crowdfunded in Bitcoin and donated the proceeds to Sarvodaya USA, in Bitcoin.",
        figure: { value: "0.00908242 BTC", label: "Crowdfunded and donated" },
      },
      {
        month: "October",
        title: "Ceylon Bitcoin Meetup with Mike G",
        photos: [
          { src: `${P}/2022-mike-g-meetup.png`, alt: "Group photo at the Ceylon Bitcoin Meetup with Mike G", w: 640, h: 480 },
          { src: `${P}/2022-mike-g-talk.png`, alt: "A talk on stage at the Ceylon Bitcoin Meetup with Mike G", w: 408, h: 258 },
        ],
      },
    ],
  },
  {
    year: "2023",
    entries: [
      {
        month: "March",
        title: "Ceylon Bitcoin Meetup in Ella",
        photos: [
          { src: `${P}/2023-ella-meetup.png`, alt: "Group photo in the hills at the Ceylon Bitcoin Meetup in Ella", w: 714, h: 536 },
          { src: `${P}/2023-ella-session.png`, alt: "An outdoor session at the Ella meetup", w: 476, h: 357 },
        ],
      },
      {
        month: "May",
        title: "Representing Sri Lanka at Bitcoin 2023",
        body: "We took Sri Lanka’s story to the Bitcoin 2023 conference, and met Saifedean Ammous, author of “The Bitcoin Standard”.",
      },
      {
        month: "July",
        title: "Bitcoin කතා podcast: the Lightning Network",
        body: "An episode of Bitcoin කතා (Bitcoin Katha), our podcast, on how the Lightning Network makes Bitcoin payments fast and cheap.",
        photos: [
          { src: `${P}/2023-bitcoin-katha-lightning.jpeg`, alt: "Bitcoin Katha podcast cover for the Lightning Network episode", w: 384, h: 512 },
        ],
      },
      {
        month: "August",
        title: "Ceylon Bitcoin Meetup in Colombo",
        photos: [
          { src: `${P}/2023-colombo-meetup.png`, alt: "A presenter speaking at the Colombo meetup, August 2023", w: 385, h: 289 },
          { src: `${P}/2023-colombo-session.jpeg`, alt: "Attendees listening at the Colombo meetup", w: 512, h: 384 },
        ],
      },
      {
        month: "September",
        title: "Our Lightning wallet launches",
        body: "An open-source, Telegram-based Lightning wallet, with a Bolt Card enabled NFC card for tap-to-pay.",
        photos: [
          { src: `${P}/2023-bolt-card.jpeg`, alt: "The Bitcoin Deepa Bolt Card NFC wallet card held in a hand", w: 337, h: 384 },
          { src: `${P}/2023-bolt-cards.png`, alt: "Bitcoin Deepa Bolt Cards, front and back", w: 432, h: 768 },
        ],
      },
    ],
  },
  {
    year: "2024",
    entries: [
      {
        month: "January",
        title: "HRF Bitcoin Dev Fund grant",
        body: "Bitcoin Deepa, the “Pearl of Satoshi”, is one of 18 projects funded by the HRF Bitcoin Dev Fund to grow Sri Lanka’s Bitcoin community through meetups, merchant adoption, Lightning tech, education and the Bitcoin Katha podcast.",
        photos: [
          { src: `${P}/2024-hrf-grant.png`, alt: "Human Rights Foundation announcement: HRF grants $500,000 to 18 projects worldwide", w: 614, h: 321 },
        ],
      },
      { month: "March", title: "Ceylon Bitcoin Meetup" },
      { month: "September", title: "Ceylon Bitcoin Meetup" },
    ],
  },
  {
    year: "2025",
    entries: [
      {
        month: "January",
        title: "Bitcoin multisig payroll with TapSigner",
        body: "We get paid in sats: Bitcoin salaries from the Pearl of Satoshi, secured with multisig and TapSigner cards.",
        photos: [
          { src: `${P}/2025-paid-in-sats.png`, alt: "Illustration: We Get Paid in Sats, Bitcoin salaries from the Pearl of Satoshi", w: 410, h: 410 },
          { src: `${P}/2025-tapsigner.png`, alt: "TapSigner cards laid out for a multisig setup", w: 512, h: 384 },
        ],
      },
      {
        month: "July",
        title: "The Bullish Case for Bitcoin, in Sinhala",
        body: "We launched බිට්කොයින් පෙළහර, the Sinhala edition of “The Bullish Case for Bitcoin”.",
        photos: [
          { src: `${P}/2025-book.png`, alt: "The Sinhala edition of The Bullish Case for Bitcoin held in hand", w: 1024, h: 717 },
          { src: `${P}/2025-book-launch-stage.png`, alt: "The stage at the official book launch", w: 290, h: 384 },
        ],
      },
    ],
  },
];
