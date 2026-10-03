"use client";

import { useState } from "react";

// On phones the form stays closed behind a button; from lg up it is always shown.
export default function CollapsibleForm({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex min-h-12 w-full items-center justify-center border border-paper/30 px-5 text-sm font-medium text-paper hover:border-gold-light lg:hidden"
        >
          {label}
        </button>
      )}
      <div className={open ? "" : "hidden lg:block"}>{children}</div>
    </div>
  );
}
