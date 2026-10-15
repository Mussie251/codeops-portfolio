
"use client";

import { useFormStatus } from "react-dom";
import { signOut } from "./signin/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Signing out..." : "Sign out"}
    </button>
  );
}

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <SubmitButton />
    </form>
  );
}
