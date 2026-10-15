
import SignInForm from "./SignInForm";

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const nextParam = params?.next;

  const nextPath =
    typeof nextParam === "string" &&
    nextParam.startsWith("/") &&
    !nextParam.startsWith("//") &&
    !nextParam.includes("\\")
      ? nextParam
      : "/";

  return (
    <section className="container">
      <h2>Sign in to Addis Eats</h2>
      <p>
        This is a demo sign-in for the authentication assignment.
        Do not use real account credentials.
      </p>

      <SignInForm nextPath={nextPath} />
    </section>
  );
}
