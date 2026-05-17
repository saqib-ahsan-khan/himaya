"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { APPROVED_CATEGORIES } from "@/lib/articles";

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "All";

  const setCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const query = params.toString();
    router.push(query ? `/fca-insights?${query}` : "/fca-insights", { scroll: false });
  };

  const pills = ["All", ...APPROVED_CATEGORIES];

  return (
    <div className="sticky top-[65px] z-40 border-b border-metallicGold/10 bg-white/95 py-3 backdrop-blur-[16px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="shrink-0 text-[0.8rem] text-slateText">Filter by topic:</p>
        <div className="-mx-1 flex gap-2 overflow-x-auto pb-1 sm:justify-end">
          {pills.map((pill) => {
            const selected = active === pill;
            return (
              <button
                key={pill}
                type="button"
                onClick={() => setCategory(pill)}
                className={`shrink-0 cursor-pointer rounded-full border px-[0.85rem] py-[0.28rem] font-subheading text-[0.78rem] transition duration-200 ${
                  selected
                    ? "border-deepNavy bg-deepNavy font-semibold text-white"
                    : "border-deepNavy/[0.12] bg-transparent text-slateText hover:border-metallicGold hover:text-metallicGold"
                }`}
              >
                {pill}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
