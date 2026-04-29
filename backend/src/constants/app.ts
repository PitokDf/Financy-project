import { config } from "@/config";

export const App = {
    NAME: config.SERVICE,
    VERSION: '1.0.0',
    API_PREFIX: '/api/v1',
    DEFAULT_LANGUAGE: 'id',
};

export const Categories = [
    { name: "Perbaikan & Maintenance", icon: "Wrench", color: "#F97316" },
    { name: "Biaya Darurat", icon: "TriangleAlert", color: "#EF4444" },
    { name: "Tagihan", icon: "ReceiptText", color: "#EAB308" },
    { name: "Asuransi", icon: "ShieldCheck", color: "#3B82F6" },
    { name: "Perawatan Diri", icon: "Sparkles", color: "#EC4899" },
    { name: "Kebersihan & Toiletries", icon: "SoapDispenser", color: "#06B6D4" },
    { name: "Jasa Profesional", icon: "BriefcaseBusiness", color: "#64748B" },
    { name: "Transportasi", icon: "Car", color: "#6366F1" },
    { name: "Pendidikan", icon: "GraduationCap", color: "#8B5CF6" },
    { name: "Biaya Admin & Bank", icon: "Landmark", color: "#10B981" },
    { name: "Parkir & Tol", icon: "ParkingCircle", color: "#F59E0B" },
    { name: "Donasi/Zakat", icon: "HandHeart", color: "#F43F5E" },
    { name: "Langganan Digital", icon: "RefreshCcw", color: "#0EA5E9" },
    { name: "Keluarga", icon: "Users", color: "#14B8A6" },
    { name: "Cicilan & Utang", icon: "CreditCard", color: "#DC2626" },
    { name: "Pajak", icon: "FileText", color: "#EA580C" },
    { name: "Belanja Harian", icon: "ShoppingCart", color: "#22C55E" },
    { name: "Perlengkapan Rumah", icon: "House", color: "#84CC16" },
    { name: "Gadget & Elektronik", icon: "Smartphone", color: "#2563EB" },
    { name: "ATK & Percetakan", icon: "Printer", color: "#6B7280" },
    { name: "Pakaian", icon: "Shirt", color: "#D946EF" },
    { name: "Tempat Tinggal", icon: "Building2", color: "#78716C" },
    { name: "Pulsa & Data", icon: "Wifi", color: "#0284C7" },
    { name: "Makanan & Minuman", icon: "UtensilsCrossed", color: "#FB923C" },
    { name: "Hewan Peliharaan", icon: "PawPrint", color: "#D97706" },
    { name: "Pendapatan", icon: "Wallet", color: "#059669" },
    { name: "Olahraga & Fitness", icon: "Dumbbell", color: "#F43F5E" },
    { name: "Transfer & Topup", icon: "ArrowLeftRight", color: "#0891B2" },
    { name: "Kesehatan", icon: "HeartPulse", color: "#E11D48" },
    { name: "Hiburan", icon: "Film", color: "#A855F7" },
    { name: "Gaming", icon: "Gamepad2", color: "#7C3AED" },
    { name: "Hadiah", icon: "Gift", color: "#DB2777" },
    { name: "Hobi", icon: "Palette", color: "#818CF8" },
    { name: "Tabungan & Investasi", icon: "PiggyBank", color: "#16A34A" },
    { name: "Liburan", icon: "Plane", color: "#60A5FA" },
    { name: "Administrasi & Dokumen", icon: "FolderOpen", color: "#CA8A04" },
    { name: "Pengiriman", icon: "Package", color: "#F97316" },
    { name: "Bisnis & Usaha", icon: "Store", color: "#34D399" },
    { name: "Kendaraan", icon: "Truck", color: "#475569" },
    { name: "Pernikahan & Event", icon: "CalendarHeart", color: "#FB7185" },
    { name: "Investasi Properti", icon: "Building", color: "#57534E" },
    { name: "Sosial & Komunitas", icon: "UsersRound", color: "#0F766E" },
    { name: "Donasi / Zakat", icon: "HandHeart", color: "#F43F5E" },
    { name: "Lain-lain", icon: "Ellipsis", color: "#9CA3AF" },
] as const;

export type CategoryType = (typeof Categories)[number]["name"]

export const CategoryMap = Object.fromEntries(
    Categories.map((item) => [item.name, item])
);