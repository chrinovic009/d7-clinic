import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

export default function DemographicCard() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Provenance des patients
          </h3>

          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Analyse des zones qui fréquentent le plus la clinique cette semaine.
          </p>
        </div>

        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>

          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-44 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full rounded-lg text-left font-normal text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Voir les statistiques
            </DropdownItem>

            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full rounded-lg text-left font-normal text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Exporter le rapport
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-6 space-y-5">

        {/* Commune 1 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/10">
              <div className="h-4 w-4 rounded-full bg-blue-500"></div>
            </div>

            <div>
              <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                Jolie Site
              </p>

              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                142 patients enregistrés
              </span>
            </div>
          </div>

          <div className="flex w-full max-w-[160px] items-center gap-3">
            <div className="relative h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-800">
              <div className="absolute left-0 top-0 h-full w-[82%] rounded-sm bg-blue-500"></div>
            </div>

            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
              82%
            </p>
          </div>
        </div>

        {/* Commune 2 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
              <div className="h-4 w-4 rounded-full bg-emerald-500"></div>
            </div>

            <div>
              <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                Quartier Latin
              </p>

              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                98 patients enregistrés
              </span>
            </div>
          </div>

          <div className="flex w-full max-w-[160px] items-center gap-3">
            <div className="relative h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-800">
              <div className="absolute left-0 top-0 h-full w-[64%] rounded-sm bg-emerald-500"></div>
            </div>

            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
              64%
            </p>
          </div>
        </div>

        {/* Commune 3 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/10">
              <div className="h-4 w-4 rounded-full bg-orange-500"></div>
            </div>

            <div>
              <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                Mutoshi
              </p>

              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                74 patients enregistrés
              </span>
            </div>
          </div>

          <div className="flex w-full max-w-[160px] items-center gap-3">
            <div className="relative h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-800">
              <div className="absolute left-0 top-0 h-full w-[48%] rounded-sm bg-orange-500"></div>
            </div>

            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
              48%
            </p>
          </div>
        </div>

        {/* Commune 4 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-500/10">
              <div className="h-4 w-4 rounded-full bg-rose-500"></div>
            </div>

            <div>
              <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                Cité
              </p>

              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                51 patients enregistrés
              </span>
            </div>
          </div>

          <div className="flex w-full max-w-[160px] items-center gap-3">
            <div className="relative h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-800">
              <div className="absolute left-0 top-0 h-full w-[35%] rounded-sm bg-rose-500"></div>
            </div>

            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
              35%
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER IA */}
      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-900/10">
        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
          Assistant IA réception
        </p>

        <p className="mt-2 text-sm leading-6 text-blue-600 dark:text-blue-200">
          Le quartier de <span className="font-semibold">Jolie Site</span> représente actuellement la plus forte fréquentation avec une hausse de 18% depuis la semaine dernière. Prévoir une augmentation des admissions entre 08h00 et 11h00.
        </p>
      </div>
    </div>
  );
}