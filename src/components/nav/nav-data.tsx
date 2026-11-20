import type { ComponentType } from "react";
import {
  BookIcon,
  CalendarIcon,
  CapIcon,
  FlagIcon,
  PeopleIcon,
  RocketIcon,
  SwapIcon,
  SwatchesIcon,
  TelegramDuoIcon,
  TranslateIcon,
} from "./nav-icons";
import { RibbonsArt, YakaArt } from "./tile-art";

export const TELEGRAM_INVITE = "https://t.me/+OoVmewRlUHg1MTA1";

export interface NavLinkItem {
  title: string;
  description: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
  external?: boolean;
  /** Fire the Meta Pixel "Lead" event on click (community joins). */
  lead?: boolean;
}

/** The media tile beside a menu's links: a photo, or a short muted loop. */
export interface NavFeature {
  title: string;
  caption: string;
  href: string;
  external?: boolean;
  /** Poster image, and the only media when there is no video. */
  image?: { src: string; width: number; height: number; alt: string };
  /** Optional muted loop shown over the poster (small mp4). */
  video?: string;
  /** Code-drawn art, used instead of an image. */
  Art?: ComponentType;
}

export interface NavMenu {
  id: string;
  label: string;
  items: NavLinkItem[];
  feature?: NavFeature;
}

export const NAV_MENUS: NavMenu[] = [
  {
    id: "learn",
    label: "Learn",
    items: [
      {
        title: "Bitcoin Deepa Blog",
        description: "Guides for your Bitcoin journey",
        href: "https://blog.bitcoindeepa.com",
        Icon: BookIcon,
        external: true,
      },
      {
        title: "Ceylon Cash Blog",
        description: "Bitcoin explained in Sinhala",
        href: "https://blog.ceyloncash.com",
        Icon: TranslateIcon,
        external: true,
      },
      {
        title: "Learning Hub",
        description: "Resources for every level",
        href: "https://blog.bitcoindeepa.com/resources/",
        Icon: CapIcon,
        external: true,
      },
    ],
    feature: {
      title: "The Sinhala Bitcoin book",
      caption: "Order your copy",
      href: "/#book-order",
      image: {
        src: "/images/about/2025-book.png",
        width: 1024,
        height: 717,
        alt: "The Bitcoin Deepa book held in two hands",
      },
    },
  },
  {
    id: "community",
    label: "Community",
    items: [
      {
        title: "Community hub",
        description: "Channels, photos and news",
        href: "/community",
        Icon: PeopleIcon,
      },
      {
        title: "About Us",
        description: "Our story since the first meetup",
        href: "/about",
        Icon: FlagIcon,
      },
      {
        title: "Events & Meetups",
        description: "Meetups across Sri Lanka",
        href: "https://lu.ma/bitcoindeepa",
        Icon: CalendarIcon,
        external: true,
      },
      {
        title: "Telegram Community",
        description: "Chat with the community",
        href: TELEGRAM_INVITE,
        Icon: TelegramDuoIcon,
        external: true,
        lead: true,
      },
    ],
    feature: {
      title: "Come to a meetup",
      caption: "See upcoming events",
      href: "https://lu.ma/bitcoindeepa",
      external: true,
      Art: RibbonsArt,
    },
  },
  {
    id: "resources",
    label: "Resources",
    items: [
      {
        title: "Satoshi Converter",
        description: "Sats to LKR, USD and BTC",
        href: "/satoshi-to-usd-and-lkr-converter",
        Icon: SwapIcon,
      },
      {
        title: "Brand Guidelines",
        description: "Logo, colours and assets",
        href: "/brand",
        Icon: SwatchesIcon,
      },
      {
        title: "Release Notes",
        description: "What's new on the site",
        href: "/releases",
        Icon: RocketIcon,
      },
    ],
    feature: {
      title: "Bitcoin Deepa Card",
      caption: "Tap. Pay. Done.",
      href: "/#card",
      Art: YakaArt,
    },
  },
];

export const NAV_LINKS = [
  { label: "News", href: "/news" },
  { label: "FAQ", href: "/#faq" },
];
