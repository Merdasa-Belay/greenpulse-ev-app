import { cookies } from "next/headers";
import { getAdminCookieName, verifyAdminToken } from "@/lib/adminAuth";

export async function getAdminFromCookies() {
  const store = await cookies();
  const token = store.get(getAdminCookieName())?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
