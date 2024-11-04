import { Switch } from "@headlessui/react";

import React from "react";

export default function SwitchToggle({ enabled, handleEnabled }) {
  return (
    <Switch
      checked={enabled}
      onChange={handleEnabled}
      className={`${enabled ? "bg-secondary" : "bg-gray-400"}
            relative inline-flex items-center h-[15px] w-[27px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
    >
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-3" : "translate-x-0"}
              pointer-events-none inline-block h-[11px] w-[11px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}
