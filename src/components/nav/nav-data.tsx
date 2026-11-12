import type { ComponentType } from "react";
import {
  ArrowRightLeft,
  BookOpen,
  CalendarDays,
  GraduationCap,
  History,
  Languages,
  Palette,
} from "lucide-react";
import { TelegramIcon } from "../icons";

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

export interface NavMenu {
  id: string;
  label: string;
  items: NavLinkItem[];
  /** Footer line inside the panel (e.g. a "see all" link). */
  footer?: { label: string; href: string; external?: boolean };
}

export const NAV_MENUS: NavMenu[] = [
  {
    id: "learn",
    label: "Learn",
    items: [
      {
        title: "Bitcoin Deepa Blog",
        description: "Guides and explainers to start your Bitcoin journey",
        href: "https://blog.bitcoindeepa.com",
        Icon: BookOpen,
        external: true,
      },
      {
        title: "Ceylon Cash Blog",
        description: "Bitcoin topics explained in Sinhala",
        href: "https://blog.ceyloncash.com",
        Icon: Languages,
        external: true,
      },
    ],
  },
  {
    id: "community",
    label: "Community",
    items: [
      {
        title: "Events & Meetups",
        description: "Meet Bitcoiners across Sri Lanka",
        href: "https://lu.ma/bitcoindeepa",
        Icon: CalendarDays,
        external: true,
      },
      {
        title: "Telegram Community",
        description: "Ask questions and chat with the community",
        href: TELEGRAM_INVITE,
        Icon: TelegramIcon,
        external: true,
        lead: true,
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    items: [
      {
        title: "Learning Hub",
        description: "Curated resources for every level",
        href: "https://blog.bitcoindeepa.com/resources/",
        Icon: GraduationCap,
        external: true,
      },
      {
        title: "Satoshi Converter",
        description: "Sats to LKR, USD and BTC at live rates",
        href: "/satoshi-to-usd-and-lkr-converter",
        Icon: ArrowRightLeft,
      },
      {
        title: "Brand Guidelines",
        description: "Logo, colours and downloadable assets",
        href: "/brand",
        Icon: Palette,
      },
      {
        title: "Release Notes",
        description: "What's new on the site and the bot",
        href: "/releases",
        Icon: History,
      },
    ],
  },
];

export const NAV_LINKS = [{ label: "FAQ", href: "/#faq" }];
