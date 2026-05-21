import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import flatpickr from "flatpickr";
import { CalenderIcon } from "../../icons";

const rangeOptions = [
  { key: "today", label: "Aujourd'hui" },
  { key: "week", label: "Semaine" },
  { key: "month", label: "Mois" },
  { key: "year", label: "Année" },
] as const;

type RangeKey = (typeof rangeOptions)[number]["key"];

const chartData: Record<
  RangeKey,
  {
    categories: string[];
    series: { name: string; data: number[] }[];
  }
> = {
  today: {
    categories: ["08h", "10h", "12h", "14h", "16h", "18h"],
    series: [
      {
        name: "Patients enregistrés",
        data: [4, 7, 10, 8, 11, 6],
      },
      {
        name: "Patients reçus",
        data: [2, 5, 8, 7, 9, 5],
      },
    ],
  },

  week: {
    categories: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    series: [
      {
        name: "Admissions",
        data: [24, 31, 28, 36, 40, 22, 18],
      },
      {
        name: "Consultations",
        data: [18, 24, 22, 29, 34, 17, 12],
      },
    ],
  },

  month: {
    categories: ["S1", "S2", "S3", "S4"],
    series: [
      {
        name: "Admissions",
        data: [120, 145, 132, 168],
      },
      {
        name: "Consultations",
        data: [90, 110, 102, 140],
      },
    ],
  },

  year: {
    categories: [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Août",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ],
    series: [
      {
        name: "Admissions",
        data: [420, 460, 510, 540, 600, 680, 720, 690, 710, 760, 810, 845],
      },
      {
        name: "Consultations",
        data: [320, 350, 390, 420, 470, 520, 560, 540, 575, 620, 660, 700],
      },
    ],
  },
};

export default function StatisticsChart() {
  const datePickerRef = useRef<HTMLInputElement>(null);

  const [selectedRange, setSelectedRange] =
    useState<RangeKey>("month");

  useEffect(() => {
    if (!datePickerRef.current) return;

    const today = new Date();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    const fp = flatpickr(datePickerRef.current, {
      mode: "range",
      static: true,
      monthSelectorType: "static",
      dateFormat: "M d",
      defaultDate: [sevenDaysAgo, today],

      clickOpens: true,

      prevArrow:
        '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',

      nextArrow:
        '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    });

    return () => {
      if (!Array.isArray(fp)) {
        fp.destroy();
      }
    };
  }, []);

  const { categories, series } = chartData[selectedRange];

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",

      labels: {
        colors: ["#475569"],
      },
    },

    colors: ["#0078D7", "#34D399"],

    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 340,
      type: "area",

      toolbar: {
        show: false,
      },
    },

    stroke: {
      curve: "smooth",
      width: [3, 3],
    },

    fill: {
      type: "gradient",

      gradient: {
        opacityFrom: 0.45,
        opacityTo: 0.05,
      },
    },

    markers: {
      size: 0,

      hover: {
        size: 6,
      },
    },

    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },

      yaxis: {
        lines: {
          show: true,
        },
      },
    },

    dataLabels: {
      enabled: false,
    },

    tooltip: {
      enabled: true,
    },

    xaxis: {
      type: "category",
      categories,

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },

      title: {
        text: "Patients",

        style: {
          fontSize: "12px",
          color: "#6B7280",
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">

      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Flux des patients
          </h3>

          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Admissions, consultations et activité de la réception
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-col gap-3 sm:items-end">

          <div className="inline-flex rounded-full bg-slate-100 p-1 dark:bg-slate-800">

            {rangeOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setSelectedRange(option.key)}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  selectedRange === option.key
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* DATE PICKER */}
          <div className="relative inline-flex items-center">

            <CalenderIcon className="pointer-events-none absolute left-1/2 top-1/2 z-10 size-5 -translate-x-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 lg:left-3" />

            <input
              ref={datePickerRef}
              className="h-10 w-10 cursor-pointer rounded-lg border border-gray-200 bg-white text-sm font-medium text-transparent outline-none dark:border-gray-700 dark:bg-gray-800 lg:h-auto lg:w-40 lg:py-2 lg:pl-10 lg:pr-3 lg:text-gray-700 dark:lg:text-gray-300"
              placeholder="Choisir une plage"
            />
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart
            options={options}
            series={series}
            type="area"
            height={340}
          />
        </div>
      </div>

      {/* FOOTER STATS */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-2xl bg-gray-50 p-4 dark:bg-white/[0.03]">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Admissions aujourd’hui
          </p>

          <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
            48
          </h4>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4 dark:bg-white/[0.03]">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Temps moyen d’attente
          </p>

          <h4 className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400">
            14 min
          </h4>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4 dark:bg-white/[0.03]">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Capacité actuelle
          </p>

          <h4 className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            82%
          </h4>
        </div>
      </div>
    </div>
  );
}