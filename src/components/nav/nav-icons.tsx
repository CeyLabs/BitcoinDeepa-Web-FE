import type { ReactNode, SVGProps } from "react";

// Duotone menu icons, designed in Figma: solid Satoshi Orange plus Paper
// Wallet Cream on a 96-unit grid. Inline so they need no extra requests.
const O = "#F7931A";
const C = "#F5EFE6";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

function Svg({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden focusable="false" {...props}>
      {children}
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 20C26 20 38 24 48 30C58 24 70 20 84 20C86.2 20 88 21.8 88 24V74C88 76.2 86.2 78 84 78C70 78 58 80 48 84C38 80 26 78 12 78C9.8 78 8 76.2 8 74V24C8 21.8 9.8 20 12 20Z" fill={O} />
      <path d="M18 16C29 16.5 38 20 46 25V75C37 70.5 27 68 16 68V18C16 16.9 16.9 16 18 16Z" fill={C} />
      <path d="M78 16C67 16.5 58 20 50 25V75C59 70.5 69 68 80 68V18C80 16.9 79.1 16 78 16Z" fill={C} />
      <path d="M64 18.5C68 17.3 72 16.5 76 16.2V46L70 42L64 46V18.5Z" fill={O} />
    </Svg>
  );
}

export function TranslateIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 12H56C64 12 68 16 68 24V48C68 56 64 60 56 60H32L16 72V60C10.6667 58.6667 8 54.6667 8 48V24C8 16 12 12 20 12Z" fill={O} />
      <path d="M44 36H76C84 36 88 40 88 48V64C88 70.6667 85.3333 74.6667 80 76V88L64 76H44C36 76 32 72 32 64V48C32 40 36 36 44 36Z" fill={C} />
      <circle cx="52" cy="56" r="4" fill={O} />
      <circle cx="68" cy="56" r="4" fill={O} />
    </Svg>
  );
}

export function PeopleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="24" cy="28" r="12" fill={C} />
      <path d="M24 44C14 44 8 51 8 61V68C8 70 10 72 12 72H36C38 72 40 70 40 68V61C40 51 34 44 24 44Z" fill={C} />
      <circle cx="72" cy="28" r="12" fill={C} />
      <path d="M72 44C62 44 56 51 56 61V68C56 70 58 72 60 72H84C86 72 88 70 88 68V61C88 51 82 44 72 44Z" fill={C} />
      <circle cx="48" cy="36" r="14" fill={O} />
      <path d="M48 54C33 54 24 63 24 76V80C24 82 26 84 28 84H68C70 84 72 82 72 80V76C72 63 63 54 48 54Z" fill={O} />
    </Svg>
  );
}

/** A flag planted on a hill: a milestone in our story (About Us). */
export function FlagIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M36 12C44 6 53 7 62 12C69 16 75 16 81 13C83 12 84 14 84 16V40C84 42 83 43 81 44C74 47 67 46 59 42C51 38 44 37 36 42V12Z" fill={O} />
      <path d="M32 8C34.2 8 36 9.8 36 12V76H28V12C28 9.8 29.8 8 32 8Z" fill={C} />
      <path d="M12 88C9 88 7.2 85.5 8.3 82.7C14 68 29 60 48 60C67 60 82 68 87.7 82.7C88.8 85.5 87 88 84 88H12Z" fill={C} />
    </Svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M72 20H24C17.3726 20 12 25.3726 12 32V76C12 82.6274 17.3726 88 24 88H72C78.6274 88 84 82.6274 84 76V32C84 25.3726 78.6274 20 72 20Z" fill={C} />
      <path d="M24 20H72C78.6274 20 84 25.3726 84 32V44H12V32C12 25.3726 17.3726 20 24 20Z" fill={O} />
      <rect x="28" y="8" width="8" height="24" rx="4" fill={O} />
      <rect x="60" y="8" width="8" height="24" rx="4" fill={O} />
      <rect x="24" y="56" width="20" height="20" rx="4" fill={O} />
    </Svg>
  );
}

export function CapIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M24 43H72V62C72 68 61 75 48 75C35 75 24 68 24 62V43Z" fill={C} />
      <path d="M45.5 19.5C47.1 18.8 48.9 18.8 50.5 19.5L88 35.2C90.7 36.3 90.7 39.7 88 40.8L50.5 56.5C48.9 57.2 47.1 57.2 45.5 56.5L8 40.8C5.3 39.7 5.3 36.3 8 35.2L45.5 19.5Z" fill={O} />
      <path d="M81 41L87 38.5V61L90 72.5C90.6 74.8 89.3 77 87 77H81C78.7 77 77.4 74.8 78 72.5L81 61V41Z" fill={C} />
    </Svg>
  );
}

export function SwapIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 22H56V15C56 12 59 11 61 13L83 28C85 29 85 31 83 32L61 47C59 49 56 48 56 45V38H20C15.6 38 12 34.4 12 30C12 25.6 15.6 22 20 22Z" fill={O} />
      <path d="M76 58H40V51C40 48 37 47 35 49L13 64C11 65 11 67 13 68L35 83C37 85 40 84 40 81V74H76C80.4 74 84 70.4 84 66C84 61.6 80.4 58 76 58Z" fill={C} />
    </Svg>
  );
}

export function SwatchesIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M85.9258 48.3301L80.9258 39.6699C78.9928 36.3218 74.7117 35.1747 71.3636 37.1077L17.67 68.1077C14.322 70.0407 13.1749 74.3218 15.1079 77.6699L20.1079 86.3301C22.0408 89.6782 26.322 90.8253 29.67 88.8923L83.3636 57.8923C86.7117 55.9593 87.8588 51.6782 85.9258 48.3301Z" fill={C} />
      <path d="M64.3303 23.0744L55.6701 18.0744C52.322 16.1414 48.0409 17.2885 46.1079 20.6366L15.1079 74.3301C13.1749 77.6782 14.322 81.9593 17.6701 83.8923L26.3303 88.8923C29.6784 90.8253 33.9595 89.6782 35.8925 86.3301L66.8925 32.6366C68.8255 29.2885 67.6784 25.0074 64.3303 23.0744Z" fill={C} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 8H33C37.6667 8 40 10.3333 40 15V81C40 85.6667 37.6667 88 33 88H23C18.3333 88 16 85.6667 16 81V15C16 10.3333 18.3333 8 23 8ZM34 76C34 72.6863 31.3137 70 28 70C24.6863 70 22 72.6863 22 76C22 79.3137 24.6863 82 28 82C31.3137 82 34 79.3137 34 76Z"
        fill={O}
      />
      <circle cx="28" cy="76" r="3" fill={O} />
    </Svg>
  );
}

export function RocketIcon(props: IconProps) {
  // The rocket is narrow, so its frame is cropped to match the set's weight.
  return (
    <Svg viewBox="2 4 82 82" {...props}>
      <path d="M35.0266 69.3705L48.5496 72.994C48.6697 80.2731 42.9942 85.9993 36.8705 89.5348C33.335 83.4111 31.283 75.6143 35.0266 69.3705Z" fill={O} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.5853 25.5757L64.7675 31.7873L58.5558 54.9695L65.8163 70.3736C66.2878 71.1901 66.2646 72.5642 65.747 74.4961L63.9353 81.2576C63.5902 82.5455 62.8599 82.6949 61.7446 81.7059L50.551 69.3891L35.0962 65.248L19.2439 70.3178C17.7834 70.6167 17.2257 70.1222 17.5708 68.8343L19.3826 62.0728C19.9002 60.1409 20.5673 58.9393 21.3838 58.4679L35.3736 48.7579L41.5853 25.5757ZM56.3144 44.0162C57.3151 40.2815 55.0989 36.4434 51.3646 35.443C47.6304 34.4425 43.7918 36.6585 42.7914 40.3927C41.791 44.127 44.0069 47.9655 47.7412 48.9659C51.4754 49.9664 55.314 47.7504 56.3144 44.0162Z"
        fill={C}
      />
      <path d="M41.5853 25.5757C44.6218 18.1071 50.2972 12.3809 56.4209 8.84533C58.0539 7.90252 59.3418 8.24761 60.2847 9.8806C63.8202 16.0043 65.8722 23.8011 64.7675 31.7873L41.5853 25.5757Z" fill={O} />
    </Svg>
  );
}

/** Telegram's paper plane, cream on an orange disc, to sit with the set. */
export function TelegramDuoIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="48" cy="48" r="40" fill={O} />
      <path
        d="M22.4 46.9L67.3 29.6C69.4 28.8 71.2 30.1 70.5 33.3L62.9 69.2C62.3 71.7 60.8 72.4 58.7 71.2L47.1 62.6L41.5 68C40.9 68.6 40.3 69.2 39.2 69.2L40 57.4L61.5 38C62.4 37.2 61.3 36.7 60.1 37.5L33.5 54.2L22.1 50.6C19.6 49.8 19.6 48.1 22.4 46.9Z"
        fill={C}
      />
    </Svg>
  );
}
