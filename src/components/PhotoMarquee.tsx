import Image from "next/image";

// Endless, slowly moving strip of customer photos. Pauses on hover.
export default function PhotoMarquee({ photos, alt }: { photos: string[]; alt: string }) {
  const loop = [...photos, ...photos];
  return (
    <div className="marquee overflow-hidden" aria-label={alt}>
      <div className="marquee-track flex w-max gap-3">
        {loop.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative aspect-[4/5] w-52 shrink-0 overflow-hidden md:w-64"
            aria-hidden={i >= photos.length}
          >
            <Image
              src={src}
              alt={i < photos.length ? alt : ""}
              fill
              sizes="16rem"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
