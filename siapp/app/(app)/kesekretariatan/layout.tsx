import { KesekretariatanShell } from "@/components/sekretariat/KesekretariatanShell";

export default function KesekretariatanLayout({ children }: { children: React.ReactNode }) {
  return <KesekretariatanShell>{children}</KesekretariatanShell>;
}
