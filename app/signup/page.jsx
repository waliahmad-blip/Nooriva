import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignupClient from "./SignupClient";

export const metadata = {
  title: "Sign Up",
  description: "Create a NOORIVA account to access Noorix, your personal glow guide.",
  robots: { index: false, follow: false },
};

export default async function SignupPage() {
  const session = await auth();
  if (session) redirect("/account");
  return <SignupClient />;
}
