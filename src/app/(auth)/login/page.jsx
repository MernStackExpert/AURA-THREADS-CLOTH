import LoginClient from "@/components/auth/LoginClient";

export const metadata = {
  title: "Login | Aura Threads",
  description: "Sign in to your Aura Threads account.",
};

export default function LoginPage() {
  return (
    <main className="w-full bg-background min-h-screen flex items-center justify-center pt-24 pb-16">
      <LoginClient />
    </main>
  );
}
