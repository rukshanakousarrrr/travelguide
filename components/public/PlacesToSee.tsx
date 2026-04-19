import { MapPin, Globe } from "lucide-react";
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
    <section className="py-20 bg-[#F8F9FF]" id="places-to-see">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="size-4 text-[#185FA5]" />
            <span className="text-[#185FA5] text-xs font-bold tracking-widest uppercase">
              Explore by Destination
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111]">
            Places to see
          </h2>
        </div>

        <PlacesTabClient destinations={destinations} defaultId={destinations[0].id} />

        <p className="text-xs text-[#A8A29E] mt-8 flex items-center gap-1.5">
          <MapPin className="size-3.5" />
          Showing destinations where we operate tours
        </p>
      </div>
    </section>
  );
}
