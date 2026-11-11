export const KIT = "/assets/brand/kit";

export const ZIP_ALL = "/assets/brand/bitcoindeepa-brand-assets.zip";
export const ZIP_SVG = "/assets/brand/bitcoindeepa-brand-svg.zip";
export const ZIP_PNG = "/assets/brand/bitcoindeepa-brand-png.zip";

export const BRAND_ORANGE = "#F8931A";

export interface TocItem {
  title: string;
  id: string;
}

export const TOC_ITEMS: TocItem[] = [
  { title: "Overview", id: "brand-guidelines" },
  { title: "The idea", id: "idea" },
  { title: "Logo", id: "logo" },
  { title: "App icon", id: "app-icon" },
  { title: "Backgrounds", id: "backgrounds" },
  { title: "Clear space & size", id: "clear-space" },
  { title: "Misuse", id: "misuse" },
  { title: "Colour", id: "colour" },
  { title: "Typography", id: "typography" },
  { title: "Patterns", id: "patterns" },
  { title: "Voice", id: "voice" },
  { title: "Assets", id: "assets" },
];

/** Intrinsic sizes of the kit PNGs, so next/image can reserve space. */
export const IMG = {
  logoBlack: { src: `${KIT}/01-Primary-Logo/BDLogo_Black.png`, w: 2400, h: 3821 },
  logoWhite: { src: `${KIT}/01-Primary-Logo/BDLogo_White.png`, w: 2400, h: 3821 },
  logoBlackSvg: `${KIT}/01-Primary-Logo/BDLogo_Black.svg`,
  logoWhiteSvg: `${KIT}/01-Primary-Logo/BDLogo_White.svg`,

  sloganBlack: { src: `${KIT}/02-Logo-with-Slogan/Black_w_Slogan.png`, w: 2400, h: 3821 },
  sloganWhite: { src: `${KIT}/02-Logo-with-Slogan/White_w_Slogan.png`, w: 2400, h: 3821 },
  sloganBlackSvg: `${KIT}/02-Logo-with-Slogan/Black_w_Slogan.svg`,
  sloganWhiteSvg: `${KIT}/02-Logo-with-Slogan/White_w_Slogan.svg`,

  wordBnO: { src: `${KIT}/03-Wordmark/DeepaLogo_BnO.png`, w: 2400, h: 876 },
  wordWnO: { src: `${KIT}/03-Wordmark/DeepaLogo_WnO.png`, w: 2400, h: 876 },
  wordBnOSvg: `${KIT}/03-Wordmark/DeepaLogo_BnO.svg`,
  wordWnOSvg: `${KIT}/03-Wordmark/DeepaLogo_WnO.svg`,
  btcBlack: { src: `${KIT}/03-Wordmark/Logo_b_BTC.png`, w: 2400, h: 697 },
  btcWhite: { src: `${KIT}/03-Wordmark/Logo_w_BTC.png`, w: 2400, h: 697 },

  yaka: { src: `${KIT}/04-Yaka-Symbol/Yaka.png`, w: 2400, h: 2952 },
  yakaSvg: `${KIT}/04-Yaka-Symbol/Yaka.svg`,
  yakaBlack: { src: `${KIT}/04-Yaka-Symbol/Yaka_Black.png`, w: 2400, h: 2952 },
  yakaWhite: { src: `${KIT}/04-Yaka-Symbol/Yaka_White.png`, w: 2400, h: 2952 },
  yakaBold: { src: `${KIT}/04-Yaka-Symbol/Yaka_Bold.png`, w: 2400, h: 2952 },
  yakaBoldSvg: `${KIT}/04-Yaka-Symbol/Yaka_Bold.svg`,
  yakaHalfLeft: { src: `${KIT}/04-Yaka-Symbol/Yaka_Half_Left.png`, w: 1200, h: 2952 },
  yakaHalfLeftSvg: `${KIT}/04-Yaka-Symbol/Yaka_Half_Left.svg`,
  yakaHalfRight: { src: `${KIT}/04-Yaka-Symbol/Yaka_Half_Right.png`, w: 1200, h: 2952 },
  yakaHalfRightSvg: `${KIT}/04-Yaka-Symbol/Yaka_Half_Right.svg`,
  yakaLaser: { src: `${KIT}/04-Yaka-Symbol/Yaka_LaserEyes.png`, w: 2400, h: 2952 },
  yakaLaserSvg: `${KIT}/04-Yaka-Symbol/Yaka_LaserEyes.svg`,

  iconLight: { src: `${KIT}/05-App-Icon/AppIcon_Light.png`, w: 1024, h: 1024 },
  iconDark: { src: `${KIT}/05-App-Icon/AppIcon_Dark.png`, w: 1024, h: 1024 },
  iconSmallLight: { src: `${KIT}/05-App-Icon/AppIcon_Small_Light.png`, w: 1024, h: 1024 },
  iconSmallDark: { src: `${KIT}/05-App-Icon/AppIcon_Small_Dark.png`, w: 1024, h: 1024 },

  orangeBlack: { src: `${KIT}/06-On-Orange/BD_OrangeBG_Black.png`, w: 2400, h: 2400 },
  orangeWhite: { src: `${KIT}/06-On-Orange/BD_OrangeBG_White.png`, w: 2400, h: 2400 },

  btcPatternTile: `${KIT}/08-Patterns/Primary_Bitcoin_Pattern_Tile.png`,
  spikyLight: `${KIT}/08-Patterns/Secondary_SpikyTiles_Light.png`,
  spikyCharcoal: `${KIT}/08-Patterns/Secondary_SpikyTiles_Charcoal.png`,
} as const;

/** The staggered ₿ field, used as a quiet background texture. */
export const BTC_PATTERN_STYLE = {
  backgroundImage: `url('${IMG.btcPatternTile}')`,
  backgroundRepeat: "repeat",
  backgroundSize: "86px auto",
} as const;
