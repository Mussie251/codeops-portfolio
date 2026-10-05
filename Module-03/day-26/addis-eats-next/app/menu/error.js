"use client";

export default function Error({ reset }) {
  return (
    <div className="container">
      <h2>Something went wrong</h2>
      <p>We could not load the menu.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
