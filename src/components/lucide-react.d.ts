declare module "lucide-react" {
  import type { ComponentType, SVGProps } from "react"
  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: number | string
    absoluteStrokeWidth?: boolean
  }
  export type LucideIcon = ComponentType<LucideProps>
  export const Bitcoin: LucideIcon
  export const BitcoinIcon: LucideIcon
  export const Menu: LucideIcon
  export const X: LucideIcon
  export const Star: LucideIcon
  export const ChevronDown: LucideIcon
  export const ChevronUp: LucideIcon
  export const ChevronRight: LucideIcon
  export const ChevronLeft: LucideIcon
  export const ExternalLink: LucideIcon
  export const BookOpen: LucideIcon
  export const Users: LucideIcon
  export const Wallet: LucideIcon
  export const Globe: LucideIcon
  export const Shield: LucideIcon
  export const Twitter: LucideIcon
  export const Instagram: LucideIcon
  export const Youtube: LucideIcon
  export const MessageCircle: LucideIcon
  export const Rocket: LucideIcon
  export const ArrowRight: LucideIcon
  export const ArrowLeft: LucideIcon
  export const Clock: LucideIcon
  export const MapPin: LucideIcon
  export const Calendar: LucideIcon
  export const Info: LucideIcon
  export const Award: LucideIcon
  export const ShoppingCart: LucideIcon
  export const Quote: LucideIcon
  export const AlignLeft: LucideIcon
  export const List: LucideIcon
  export const Ellipsis: LucideIcon
  export const Check: LucideIcon
  export const Circle: LucideIcon
  export const Search: LucideIcon
  export const PanelLeft: LucideIcon
  export const GripVertical: LucideIcon
  export const Dot: LucideIcon
}
