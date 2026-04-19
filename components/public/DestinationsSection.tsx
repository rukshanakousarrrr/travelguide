import Link from "next/link";

const DESTINATIONS = [
  { name: "Tokyo",     image: "/asstes/hero-tokyo.png",  query: "Tokyo"     },
  { name: "Kyoto",     image: "/asstes/hero-kyoto.png",  query: "Kyoto"     },
  { name: "Osaka",     image: "/asstes/hero-fuji.png",   query: "Osaka"     },
  { name: "Mt. Fuji",  image: "/asstes/hero-fuji.png",   query: "Mt. Fuji"  },
  { name: "Nara",      image: "/asstes/hero-kyoto.png",  query: "Nara"      },
  { name: "Hiroshima", image: "/asstes/hero-tokyo.png",  query: "Hiroshima" },
];

export function DestinationsSection() {
  return (
    <section className="py-8 border-b border-[#e8e8e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[20px] font-bold text-[#111] mb-4">
          Things to do wherever you&apos;re going
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {DESTINATIONS.map((dest) => (
            <Link
              key={dest.name}
              href={`/tours?q=${encodeURIComponent(dest.query)}`}
              className="group text-center cursor-pointer"
            >
              <div className="rounded-[10px] overflow-hidden h-27.5 mb-2 group-hover:opacity-85 transition-opacity">
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[13px] font-semibold text-[#111] group-hover:text-[#185FA5] transition-colors">
                {dest.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
