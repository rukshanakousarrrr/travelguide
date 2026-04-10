"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CalendarDays, Users, MapPin } from "lucide-react";

const POPULAR = ["Tokyo", "Kyoto", "Osaka", "Mt. Fuji", "Nara", "Hiroshima"];

export function SearchBar() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [date, setDate]               = useState("");
  const [guests, setGuests]           = useState(2);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination.trim()) params.set("q", destination.trim());
    if (date)               params.set("date", date);
    if (guests > 1)         params.set("guests", String(guests));
    router.push(`/tours${params.toString() ? `?${params}` : ""}`);
  }

  function pickDestination(place: string) {
    setDestination(place);
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main search bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden border border-border"
      >
        {/* Destination */}
        <label className="flex-1 flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-border cursor-text">
          <MapPin className="size-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-foreground mb-0.5">Destination</div>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Tokyo, Kyoto, Osaka…"
              className="w-full text-sm text-foreground placeholder:text-subtle bg-transparent outline-none"
            />
          </div>
        </label>

        {/* Date */}
        <label className="flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-border cursor-pointer md:w-52">
          <CalendarDays className="size-5 text-primary shrink-0" />
          <div className="flex-1">
            <div className="text-xs font-semibold text-foreground mb-0.5">Travel Date</div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full text-sm text-foreground bg-transparent outline-none cursor-pointer"
            />
          </div>
        </label>

        {/* Guests */}
        <div className="flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-border md:w-44">
          <Users className="size-5 text-primary shrink-0" />
          <div className="flex-1">
            <div className="text-xs font-semibold text-foreground mb-0.5">Guests</div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-surface transition-colors text-sm font-bold"
              >
                −
              </button>
              <span className="text-sm font-medium w-6 text-center">{guests}</span>
              <button
                type="button"
                onClick={() => setGuests(Math.min(20, guests + 1))}
                className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-surface transition-colors text-sm font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-colors"
        >
          <Search className="size-4" />
          Search
        </button>
      </form>

      {/* Popular searches */}
      <div className="flex flex-wrap items-center gap-2 mt-4 justify-center">
        <span className="text-white/50 text-xs font-medium">Popular:</span>
        {POPULAR.map((place) => (
          <button
            key={place}
            type="button"
            onClick={() => pickDestination(place)}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium transition-colors backdrop-blur-sm"
          >
            {place}
          </button>
        ))}
      </div>
    </div>
  );
}
