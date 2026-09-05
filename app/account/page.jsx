import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AccountClient from "./AccountClient";

export const metadata = {
  title: "My Account | NOORIVA",
  description: "Your NOORIVA account and glow journey.",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = process.env.BYPASS_AUTH === 'true' ? { user: { name: 'Dev User', email: 'dev@nooriva.co', image: null, plan: 'glow' }, provider: 'dev-bypass', expires: new Date(Date.now() + 86400000).toISOString() } : await auth();
  if (!session) redirect("/login");

  // Serialize session to pass to client component safely
  const sessionData = JSON.parse(JSON.stringify(session));
  return <AccountClient session={sessionData} />;
}
