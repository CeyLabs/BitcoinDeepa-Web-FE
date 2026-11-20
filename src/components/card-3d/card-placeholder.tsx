import Image from "next/image";

export const FRONT_SRC = "/images/bdfcard.png";
export const BACK_SRC = "/images/bdbcard.png";

/** Flat card shown while the 3D scene loads, or when WebGL is unavailable. */
export function CardPlaceholder() {
  return (
    <div className="flex size-full items-center justify-center">
      <Image
        src={FRONT_SRC}
        alt="Bitcoin Deepa Card"
        width={945}
        height={591}
        sizes="440px"
        priority={false}
        className="h-auto w-[66%] rounded-xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]"
      />
    </div>
  );
}
