import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import { useState } from "react";

export default function ReceptionStatisticsChart() {
  const options: ApexOptions = {
    colors: ["#16a34a", "#2563eb", "#dc2626"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 320,
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 6,
        borderRadiusApplication: "end",
      },
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },

    xaxis: {
      categories: [
        "Lun",
        "Mar",
        "Mer",
        "Jeu",
        "Ven",
        "Sam",
        "Dim",
      ],

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },
    },

    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },

    yaxis: {
      title: {
        text: "Patients",
      },
    },

    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },

    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: true,
      },

      y: {
        formatter: (val: number) => `${val} patients`,
      },
    },
  };

  const series = [
    {
      name: "Patients reçus",
      data: [45, 52, 48, 61, 58, 39, 27],
    },

    {
      name: "Rendez-vous",
      data: [30, 35, 28, 42, 40, 18, 12],
    },

    {
      name: "Urgences",
      data: [5, 8, 4, 11, 7, 3, 2],
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Activité de la réception
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Flux hebdomadaire des patients et rendez-vous
          </p>
        </div>

        {/* Dropdown */}
        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>

          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Voir statistiques
            </DropdownItem>

            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Exporter rapport
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Chart */}
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2 min-h-[320px]">
          <Chart
            options={options}
            series={series}
            type="bar"
            height={320}
          />
        </div>
      </div>
    </div>
  );
}
