
"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "../../lib/session";
import { getUserByEmail } from "../../lib/db";

function getSafeRedirectPath(value) {
  if (
    typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes("\\")
  ) {
    return value;
  }

  return "/";
}

export async function signIn(previousState, formData) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const nextPath = getSafeRedirectPath(formData.get("next"));

  const user = await getUserByEmail(email);

  if (!user) {
    return {
      success: false,
      message: "Use a listed demo account email.",
    };
  }

  await createSession(user);
  redirect(nextPath);
}

export async function signOut() {
  await deleteSession();
  redirect("/signin");
}
