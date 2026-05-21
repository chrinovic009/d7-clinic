import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface ReceptionRecord {
  id: number;
  patient: string;
  reason: string;
  department: string;
  doctor: string;
  arrivalTime: string;
  statusSummary: string;
  image: string;
  status: "Enregistré" | "En attente" | "Urgence";
}

const tableData: ReceptionRecord[] = [
  {
    id: 1,
    patient: "Sofia Mbaye",
    reason: "Consultation générale",
    department: "Médecine interne",
    doctor: "Dr. Ndiaye",
    arrivalTime: "08:20",
    statusSummary: "Dossier validé",
    status: "Enregistré",
    image: "/images/user/user-01.jpg",
  },
  {
    id: 2,
    patient: "Lamine Diarra",
    reason: "Douleurs thoraciques",
    department: "Urgences",
    doctor: "Dr. Fall",
    arrivalTime: "09:15",
    statusSummary: "Prise en charge prioritaire",
    status: "Urgence",
    image: "/images/user/user-02.jpg",
  },
  {
    id: 3,
    patient: "Awa Touré",
    reason: "IRM programmée",
    department: "Radiologie",
    doctor: "Dr. Coulibaly",
    arrivalTime: "10:05",
    statusSummary: "En attente du service",
    status: "En attente",
    image: "/images/user/user-03.jpg",
  },
  {
    id: 4,
    patient: "Mamadou Keita",
    reason: "Contrôle post-opératoire",
    department: "Chirurgie",
    doctor: "Dr. Traoré",
    arrivalTime: "10:40",
    statusSummary: "Patient orienté",
    status: "Enregistré",
    image: "/images/user/user-04.jpg",
  },
  {
    id: 5,
    patient: "Fatoumata Sarr",
    reason: "Consultation cardiologique",
    department: "Cardiologie",
    doctor: "Dr. Ndiaye",
    arrivalTime: "11:10",
    statusSummary: "Documents incomplets",
    status: "En attente",
    image: "/images/user/user-05.jpg",
  },
];

export default function ReceptionRecentAdmissions() {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Enregistré" | "En attente" | "Urgence"
  >("All");

  const filteredResults = useMemo(
    () =>
      tableData.filter((record) => {
        const matchesStatus =
          statusFilter === "All" || record.status === statusFilter;

        const normalizedSearch = searchValue.trim().toLowerCase();

        if (!normalizedSearch) {
          return matchesStatus;
        }

        const textMatch = [
          record.patient,
          record.reason,
          record.department,
          record.doctor,
          record.arrivalTime,
          record.statusSummary,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

        return matchesStatus && textMatch;
      }),
    [searchValue, statusFilter]
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">

      {/* HEADER */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Admissions récentes
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Patients enregistrés aujourd’hui à la réception.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

          {/* SEARCH */}
          <div className="w-full sm:w-auto">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Rechercher un patient..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-theme-xs outline-none transition focus:border-theme-500 focus:ring-2 focus:ring-theme-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>

          {/* FILTER */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-theme-xs outline-none transition focus:border-theme-500 focus:ring-2 focus:ring-theme-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="All">Tous les statuts</option>
              <option value="Enregistré">Enregistré</option>
              <option value="En attente">En attente</option>
              <option value="Urgence">Urgence</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Patient
              </TableCell>

              <TableCell
                isHeader
                className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Motif
              </TableCell>

              <TableCell
                isHeader
                className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Service
              </TableCell>

              <TableCell
                isHeader
                className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Médecin
              </TableCell>

              <TableCell
                isHeader
                className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Heure
              </TableCell>

              <TableCell
                isHeader
                className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Statut
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredResults.map((record) => (
              <TableRow key={record.id}>

                <TableCell className="py-3 text-theme-sm text-gray-700 dark:text-gray-300">
                  {record.patient}
                </TableCell>

                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {record.reason}
                </TableCell>

                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {record.department}
                </TableCell>

                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {record.doctor}
                </TableCell>

                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {record.arrivalTime}
                </TableCell>

                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  <div className="flex flex-col gap-1">

                    <span>{record.statusSummary}</span>

                    <Badge
                      size="sm"
                      color={
                        record.status === "Enregistré"
                          ? "success"
                          : record.status === "En attente"
                          ? "warning"
                          : "error"
                      }
                    >
                      {record.status}
                    </Badge>
                  </div>
                </TableCell>

              </TableRow>
            ))}

            {filteredResults.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-theme-sm text-gray-500 dark:text-gray-400"
                >
                  Aucun patient trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}