"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSection {
  category: string;
  icon: string;
  items: FaqItem[];
}

interface Props {
  sections: FaqSection[];
}

export function FaqClient({ sections }: Props) {
  // key = "sectionIdx-itemIdx"
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (key: string) => setOpen((prev) => (prev === key ? null : key));

  return (
    <div className="space-y-10">
      {sections.map((section, si) => (
        <div key={section.category}>
          {/* Section heading */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">{section.icon}</span>
            <h2 className="font-display text-xl font-bold text-[#111]">{section.category}</h2>
          </div>

          {/* Items */}
          <div className="divide-y divide-[#E4E0D9] border border-[#E4E0D9] rounded-2xl overflow-hidden">
            {section.items.map((item, ii) => {
              const key = `${si}-${ii}`;
              const isOpen = open === key;
              return (
                <div key={key} className="bg-white">
                  <button
                    onClick={() => toggle(key)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#F8F7F5] transition-colors"
                  >
                    <span className="text-[15px] font-semibold text-[#111] leading-snug">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-5 text-[#7A746D] shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Answer — animated height via max-height trick */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-96" : "max-h-0"
                    )}
                  >
                    <p className="px-6 pb-5 text-[14px] text-[#7A746D] leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Still have questions CTA */}
      <div className="mt-12 rounded-2xl bg-[#F8F9FF] border border-[#E4E0D9] p-8 text-center">
        <h3 className="font-display text-xl font-bold text-[#111] mb-2">
          Still have questions?
        </h3>
        <p className="text-[#7A746D] text-sm mb-5">
          Our team is available 7 days a week and typically replies within a few hours.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="mailto:hello@gotripjapan.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#185FA5] text-white text-sm font-bold hover:bg-[#0C447C] transition-colors shadow-sm"
          >
            Email us
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#E4E0D9] bg-white text-[#111] text-sm font-semibold hover:border-[#185FA5] hover:text-[#185FA5] transition-colors"
          >
            Contact form
          </a>
        </div>
      </div>
    </div>
  );
}
