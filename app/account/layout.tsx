import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Navigation from "@/app/components/Navigation";
import SidebarNav from "./SidebarNav";
import "../globals.css";
import "./account.css";

export const metadata: Metadata = {
  title: "Minha Conta — TenTech 3D",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Navigation />
      <div className="account-wrapper">
        <SidebarNav />
        <main className="account-content">{children}</main>
      </div>
    </>
  );
}
