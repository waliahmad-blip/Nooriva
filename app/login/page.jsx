import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginClient from "./LoginClient";

export const metadata = {
  title: "Login | NOORIVA — Drink Your Glow",
  description: "Login to NOORIVA to access Noorix, your personal glow guide.",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/account");
  return <LoginClient />;
}
