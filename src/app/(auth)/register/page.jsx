import RegisterClient from "@/components/auth/RegisterClient";

export const metadata = {
  title: "Register | Aura Threads",
  description: "Create your Aura Threads account.",
};

export default function RegisterPage() {
  return (
    <main className="w-full bg-background min-h-screen flex items-center justify-center pt-24 pb-16">
      <RegisterClient />
    </main>
  );
}
