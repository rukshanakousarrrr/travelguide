import { MapPin } from "lucide-react";
import { PlacesTabClient } from "./PlacesTabClient";

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
}

export function PlacesToSee({ destinations }: Props) {
  if (destinations.length === 0) return null;

  return (
    <section className="py-16 bg-[#F8F7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-[#C41230] text-xs font-bold tracking-widest uppercase mb-2">
            Explore by Destination
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111]">
            Places to see
          </h2>
        </div>

        <PlacesTabClient destinations={destinations} defaultId={destinations[0].id} />

        <p className="text-xs text-[#A8A29E] mt-6 flex items-center gap-1.5">
          <MapPin className="size-3.5" />
          Showing destinations where we operate tours
        </p>
      </div>
    </section>
  );
}
