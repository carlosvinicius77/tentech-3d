import type { Metadata } from "next";
import AdminShell from "./components/AdminShell";
import "../globals.css";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin — TenTech 3D",
  description: "Painel administrativo TenTech 3D",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
