
export default function ReceptionAssistantIA() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Assistant IA - Réception
            </h3>

            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Gestion intelligente du flux des patients
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 dark:bg-emerald-500/10">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
              IA Active
            </span>
          </div>
        </div>

        {/* IA Main Card */}
        <div className="mt-6 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 dark:border-blue-900/40 dark:from-blue-900/10 dark:to-indigo-900/10">

          <div className="flex items-start gap-4">
            
            {/* Avatar IA */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500 text-2xl shadow-lg">
              🤖
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                Assistant de coordination hospitalière
              </p>

              <div className="mt-4 rounded-2xl bg-white/70 p-4 dark:bg-white/[0.03]">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Recommandation IA
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  Réorientez les nouvelles admissions non urgentes vers le
                  guichet secondaire afin de réduire le temps d’attente estimé
                  de <span className="font-semibold text-blue-600">18%</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Patients */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Patients en attente
            </p>

            <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
              12
            </h4>

            <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
              Temps moyen : 14 min
            </p>
          </div>

          {/* Urgences */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Cas prioritaires
            </p>

            <h4 className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">
              2
            </h4>

            <p className="mt-1 text-xs text-red-500">
              Prise en charge immédiate
            </p>
          </div>

          {/* Satisfaction */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Fluidité d’accueil
            </p>

            <h4 className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              92%
            </h4>

            <p className="mt-1 text-xs text-emerald-500">
              Activité stable
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mx-auto mt-6 max-w-[600px] text-center text-sm leading-6 text-gray-500 dark:text-gray-400">
          L’assistant IA analyse en temps réel les admissions, les urgences,
          les disponibilités médicales et la charge des services afin
          d’aider la réception à maintenir une circulation fluide des patients.
        </p>
      </div>

      {/* Bottom Stats */}
      <div className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="text-center sm:text-left">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Admissions aujourd’hui
          </p>

          <p className="mt-1 text-lg font-semibold text-gray-800 dark:text-white/90">
            48 patients
          </p>
        </div>

        <div className="hidden h-10 w-px bg-gray-200 dark:bg-gray-800 sm:block"></div>

        <div className="text-center sm:text-left">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Rendez-vous confirmés
          </p>

          <p className="mt-1 text-lg font-semibold text-gray-800 dark:text-white/90">
            31
          </p>
        </div>

        <div className="hidden h-10 w-px bg-gray-200 dark:bg-gray-800 sm:block"></div>

        <div className="text-center sm:text-left">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Temps moyen d’attente
          </p>

          <p className="mt-1 text-lg font-semibold text-gray-800 dark:text-white/90">
            14 min
          </p>
        </div>
      </div>
    </div>
  );
}
