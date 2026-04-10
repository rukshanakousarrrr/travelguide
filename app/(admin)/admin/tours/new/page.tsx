import { TourForm } from "./TourForm";

export default function NewTourPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#111]">Create New Tour</h1>
        <p className="text-sm text-[#7A746D] mt-0.5">
          Fill in the details below to create a new tour listing.
        </p>
      </div>
      <TourForm />
    </div>
  );
}
