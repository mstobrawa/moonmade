import AdminNavLink from "../_components/AdminNavLink";
import AdminLogoutButton from "../_components/AdminLogoutButton";
import { requireAdminSession } from "@/lib/admin/auth";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7efe7,#efe3d9)]">
      <header className="border-b border-moon-contrast/10 bg-moon-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-moon-rose-dark">
              Moonmade Admin
            </p>
            <h1 className="text-2xl text-moon-contrast">Panel obslugi sklepu</h1>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <p className="text-sm text-moon-contrast/70">
              Zalogowano jako {session.user.email ?? "admin"}
            </p>
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6">
        <nav className="flex flex-wrap gap-2 rounded-[1.5rem] border border-moon-contrast/10 bg-moon-white/60 p-2 shadow-[0_14px_35px_rgba(47,42,40,0.06)]">
          <AdminNavLink href="/admin" label="Przeglad" />
          <AdminNavLink href="/admin/products" label="Produkty" />
          <AdminNavLink href="/admin/orders" label="Zamowienia" />
        </nav>

        <div className="rounded-[1.75rem] border border-moon-contrast/10 bg-moon-white/55 p-5 shadow-[0_18px_40px_rgba(47,42,40,0.08)] backdrop-blur-sm md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
