
"use client";

import { useActionState } from "react";
import { signIn } from "./actions";

const initialState = {
  success: false,
  message: "",
};

export default function SignInForm({ nextPath = "/" }) {
  const [state, formAction, pending] = useActionState(
    signIn,
    initialState
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="next" value={nextPath} />

      <label htmlFor="email">Demo account email</label>
      <select id="email" name="email" required defaultValue="">
        <option value="" disabled>
          Choose an account
        </option>
        <option value="abebe@example.com">
          Customer — Abebe Bikila
        </option>
        <option value="staff@example.com">
          Staff — Addis Eats Staff
        </option>
      </select>

      {state.message && <p role="alert">{state.message}</p>}

      <button type="submit" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
