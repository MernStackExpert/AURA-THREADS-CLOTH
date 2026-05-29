import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata = {
  title: "My Dashboard | Aura Threads",
  description: "Manage your account, orders, and preferences.",
};

export default function MyDashboardPage() {
  return (
    <main className="w-full bg-background min-h-screen pt-24 pb-16">
      <div className="my-container">
        <DashboardClient />
      </div>
    </main>
  );
}