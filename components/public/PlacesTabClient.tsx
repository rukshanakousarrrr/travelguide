"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";

type Place = {
  id: string;
  name: string;
  subtitle: string | null;
  imageUrl: string | null;
  linkQuery: string | null;
};

type Destination = {
  id: string;
  name: string;
  places: Place[];
};

interface Props {
  destinations: Destination[];
  defaultId: string;
}

export function PlacesTabClient({ destinations, defaultId }: Props) {
  const [activeId, setActiveId] = useState(defaultId);
  const activeDest = destinations.find((d) => d.id === activeId) ?? destinations[0];

  return (
    <div className="flex flex-col lg:flex-row gap-0 bg-white rounded-2xl border border-[#E4E0D9] overflow-hidden shadow-sm">

      {/* ── Left sidebar: Destinations ── */}
      <div className="lg:w-52 xl:w-60 shrink-0 border-b lg:border-b-0 lg:border-r border-[#E4E0D9]">
        <div className="p-3 lg:p-4">
          <p className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest mb-3 px-2">
            Destinations
          </p>
          <ul className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0">
            {destinations.map((dest) => {
              const isActive = dest.id === activeId;
              return (
                <li key={dest.id} className="shrink-0 lg:shrink">
                  <button
                    onClick={() => setActiveId(dest.id)}
                    className={[
                      "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-left transition-all whitespace-nowrap lg:whitespace-normal",
                      isActive
                        ? "bg-[#FFF0F2] text-[#C41230]"
                        : "text-[#545454] hover:bg-[#F8F7F5] hover:text-[#111]",
                    ].join(" ")}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C41230] shrink-0" />
                    )}
                    {!isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-transparent shrink-0" />
                    )}
                    {dest.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ── Right panel: Places grid ── */}
      <div className="flex-1 p-5 lg:p-6">
        {activeDest.places.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-sm text-[#A8A29E]">
            No places added yet for {activeDest.name}.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-3">
            {activeDest.places.map((place) => (
              <Link
                key={place.id}
                href={`/tours?q=${encodeURIComponent(place.linkQuery ?? place.name)}`}
                className="group flex items-center gap-3 py-2.5 border-b border-[#F0EDE9] last:border-b-0 hover:border-[#C41230]/30 transition-colors"
              >
                {/* Thumbnail or placeholder */}
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#F8F7F5] border border-[#E4E0D9]">
                  {place.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="size-5 text-[#D6D3CF]" />
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-[#111] group-hover:text-[#C41230] transition-colors truncate leading-snug">
                    {place.name}
                  </p>
                  {place.subtitle && (
                    <p className="text-xs text-[#7A746D] truncate leading-snug mt-0.5">
                      {place.subtitle}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
