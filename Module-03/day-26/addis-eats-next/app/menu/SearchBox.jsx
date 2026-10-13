"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "../../lib/fetcher";

export default function SearchBox() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(input.trim());
      setPage(1);
    }, 300);

    return () => clearTimeout(timeout);
  }, [input]);

  const key = search
    ? `/api/menu?search=${encodeURIComponent(search)}&page=${page}`
    : null;

  const { data, error, isLoading, isValidating } = useSWR(key, fetcher, {
    keepPreviousData: true,
  });

  return (
    <section>
      <label htmlFor="menu-search">Search dishes</label>
      <input
        id="menu-search"
        type="search"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Try Kitfo or Shiro"
      />

      {!search && <p>Enter a dish name to search the menu.</p>}
      {isLoading && <p>Searching...</p>}
      {error && <p role="alert">Could not load search results.</p>}

      {data && (
        <>
          {isValidating && <p>Updating results...</p>}

          {data.dishes.length === 0 ? (
            <p>No matching dishes found.</p>
          ) : (
            <div className="dish-grid">
              {data.dishes.map((dish) => (
                <article className="dish-card" key={dish.id}>
                  <h3>{dish.name}</h3>
                  <p>Category: {dish.category}</p>
                  <strong>{dish.price} ETB</strong>
                  <br />
                  <Link href={`/menu/${dish.id}`}>View Dish</Link>
                </article>
              ))}
            </div>
          )}

          {data.totalPages > 1 && (
            <nav aria-label="Search result pages">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page <= 1}
              >
                Previous
              </button>

              <span>
                {" "}Page {data.page} of {data.totalPages}{" "}
              </span>

              <button
                type="button"
                onClick={() =>
                  setPage((current) =>
                    Math.min(data.totalPages, current + 1)
                  )
                }
                disabled={page >= data.totalPages}
              >
                Next
              </button>
            </nav>
          )}

          <p>{data.total} matching dish(es)</p>
        </>
      )}
    </section>
  );
}
