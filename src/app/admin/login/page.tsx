import { redirect } from "next/navigation";
import HeroCard from "@/app/ui/HeroCard";
import AdminLoginForm from "../_components/AdminLoginForm";
import { getAdminSession } from "@/lib/admin/auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getAdminSession();
  const { next } = await searchParams;

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#f8efe5,transparent_55%),linear-gradient(180deg,#f7efe7,#efe2d6)] px-6 py-10">
      <div className="w-full max-w-xl">
        <HeroCard className="p-6 md:p-8">
          <AdminLoginForm nextPath={next ?? "/admin"} />
        </HeroCard>
      </div>
    </main>
  );
}
