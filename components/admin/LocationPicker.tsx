"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Country, State, City, ICountry, IState, ICity } from "country-state-city";
import { ChevronDown, Search, X, MapPin, Globe, Map } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface LocationPickerProps {
  country:       string;
  state:         string;
  city:          string;
  onCountryChange: (value: string, label: string) => void;
  onStateChange:   (value: string, label: string) => void;
  onCityChange:    (value: string) => void;
}

// ── Searchable dropdown ──────────────────────────────────────────────────────

function SearchableSelect({
  label,
  icon: Icon,
  placeholder,
  value,
  options,
  onChange,
  disabled = false,
  required = false,
}: {
  label:       string;
  icon:        typeof Globe;
  placeholder: string;
  value:       string;
  options:     { value: string; label: string; extra?: string }[];
  onChange:     (value: string, label: string) => void;
  disabled?:   boolean;
  required?:   boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const filtered = useMemo(() => {
    if (!query) return options.slice(0, 100); // Show first 100 by default
    const q = query.toLowerCase();
    return options.filter(
      (o) => o.label.toLowerCase().includes(q) || o.extra?.toLowerCase().includes(q)
    ).slice(0, 100);
  }, [options, query]);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm font-medium text-[#111] mb-1.5">
        {label} {required && <span className="text-[#C41230]">*</span>}
      </label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => { setOpen(!open); setQuery(""); }}
        className={`w-full h-10 px-3 rounded-lg border text-sm text-left flex items-center gap-2 transition-colors ${
          disabled
            ? "bg-[#F8F7F5] border-[#E4E0D9] text-[#A8A29E] cursor-not-allowed"
            : open
            ? "border-[#C41230] ring-2 ring-[#C41230]/20 bg-white"
            : "border-[#E4E0D9] bg-white hover:border-[#C8C4BB]"
        }`}
      >
        <Icon size={14} className="text-[#A8A29E] flex-shrink-0" />
        <span className={`flex-1 truncate ${selectedLabel ? "text-[#111]" : "text-[#A8A29E]"}`}>
          {selectedLabel || placeholder}
        </span>
        {value && !disabled ? (
          <span
            onClick={(e) => { e.stopPropagation(); onChange("", ""); }}
            className="p-0.5 hover:bg-[#F1EFE9] rounded transition-colors"
          >
            <X size={12} className="text-[#A8A29E]" />
          </span>
        ) : (
          <ChevronDown size={14} className={`text-[#A8A29E] transition-transform ${open ? "rotate-180" : ""}`} />
        )}
      </button>

      {open && !disabled && (
        <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white rounded-xl border border-[#E4E0D9] shadow-xl overflow-hidden animate-fade-in">
          {/* Search */}
          <div className="p-2 border-b border-[#E4E0D9]">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${label.toLowerCase()}…`}
                className="w-full h-8 pl-7 pr-3 rounded-lg border border-[#E4E0D9] text-xs text-[#111] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#C41230]"
              />
            </div>
          </div>

          {/* Options */}
          <div className="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="py-6 text-center text-xs text-[#A8A29E]">No results found</div>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onChange(opt.value, opt.label); setOpen(false); setQuery(""); }}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-[#F8F7F5] transition-colors ${
                    opt.value === value ? "bg-[#F8F7F5] font-medium text-[#C41230]" : "text-[#111]"
                  }`}
                >
                  <span className="truncate">
                    {opt.extra && <span className="mr-1.5">{opt.extra}</span>}
                    {opt.label}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export function LocationPicker({
  country, state, city,
  onCountryChange, onStateChange, onCityChange,
}: LocationPickerProps) {
  const countries = useMemo(() =>
    Country.getAllCountries().map((c: ICountry) => ({
      value: c.isoCode,
      label: c.name,
      extra: c.flag,
    })),
    []
  );

  const states = useMemo(() => {
    if (!country) return [];
    return State.getStatesOfCountry(country).map((s: IState) => ({
      value: s.isoCode,
      label: s.name,
      extra: undefined,
    }));
  }, [country]);

  const cities = useMemo(() => {
    if (!country) return [];
    if (state) {
      return City.getCitiesOfState(country, state).map((c: ICity) => ({
        value: c.name,
        label: c.name,
        extra: undefined,
      }));
    }
    return City.getCitiesOfCountry(country)?.map((c: ICity) => ({
      value: c.name,
      label: c.name,
      extra: undefined,
    })) ?? [];
  }, [country, state]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SearchableSelect
        label="Country"
        icon={Globe}
        placeholder="Select country"
        value={country}
        options={countries}
        onChange={(val, label) => {
          onCountryChange(val, label);
          onStateChange("", "");
          onCityChange("");
        }}
        required
      />
      <SearchableSelect
        label="State / Region"
        icon={Map}
        placeholder={country ? "Select state" : "Select country first"}
        value={state}
        options={states}
        onChange={(val, label) => {
          onStateChange(val, label);
          onCityChange("");
        }}
        disabled={!country || states.length === 0}
      />
      <SearchableSelect
        label="City"
        icon={MapPin}
        placeholder={country ? "Select city" : "Select country first"}
        value={city}
        options={cities}
        onChange={(val) => onCityChange(val)}
        disabled={!country}
      />
    </div>
  );
}
