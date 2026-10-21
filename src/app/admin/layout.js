import AdminShell from "@/components/admin/AdminShell";

export const metadata = { title: "Admin — SMA Negeri 9 Semarang", robots: { index: false, follow: false } };

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
