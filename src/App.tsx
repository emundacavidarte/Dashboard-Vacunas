import { useState, useMemo, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  PieChart,
  Pie,
  LineChart,
  Line,
  Legend,
  ComposedChart,
} from "recharts";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import {
  Syringe,
  Users,
  Activity,
  Download,
  Calendar,
  FileText,
  CheckCircle2,
  Shield,
  Search,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MOCK_DATA } from "./data";

// Helper for Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const AGE_GROUPS = [
  {
    id: "rn",
    label: "RN",
    category: "Recién Nacido",
    target: 450000,
    vaccinated: 432000,
    vaccines: ["BCG", "HvB"],
  },
  {
    id: "2m",
    label: "2M",
    category: "Lactantes",
    target: 440000,
    vaccinated: 400400,
    vaccines: ["Pentavalente", "IPV", "Rotavirus", "Neumococo", "Hexavalente"],
  },
  {
    id: "4m",
    label: "4M",
    category: "Lactantes",
    target: 440000,
    vaccinated: 387200,
    vaccines: ["Pentavalente", "Hexavalente", "IPV", "Rotavirus", "Neumococo"],
  },
  {
    id: "6m",
    label: "6M",
    category: "Lactantes",
    target: 435000,
    vaccinated: 369750,
    vaccines: ["Pentavalente", "Hexavalente", "APO", "Influenza"],
  },
  {
    id: "7m",
    label: "7M",
    category: "Lactantes",
    target: 435000,
    vaccinated: 356700,
    vaccines: ["Influenza"],
  },
  {
    id: "12m",
    label: "12M",
    category: "1 Año",
    target: 430000,
    vaccinated: 382700,
    vaccines: ["SPR", "Neumococo", "Varicela", "Influenza"],
  },
  {
    id: "15m",
    label: "15M",
    category: "1 Año",
    target: 430000,
    vaccinated: 335400,
    vaccines: ["AMA", "Hepatitis A"],
  },
  {
    id: "18m",
    label: "18M",
    category: "1 Año",
    target: 425000,
    vaccinated: 357000,
    vaccines: ["DPT", "APO", "SPR"],
  },
  {
    id: "24m",
    label: "24M",
    category: "2 y 3 Años",
    target: 420000,
    vaccinated: 315000,
    vaccines: ["Influenza"],
  },
  {
    id: "36m",
    label: "36M",
    category: "2 y 3 Años",
    target: 415000,
    vaccinated: 290500,
    vaccines: ["Influenza"],
  },
];

const VACCINES = [
  { id: "bcg", name: "BCG", coverage: 96, color: "var(--color-brand-cyan)" },
  {
    id: "hvb",
    name: "HvB",
    coverage: 95,
    color: "var(--color-brand-lightblue)",
  },
  {
    id: "pentavalente",
    name: "Pentavalente",
    coverage: 88,
    color: "var(--color-brand-purple)",
  },
  {
    id: "hexavalente",
    name: "Hexavalente",
    coverage: 88,
    color: "var(--color-brand-purple)",
  },
  { id: "ipv", name: "IPV", coverage: 89, color: "var(--color-brand-pink)" },
  { id: "apo", name: "APO", coverage: 88, color: "var(--color-brand-purple)" },
  {
    id: "rotavirus",
    name: "Rotavirus",
    coverage: 89,
    color: "var(--color-brand-pink)",
  },
  {
    id: "neumococo",
    name: "Neumococo",
    coverage: 87,
    color: "var(--color-brand-lime)",
  },
  {
    id: "influenza",
    name: "Influenza",
    coverage: 76,
    color: "var(--color-brand-lightgreen)",
  },
  {
    id: "spr",
    name: "SPR",
    coverage: 85,
    color: "var(--color-brand-lavender)",
  },
  {
    id: "varicela",
    name: "Varicela",
    coverage: 82,
    color: "var(--color-brand-red)",
  },
  {
    id: "hepa",
    name: "Hepatitis A",
    coverage: 80,
    color: "var(--color-brand-lightpink)",
  },
  {
    id: "ama",
    name: "AMA",
    coverage: 78,
    color: "var(--color-brand-darkgray)",
  },
  { id: "dpt", name: "DPT", coverage: 84, color: "var(--color-brand-cyan)" },
];

const EXACT_DOSES_LIST = [
  // Recién Nacido
  { name: "BCG (Dosis única)", id: "bcg", baseCov: 98 },
  { name: "HvB (Dosis única)", id: "hvb", baseCov: 96 },
  // 2 meses
  { name: "Pentavalente (1ra dosis)", id: "pentavalente", baseCov: 94 },
  { name: "IPV (1ra dosis)", id: "ipv", baseCov: 95 },
  { name: "Rotavirus (1ra dosis)", id: "rotavirus", baseCov: 94 },
  { name: "Antineumocócica (1ra dosis)", id: "neumococo", baseCov: 93 },
  { name: "Hexavalente (1ra dosis)", id: "hexavalente", baseCov: 90 },
  // 4 meses
  { name: "Pentavalente (2da dosis)", id: "pentavalente", baseCov: 88 },
  { name: "Hexavalente (2da dosis)", id: "hexavalente", baseCov: 85 },
  { name: "IPV (2da dosis)", id: "ipv", baseCov: 89 },
  { name: "Rotavirus (2da dosis)", id: "rotavirus", baseCov: 87 },
  { name: "Antineumocócica (2da dosis)", id: "neumococo", baseCov: 86 },
  // 6 meses
  { name: "Pentavalente (3ra dosis)", id: "pentavalente", baseCov: 82 },
  { name: "Hexavalente (3ra dosis)", id: "hexavalente", baseCov: 80 },
  { name: "APO (3ra dosis)", id: "apo", baseCov: 85 },
  { name: "Influenza Ped. (1ra dosis)", id: "influenza", baseCov: 80 },
  // 7 meses
  { name: "Influenza Ped. (2da dosis)", id: "influenza", baseCov: 75 },
  // 12 meses
  { name: "SPR (1ra dosis)", id: "spr", baseCov: 70 },
  { name: "Antineumocócica (3ra dosis)", id: "neumococo", baseCov: 78 },
  { name: "Varicela (1ra dosis)", id: "varicela", baseCov: 76 },
  {
    name: "Influenza Ped. (1 dosis anual - 1 año)",
    id: "influenza",
    baseCov: 60,
  },
  // 15 meses
  { name: "AMA (Dosis única)", id: "ama", baseCov: 72 },
  { name: "HvA (Dosis única)", id: "hepa", baseCov: 68 },
  // 18 meses
  { name: "DPT (1er refuerzo)", id: "dpt", baseCov: 65 },
  { name: "APO (1er refuerzo)", id: "apo", baseCov: 66 },
  { name: "SPR (2da dosis)", id: "spr", baseCov: 64 },
  // 24 meses
  {
    name: "Influenza Ped. (1 dosis anual - 2 años)",
    id: "influenza",
    baseCov: 55,
  },
  // 36 meses
  {
    name: "Influenza Ped. (1 dosis anual - 3 años)",
    id: "influenza",
    baseCov: 50,
  },
];

// MOCK DATA PARA REPARTO DE VACUNAS
const VACCINE_DISTRIBUTION_DATA = [
  { name: "SINOPHARM", value: 0, fill: "#94a3b8" },
  { name: "PFIZER PEDI...", value: 0, fill: "#64748b" },
  { name: "PFIZER", value: 42182944, fill: "#3b82f6" },
  { name: "MODERNA", value: 0, fill: "#cbd5e1" },
  { name: "ASTRAZENECA", value: 0, fill: "#94a3b8" },
];

const VACCINE_TIMELINE_DATA = [
  { date: "29/02", pfizer: 100 },
  { date: "07/03", pfizer: 3600 },
  { date: "16/04", pfizer: 1000 },
  { date: "25/04", pfizer: 3200 },
  { date: "30/04", pfizer: 800 },
  { date: "28/05", pfizer: 200 },
  { date: "11/09", pfizer: 4700 },
];

const VACCINE_MATRIX = [
  {
    age: "Recién nacido",
    bgColor: "#50B9E1",
    vaccines: [
      { name: "BCG", val: "27.9%", bg: "#50B9E1" },
      { name: "HvB", val: "27.0%", bg: "#50B9E1" },
    ],
  },
  {
    age: "2 meses",
    bgColor: "#009FE3",
    vaccines: [
      { name: "PENTA (1° dosis)", val: "30.7%", bg: "#009FE3" },
      { name: "POLIO (1° dosis)", val: "30.7%", bg: "#009FE3" },
      { name: "ROTAVIRUS (1° dosis)", val: "31.0%", bg: "#009FE3" },
      { name: "NEUMO (1° dosis)", val: "31.1%", bg: "#009FE3" },
    ],
  },
  {
    age: "4 meses",
    bgColor: "#FF9999",
    vaccines: [
      { name: "PENTA (2° dosis)", val: "29.8%", bg: "#FF9999" },
      { name: "POLIO (2° dosis)", val: "29.9%", bg: "#FF9999" },
      { name: "ROTAVIRUS (2° Dosis)", val: "29.9%", bg: "#FF9999" },
      { name: "NEUMO (2° dosis)", val: "30.3%", bg: "#FF9999" },
    ],
  },
  {
    age: "6 meses",
    bgColor: "#E40E20",
    vaccines: [
      { name: "PENTA (3° Dosis)", val: "29.4%", bg: "#E40E20" },
      { name: "POLIO (3° Dosis)", val: "29.4%", bg: "#E40E20" },
      { name: "INFLUENZA (1° dosis)", val: "19.5%", bg: "#E40E20" },
    ],
  },
  {
    age: "7 meses",
    bgColor: "#966EDC",
    vaccines: [{ name: "INFLUENZA (2° Dosis)", val: "6.1%", bg: "#966EDC" }],
  },
  {
    age: "12 meses",
    bgColor: "#BCCF00",
    vaccines: [
      { name: "SPR (1° Dosis)", val: "27.0%", bg: "#BCCF00" },
      { name: "NEUMO (3° Dosis)", val: "26.0%", bg: "#BCCF00" },
      { name: "VARICELA", val: "26.6%", bg: "#BCCF00" },
    ],
  },
  {
    age: "15 meses",
    bgColor: "#BCE480",
    vaccines: [
      { name: "HvA", val: "21.8%", bg: "#BCE480" },
      { name: "AMA", val: "21.6%", bg: "#BCE480" },
    ],
  },
  {
    age: "18 meses",
    bgColor: "#E6007E",
    vaccines: [
      { name: "SPR (2° Dosis)", val: "23.2%", bg: "#E6007E" },
      { name: "DPT (1° refuerzo)", val: "15.6%", bg: "#E6007E" },
      { name: "POLIO (1° refuerzo)", val: "22.9%", bg: "#E6007E" },
    ],
  },
];

const TREND_VACCINE_OPTIONS = VACCINE_MATRIX.flatMap((row) =>
  row.vaccines.map((v) => v.name),
);

const getLast6MonthsLabels = () => {
  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const labels = [];
  const currentDate = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1,
    );
    labels.push(
      `${months[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`,
    );
  }
  return labels;
};

const generateTrendData = (vaccineName: string) => {
  const seed = vaccineName.length;
  const labels = getLast6MonthsLabels();

  let baseCoverage = 40 + (seed % 40);

  return labels.map((label, i) => {
    const variation = Math.sin(seed + i) * 15;
    return {
      period: label,
      coverage: Number(
        Math.max(
          10,
          Math.min(98.5, baseCoverage + variation + i * 2.5),
        ).toFixed(1),
      ),
    };
  });
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedTrendVaccine, setSelectedTrendVaccine] = useState(
    TREND_VACCINE_OPTIONS[0],
  );

  const trendData = useMemo(
    () => generateTrendData(selectedTrendVaccine),
    [selectedTrendVaccine],
  );
  const [activeTooltip, setActiveTooltip] = useState<{
    x: number;
    y: number;
    name: string;
    coverage: string;
    doses: string;
    population: string;
  } | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setActiveTooltip(null);
    window.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleClickOutside);
    };
  }, []);

  const handleVaccineClick = (e: React.MouseEvent, vac: any) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const coverageVal = parseFloat(vac.val);
    const mockPop = 20203;
    const mockDoses = Math.round((coverageVal / 100) * mockPop);

    setActiveTooltip({
      x: rect.left + rect.width / 2,
      y: rect.bottom + window.scrollY,
      name: vac.name,
      coverage: vac.val,
      doses: mockDoses.toLocaleString("en-US"),
      population: mockPop.toLocaleString("en-US"),
    });
  };

  const [viewMode, setViewMode] = useState<"age" | "vaccine">("age");
  const [selectedAges, setSelectedAges] = useState<string[]>([
    "rn",
    "2m",
    "4m",
    "6m",
  ]);
  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([
    "bcg",
    "hvb",
    "hexavalente",
    "rotavirus",
    "neumococo",
  ]);

  const [servicio, setServicio] = useState("Todos");
  const [departamento, setDepartamento] = useState("Todos");
  const [ut, setUt] = useState("Todos");
  const [provincia, setProvincia] = useState("Todos");
  const [distrito, setDistrito] = useState("Todos");
  const [comite, setComite] = useState("Todos");
  const [centroPoblado, setCentroPoblado] = useState("Todos");
  const [ciai, setCiai] = useState("Todos");

  const filterOptions = useMemo(
    () => ({
      servicios: [
        "Todos",
        ...Array.from(new Set(MOCK_DATA.map((d) => d.servicio))),
      ].sort(),
      departamentos: [
        "Todos",
        ...Array.from(new Set(MOCK_DATA.map((d) => d.departamento))),
      ].sort(),
      uts: ["Todos", ...Array.from(new Set(MOCK_DATA.map((d) => d.ut)))].sort(),
      provincias: [
        "Todos",
        ...Array.from(new Set(MOCK_DATA.map((d) => d.provincia))),
      ].sort(),
      distritos: [
        "Todos",
        ...Array.from(new Set(MOCK_DATA.map((d) => d.distrito))),
      ].sort(),
      comites: [
        "Todos",
        ...Array.from(new Set(MOCK_DATA.map((d) => d.comite))),
      ].sort(),
      centrosPoblados: [
        "Todos",
        ...Array.from(new Set(MOCK_DATA.map((d) => d.centroPoblado))),
      ].sort(),
      ciais: [
        "Todos",
        ...Array.from(new Set(MOCK_DATA.map((d) => d.ciai))),
      ].sort(),
    }),
    [],
  );

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter((d) => {
      if (servicio !== "Todos" && d.servicio !== servicio) return false;
      if (departamento !== "Todos" && d.departamento !== departamento)
        return false;
      if (ut !== "Todos" && d.ut !== ut) return false;
      if (provincia !== "Todos" && d.provincia !== provincia) return false;
      if (distrito !== "Todos" && d.distrito !== distrito) return false;
      if (comite !== "Todos" && d.comite !== comite) return false;
      if (centroPoblado !== "Todos" && d.centroPoblado !== centroPoblado)
        return false;
      if (ciai !== "Todos" && d.ciai !== ciai) return false;
      return true;
    });
  }, [
    servicio,
    departamento,
    ut,
    provincia,
    distrito,
    comite,
    centroPoblado,
    ciai,
  ]);

  const computedAgeGroups = useMemo(() => {
    return AGE_GROUPS.map((group) => {
      const records = filteredData.filter((d) => d.ageGroupId === group.id);
      return {
        ...group,
        target: records.length,
        vaccinated: records.filter((r) => r.isFullyVaccinated).length,
      };
    });
  }, [filteredData]);

  const computedVaccines = useMemo(() => {
    return VACCINES.map((v) => {
      // Find all records that should have this vaccine based on age?
      // Simplified: Just use total target for % based on records
      const recordsToConsider = filteredData;
      const vCount = recordsToConsider.filter((d) =>
        d.vaccinatedList.includes(v.id),
      ).length;
      return {
        ...v,
        coverage:
          recordsToConsider.length > 0
            ? Math.round((vCount / recordsToConsider.length) * 100)
            : 0,
      };
    });
  }, [filteredData]);

  const computedDosesData = useMemo(() => {
    if (filteredData.length === 0)
      return EXACT_DOSES_LIST.map((d) => ({ ...d, coverage: 0 }));

    return EXACT_DOSES_LIST.map((d) => {
      const factor = (d.name.length + filteredData.length) % 5;
      const coverage = Math.min(100, Math.max(0, d.baseCov - 2 + factor));
      return { ...d, coverage };
    });
  }, [filteredData]);

  const toggleAllAges = () => {
    if (selectedAges.length === computedAgeGroups.length) {
      setSelectedAges([]);
    } else {
      setSelectedAges(computedAgeGroups.map((a) => a.id));
    }
  };

  const toggleAllVaccines = () => {
    if (selectedVaccines.length === computedVaccines.length) {
      setSelectedVaccines([]);
    } else {
      setSelectedVaccines(computedVaccines.map((v) => v.id));
    }
  };

  const {
    totalTarget,
    totalVaccinated,
    coveragePercentage,
    activeVaccinesFromAges,
    ageDetailsStr,
  } = useMemo(() => {
    const selected = computedAgeGroups.filter((a) =>
      selectedAges.includes(a.id),
    );
    let target = 0;
    let vaccinated = 0;
    const activeVacs = new Set<string>();

    selected.forEach((group) => {
      target += group.target;
      vaccinated += group.vaccinated;
      group.vaccines.forEach((v) => activeVacs.add(v));
    });

    const coveragePercentage = target > 0 ? (vaccinated / target) * 100 : 0;
    const ageDetailsStr = selected.map((s) => s.label).join(", ");

    return {
      totalTarget: target,
      totalVaccinated: vaccinated,
      coveragePercentage,
      activeVaccinesFromAges: activeVacs,
      ageDetailsStr,
    };
  }, [selectedAges, computedAgeGroups]);

  const ageChartData = useMemo(() => {
    return computedVaccines
      .map((v) => ({
        ...v,
        active: activeVaccinesFromAges.has(v.name),
        displayCoverage: activeVaccinesFromAges.has(v.name) ? v.coverage : 0,
      }))
      .filter((v) => v.active);
  }, [activeVaccinesFromAges, computedVaccines]);

  const vaccineChartData = useMemo(() => {
    return computedVaccines
      .filter((v) => selectedVaccines.includes(v.id))
      .map((v) => ({
        ...v,
        active: true,
        displayCoverage: v.coverage,
      }));
  }, [selectedVaccines, computedVaccines]);

  const toggleAge = (id: string) =>
    setSelectedAges((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  const toggleVaccine = (id: string) =>
    setSelectedVaccines((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-xl rounded-lg">
          <p className="font-semibold text-slate-800 mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data.color }}
            ></div>
            <p className="text-slate-600 text-sm">
              Cobertura:{" "}
              <span className="font-bold text-slate-800">
                {payload[0].value}%
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-12">
      <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[var(--color-brand-red)] text-white p-1.5 rounded-md shadow-[0_4px_10px_rgba(228,14,32,0.3)]">
              <Shield className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">
              Reporte de Vacunación
            </h1>
          </div>
          <div className="flex items-center gap-5 text-sm font-medium text-slate-500">
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              ÚLTIMA ACTUALIZACIÓN
              <br />
              <span className="text-slate-600 font-bold">
                12 Octubre, 2023 - 08:30 AM
              </span>
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle filters"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 mt-6 lg:mt-8 flex flex-col xl:flex-row gap-6 items-start">
        {/* BARRA LATERAL DE FILTROS */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 xl:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        <aside
          className={cn(
            "shrink-0 flex flex-col gap-4 z-40 transition-transform duration-300",
            "w-full sm:w-[320px] xl:w-[280px]",
            "fixed inset-y-0 right-0 h-screen overflow-y-auto bg-white shadow-2xl p-5 xl:p-0 xl:shadow-none xl:bg-transparent xl:static xl:h-auto",
            "xl:sticky xl:top-24",
            !isMobileMenuOpen
              ? "translate-x-full xl:translate-x-0"
              : "translate-x-0",
          )}
        >
          <div className="flex items-center justify-between xl:hidden mb-2">
            <h2 className="text-lg font-bold text-slate-800">Filtros</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="bg-white xl:rounded-2xl xl:shadow-sm xl:border xl:border-slate-100 p-0 xl:p-5">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4 hidden xl:flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" /> Filtros
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 pl-1 uppercase tracking-wider">
                  Servicio
                </label>
                <select
                  value={servicio}
                  onChange={(e) => setServicio(e.target.value)}
                  className="w-full border border-slate-300 rounded-full px-3 py-1.5 text-[13px] font-medium text-slate-700 bg-white shadow-sm cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]/20 transition-all"
                >
                  {filterOptions.servicios.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 pl-1 uppercase tracking-wider">
                  Departamento
                </label>
                <select
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                  className="w-full border border-slate-300 rounded-full px-3 py-1.5 text-[13px] font-medium text-slate-700 bg-white shadow-sm cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]/20 transition-all"
                >
                  {filterOptions.departamentos.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 pl-1 uppercase tracking-wider">
                  UT/OCT
                </label>
                <select
                  value={ut}
                  onChange={(e) => setUt(e.target.value)}
                  className="w-full border border-slate-300 rounded-full px-3 py-1.5 text-[13px] font-medium text-slate-700 bg-white shadow-sm cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]/20 transition-all"
                >
                  {filterOptions.uts.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 pl-1 uppercase tracking-wider">
                  Provincia
                </label>
                <select
                  value={provincia}
                  onChange={(e) => setProvincia(e.target.value)}
                  className="w-full border border-slate-300 rounded-full px-3 py-1.5 text-[13px] font-medium text-slate-700 bg-white shadow-sm cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]/20 transition-all"
                >
                  {filterOptions.provincias.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 pl-1 uppercase tracking-wider">
                  Distrito
                </label>
                <select
                  value={distrito}
                  onChange={(e) => setDistrito(e.target.value)}
                  className="w-full border border-slate-300 rounded-full px-3 py-1.5 text-[13px] font-medium text-slate-700 bg-white shadow-sm cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]/20 transition-all"
                >
                  {filterOptions.distritos.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 pl-1 uppercase tracking-wider">
                  Comité de Gestión
                </label>
                <select
                  value={comite}
                  onChange={(e) => setComite(e.target.value)}
                  className="w-full border border-slate-300 rounded-full px-3 py-1.5 text-[13px] font-medium text-slate-700 bg-white shadow-sm cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]/20 transition-all"
                >
                  {filterOptions.comites.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 pl-1 uppercase tracking-wider">
                  Centro Poblado
                </label>
                <select
                  value={centroPoblado}
                  onChange={(e) => setCentroPoblado(e.target.value)}
                  className="w-full border border-slate-300 rounded-full px-3 py-1.5 text-[13px] font-medium text-slate-700 bg-white shadow-sm cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]/20 transition-all"
                >
                  {filterOptions.centrosPoblados.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 pl-1 uppercase tracking-wider">
                  CIAI
                </label>
                <select
                  value={ciai}
                  onChange={(e) => setCiai(e.target.value)}
                  className="w-full border border-slate-300 rounded-full px-3 py-1.5 text-[13px] font-medium text-slate-700 bg-white shadow-sm cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-cyan)]/20 transition-all"
                >
                  {filterOptions.ciais.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full h-px bg-slate-100 my-2"></div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setServicio("Todos");
                    setDepartamento("Todos");
                    setUt("Todos");
                    setProvincia("Todos");
                    setDistrito("Todos");
                    setComite("Todos");
                    setCentroPoblado("Todos");
                    setCiai("Todos");
                  }}
                  className="w-full px-6 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 flex justify-center items-center rounded-full font-bold transition-all text-[13px] shadow-sm active:scale-95"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 flex flex-col gap-6 mb-12 cursor-default">
          {/* TARJETAS DE RESUMEN (Summary Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-[var(--color-brand-lime)]/40 p-5 flex flex-col justify-center relative overflow-hidden transition-shadow hover:shadow-md">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--color-brand-lime)]/10 rounded-bl-full -z-0"></div>
              <h3 className="font-bold text-slate-400 text-[10px] sm:text-xs uppercase tracking-wider mb-2 relative z-10 flex items-center gap-1.5">
                <Users className="w-4 h-4" /> Total Niños (Meta)
              </h3>
              <div className="flex items-end justify-between relative z-10">
                <div>
                  <p className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-none">
                    {viewMode === "age"
                      ? totalTarget.toLocaleString("es-PE")
                      : computedAgeGroups
                          .reduce((acc, curr) => acc + curr.target, 0)
                          .toLocaleString("es-PE")}
                  </p>
                  <p className="text-[10px] sm:text-xs font-bold text-[#8ca000] mt-1.5">
                    ↑ +2.4% vs mes anterior
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[var(--color-brand-cyan)]/30 p-5 flex flex-col justify-center relative overflow-hidden transition-shadow hover:shadow-md">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--color-brand-cyan)]/10 rounded-bl-full -z-0"></div>
              <h3 className="font-bold text-slate-400 text-[10px] sm:text-xs uppercase tracking-wider mb-2 relative z-10 flex items-center gap-1.5">
                <Syringe className="w-4 h-4" /> Niños Vacunados
              </h3>
              <div className="relative z-10">
                <div className="flex items-end gap-2">
                  <p className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-none">
                    {viewMode === "age"
                      ? totalVaccinated.toLocaleString("es-PE")
                      : Math.round(totalVaccinated * 0.85).toLocaleString(
                          "es-PE",
                        )}
                  </p>
                  <p className="text-[11px] sm:text-[13px] font-bold text-[var(--color-brand-cyan)] mb-0.5">
                    {viewMode === "age" ? coveragePercentage.toFixed(1) : 85.0}%
                  </p>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5">
                  <div
                    className="h-full bg-[var(--color-brand-cyan)] rounded-full transition-all duration-1000"
                    style={{ width: `${coveragePercentage}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-brand-cyan)] rounded-xl shadow-[0_4px_12px_rgba(0,159,227,0.2)] p-5 flex flex-col justify-center text-white relative overflow-hidden border border-[var(--color-brand-cyan)] transition-shadow hover:shadow-[0_6px_16px_rgba(0,159,227,0.3)]">
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
              <h3 className="font-bold text-white/90 text-[10px] sm:text-xs uppercase tracking-wider mb-2 relative z-10 flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> Cobertura General
              </h3>
              <p className="text-3xl md:text-4xl font-black tracking-tight leading-none relative z-10">
                {viewMode === "age"
                  ? coveragePercentage.toFixed(1)
                  : (
                      vaccineChartData.reduce(
                        (acc, curr) => acc + curr.coverage,
                        0,
                      ) / Math.max(vaccineChartData.length, 1)
                    ).toFixed(1)}
                %
              </p>
              <div className="h-1.5 bg-black/10 rounded-full w-full mt-3 relative z-10 overflow-hidden">
                <div
                  className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)] relative transition-all duration-1000"
                  style={{
                    width: `${viewMode === "age" ? coveragePercentage : vaccineChartData.reduce((acc, curr) => acc + curr.coverage, 0) / Math.max(vaccineChartData.length, 1)}%`,
                  }}
                >
                  <div className="absolute inset-0 bg-white/50 w-full h-full pattern-diagonal-lines-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* INDICADORES OFICIALES DGSE-MIDIS */}
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Indicadores Oficiales DGSE-MIDIS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 mb-1 tracking-wider">
                    IND-11 · 90669/70/81
                  </p>
                  <h3 className="text-[12px] font-semibold text-slate-700 leading-snug mb-3">
                    Neumococo + rotavirus hasta 12 m
                  </h3>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-black text-slate-800 tracking-tight">
                      71.4%
                    </p>
                    <p className="text-[10px] font-bold text-[#4d7c0f] flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-3 h-3" /> +2.1 pp
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium pb-1">
                    n=27,230
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 mb-1 tracking-wider">
                    IND-12 · 90669/70
                  </p>
                  <h3 className="text-[12px] font-semibold text-slate-700 leading-snug mb-3">
                    Neumococo completo y op. hasta 12 m
                  </h3>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-black text-slate-800 tracking-tight">
                      74.6%
                    </p>
                    <p className="text-[10px] font-bold text-[#4d7c0f] flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-3 h-3" /> +1.4 pp
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium pb-1">
                    n=28,451
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 mb-1 tracking-wider">
                    IND-13 · 90681
                  </p>
                  <h3 className="text-[12px] font-semibold text-slate-700 leading-snug mb-3">
                    Rotavirus completo y op. hasta 12 m
                  </h3>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-black text-slate-800 tracking-tight">
                      76.9%
                    </p>
                    <p className="text-[10px] font-bold text-[#4d7c0f] flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-3 h-3" /> +0.8 pp
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium pb-1">
                    n=29,328
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 mb-1 tracking-wider">
                    IND-21 · 10 vacunas
                  </p>
                  <h3 className="text-[12px] font-semibold text-slate-700 leading-snug mb-3">
                    Esquema completo y op. hasta 18 m
                  </h3>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-black text-slate-800 tracking-tight">
                      58.2%
                    </p>
                    <p className="text-[10px] font-bold text-[#be123c] flex items-center gap-1 mt-0.5">
                      <TrendingDown className="w-3 h-3" /> -0.6 pp
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium pb-1">
                    n=25,574
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* IZQUIERDA: FILTROS DE EDADES Y VACUNAS MATRIZ */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-5 flex-1">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Matriz de Vacunación por
                  Etapas
                </h2>
                <div className="overflow-x-hidden sm:overflow-x-visible -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
                  <div className="flex flex-col gap-2 sm:gap-2 w-full mx-auto">
                    {/* ENCABEZADOS TITULOS */}
                    <div className="hidden sm:flex gap-2 sm:gap-3 mb-2">
                      <div className="w-full sm:w-[130px] md:w-[140px] shrink-0 py-2 sm:py-2.5 bg-[#f1f5f9] border border-slate-200 flex items-center justify-center rounded-lg">
                        <span className="text-slate-500 font-bold uppercase text-[10px] sm:text-xs tracking-wider">
                          Etapas de Vida
                        </span>
                      </div>
                      <div className="flex-1 flex items-center justify-center bg-[#f1f5f9] border border-slate-200 rounded-lg py-2 sm:py-2.5">
                        <span className="text-slate-500 font-bold uppercase text-[10px] sm:text-xs tracking-wider">
                          Vacunas y Cobertura
                        </span>
                      </div>
                    </div>

                    {/* FILAS DE VACUNAS Y EDADES */}
                    {VACCINE_MATRIX.map((row, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row gap-2 sm:gap-3 box-border"
                      >
                        {/* CAJA DE ETAPA (EDAD) */}
                        <div
                          className="w-full sm:w-[130px] md:w-[140px] shrink-0 rounded-lg flex items-center px-3 py-2 sm:py-0 relative overflow-hidden shadow-sm hover:brightness-105 transition-all box-border sm:min-h-[52px]"
                          style={{ backgroundColor: row.bgColor }}
                        >
                          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white opacity-80 rounded-full"></div>
                          <span className="text-white font-black text-[11px] sm:text-xs leading-tight uppercase ml-4 relative z-10 drop-shadow-sm line-clamp-1 sm:line-clamp-2">
                            {row.age}
                          </span>
                        </div>

                        {/* CAJA DE VACUNAS ASOCIADAS */}
                        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                          {row.vaccines.map((vac, vacIdx) => (
                            <div
                              key={vacIdx}
                              onClick={(e) => handleVaccineClick(e, vac)}
                              className="flex flex-col items-center justify-center text-center shadow-sm text-white px-2 py-2 sm:px-1 sm:py-1 rounded-lg hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer box-border relative overflow-hidden group min-h-[46px] sm:min-h-0"
                              style={{ backgroundColor: vac.bg }}
                            >
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                              <span className="font-bold text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5 leading-tight drop-shadow-sm whitespace-nowrap overflow-hidden text-ellipsis w-full px-1 relative z-10">
                                {vac.name}
                              </span>
                              <span className="font-black text-[12px] sm:text-sm tracking-tight drop-shadow-sm relative z-10">
                                {vac.val}
                              </span>
                            </div>
                          ))}
                          {Array.from({
                            length: Math.max(0, 4 - row.vaccines.length),
                          }).map((_, emptyIdx) => (
                            <div
                              key={`empty-${emptyIdx}`}
                              className="hidden lg:block rounded-lg bg-transparent"
                            ></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* DERECHA: MAPA DE PERU */}
            <div className="lg:col-span-1 flex flex-col">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-0"></div>

                <div className="flex items-center justify-between mb-2 relative z-10">
                  <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Distribución Regional
                  </h2>
                </div>

                <p className="text-[12px] text-slate-500 mb-4 font-medium relative z-10">
                  Haga clic sobre un departamento para ver su cobertura al
                  detalle.
                </p>
                <div className="flex justify-center sm:justify-start mb-6 relative z-10">
                  <button className="bg-[var(--color-brand-cyan)] hover:brightness-95 text-white px-5 py-2.5 rounded-xl font-bold text-[12px] shadow-sm transition-all uppercase w-full">
                    Explorar a Nivel Nacional
                  </button>
                </div>

                <div className="flex-1 w-full flex items-center justify-center relative mt-4">
                  <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                      scale: 1750,
                      center: [-75, -9.1],
                    }}
                    width={400}
                    height={580}
                    style={{
                      width: "100%",
                      height: "auto",
                      outline: "none",
                      maxHeight: "650px",
                    }}
                  >
                    <Geographies geography="https://code.highcharts.com/mapdata/countries/pe/pe-all.topo.json">
                      {({ geographies }) => (
                        <>
                          {geographies.map((geo) => (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill="#f8fafc"
                              stroke="#cbd5e1"
                              strokeWidth={0.7}
                              style={{
                                default: { outline: "none" },
                                hover: {
                                  fill: "#e2e8f0",
                                  outline: "none",
                                  stroke: "#94a3b8",
                                },
                                pressed: { fill: "#cbd5e1", outline: "none" },
                              }}
                            />
                          ))}
                          {geographies.map((geo) => {
                            const lon = geo.properties["hc-middle-lon"];
                            const lat = geo.properties["hc-middle-lat"];
                            let label = geo.properties.name.toUpperCase();

                            // Fix long labels
                            if (label === "LIMA PROVINCE")
                              label = "LIMA METROP.";

                            let yOffset = 0;
                            let xOffset = 0;
                            if (label === "LIMA METROP.") {
                              xOffset = -35;
                              yOffset = 10;
                            } else if (label === "CALLAO") {
                              xOffset = -30;
                              yOffset = -2;
                            } else if (label === "LIMA") {
                              xOffset = -15;
                            } else if (label === "TUMBES") {
                              xOffset = -15;
                              yOffset = -5;
                            } else if (label === "LA LIBERTAD") {
                              xOffset = -15;
                            }

                            if (lon && lat) {
                              return (
                                <Marker
                                  key={`${geo.rsmKey}-marker`}
                                  coordinates={[lon, lat]}
                                >
                                  <text
                                    textAnchor="middle"
                                    fill="#64748b"
                                    dx={xOffset}
                                    dy={yOffset}
                                    style={{
                                      fontSize: "7.5px",
                                      fontWeight: "600",
                                      fontFamily: "Inter, sans-serif",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    {label}
                                  </text>
                                </Marker>
                              );
                            }
                            return null;
                          })}
                        </>
                      )}
                    </Geographies>
                  </ComposableMap>
                </div>
              </div>
            </div>
          </div>

          {/* TENDENCIA DE VACUNACION */}
          <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl shadow-sm mt-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 bg-[var(--color-brand-cyan)] p-3 sm:px-5 sm:py-3 rounded-br-2xl z-20 shadow-sm border-r border-b border-black/5">
              <label className="text-white text-[11px] font-bold block mb-1">
                Vacuna
              </label>
              <select
                className="w-[200px] sm:w-[280px] text-slate-700 font-medium rounded px-2.5 py-1.5 text-[13px] bg-white border-0 outline-none shadow-sm cursor-pointer hover:bg-slate-50 transition-colors"
                value={selectedTrendVaccine}
                onChange={(e) => setSelectedTrendVaccine(e.target.value)}
              >
                {TREND_VACCINE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex flex-col items-end">
              <h2 className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 sm:gap-2">
                <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-brand-cyan)]" /> Tendencia de Vacunación
              </h2>
            </div>

            <div className="p-4 sm:p-6 pt-24 h-[350px] w-full bg-white rounded-2xl mt-1">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={trendData}
                  margin={{ top: 20, right: 10, bottom: 5, left: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#e2e8f0"
                  />
                  <XAxis
                    dataKey="period"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 13, fontWeight: 600 }}
                    dy={10}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--color-brand-lightgreen)", opacity: 0.2 }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                      fontWeight: "bold",
                      fontSize: "13px"
                    }}
                    formatter={(value: number) => [`${value}%`, "Cobertura"]}
                  />
                  <Bar
                    dataKey="coverage"
                    fill="var(--color-brand-pink)"
                    barSize={40}
                    radius={[4, 4, 0, 0]}
                  >
                    <LabelList
                      dataKey="coverage"
                      position="top"
                      formatter={(val: number) => `${val.toFixed(1)}%`}
                      style={{ fill: "var(--color-brand-darkgray)", fontWeight: 800, fontSize: 13 }}
                      dy={-10}
                    />
                  </Bar>
                  <Line
                    type="monotone"
                    dataKey="coverage"
                    stroke="var(--color-brand-pink)"
                    strokeWidth={3}
                    strokeDasharray="6 4"
                    dot={false}
                    activeDot={{ r: 6, fill: "var(--color-brand-cyan)", stroke: "white", strokeWidth: 2 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>

      {activeTooltip && (
        <div
          className="absolute z-[100] bg-white border border-slate-200 shadow-xl rounded-md pointer-events-none p-3 min-w-[200px] animate-in fade-in zoom-in-95 duration-200"
          style={{
            top: `${activeTooltip.y + 8}px`,
            left: `${activeTooltip.x}px`,
            transform: "translateX(-50%)",
          }}
        >
          {/* Tooltip triangle */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-slate-200 rotate-45"></div>
          <div className="relative z-10">
            <h4 className="font-bold text-slate-800 text-xs sm:text-sm mb-1.5">
              {activeTooltip.name}
            </h4>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-[10px] sm:text-xs">
              <span className="text-slate-500">Dosis:</span>
              <span className="font-semibold text-right text-slate-800">
                {activeTooltip.doses}
              </span>
              <span className="text-slate-500">Poblacion:</span>
              <span className="font-semibold text-right text-slate-800">
                {activeTooltip.population}
              </span>
              <span className="text-slate-500">Cobertura:</span>
              <span className="font-bold text-right text-slate-800">
                {activeTooltip.coverage}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
