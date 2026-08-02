import { config } from "@/config";

export const App = {
  NAME: config.SERVICE,
  VERSION: "1.0.0",
  API_PREFIX: "/api/v1",
  DEFAULT_LANGUAGE: "id",
};

export const Categories = [
  { name: "Makanan & Minuman", icon: "UtensilsCrossed", color: "#F59E0B" },
  { name: "Transportasi", icon: "Car", color: "#3B82F6" },
  { name: "Belanja Bulanan", icon: "ShoppingCart", color: "#22C55E" },
  { name: "Tagihan & Utilitas", icon: "Receipt", color: "#EF4444" },
  { name: "Internet & Pulsa", icon: "Wifi", color: "#06B6D4" },
  { name: "Langganan Digital", icon: "Repeat", color: "#8B5CF6" },
  { name: "Kesehatan", icon: "HeartPulse", color: "#F43F5E" },
  { name: "Pendidikan", icon: "GraduationCap", color: "#6366F1" },
  { name: "Hiburan", icon: "Popcorn", color: "#EC4899" },
  { name: "Pakaian & Aksesoris", icon: "Shirt", color: "#14B8A6" },
  { name: "Perawatan Diri & Kecantikan", icon: "Sparkles", color: "#D946EF" },
  { name: "Sosial & Donasi", icon: "HandHeart", color: "#F97316" },
  { name: "Perbaikan & Perawatan", icon: "Wrench", color: "#64748B" },
  { name: "Peralatan & Elektronik", icon: "Cpu", color: "#0EA5E9" },
  { name: "Perjalanan & Liburan", icon: "Plane", color: "#A855F7" },
  { name: "Cicilan & Utang", icon: "CreditCard", color: "#EAB308" },
  { name: "Asuransi", icon: "ShieldCheck", color: "#10B981" },
  { name: "Hewan Peliharaan", icon: "PawPrint", color: "#84CC16" },
  { name: "Pajak", icon: "Landmark", color: "#B45309" },
  { name: "Keluarga", icon: "Users", color: "#78716C" },
  { name: "Hobi", icon: "Palette", color: "#71717A" },
  { name: "Lain-lain", icon: "MoreHorizontal", color: "#0F766E" },
] as const;

export type CategoryType = (typeof Categories)[number]["name"];

export const CategoryMap = Object.fromEntries(
  Categories.map((item) => [item.name, item]),
);

export const HEADER_SYNONYMS = {
  TYPE: [
    "tipe",
    "type",
    "kategori",
    "category",
    "kind",
    "status",
    "transaction type",
    "jenis",
    "jenis transaksi",
    "flow",
  ],
  AMOUNT: [
    "nominal",
    "amount",
    "jumlah",
    "value",
    "harga",
    "total",
    "credit",
    "debit",
    "mutasi",
    "saldo",
    "pembayaran",
    "price",
  ],
  DESCRIPTION: [
    "catatan",
    "deskripsi",
    "description",
    "keterangan",
    "memo",
    "note",
    "narasi",
    "detail",
    "transaksi",
    "remarks",
  ],
  DATE: [
    "tanggal",
    "date",
    "waktu",
    "datetime",
    "timestamp",
    "tgl",
    "transaction date",
    "tanggal transaksi",
  ],
};

export const INCOME_KEYWORDS = [
  "INCOME",
  "PEMASUKAN",
  "PENDAPATAN",
  "MASUK",
  "GAJI",
  "EARNING",
  "DEPOSIT",
  "CREDIT",
  "SALDO MASUK",
  "UNFOLD",
];

export const getHeaderSynonimVal = (row: any, synonyms: string[]) => {
  const targetKey = Object.keys(row).find((k) =>
    synonyms.includes(k.toLowerCase().trim()),
  );
  return targetKey ? row[targetKey] : null;
};
