function escapeCsvValue(value) {
  const text = value == null ? "" : String(value);

  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

export function toCsv(rows, columns) {
  if (!columns?.length) {
    throw new Error("CSV columns are required.");
  }

  const header = columns
    .map((column) => escapeCsvValue(column.header))
    .join(",");

  const records = (rows ?? []).map((row) =>
    columns
      .map((column) => escapeCsvValue(row[column.key]))
      .join(",")
  );

  return "\uFEFF" + [header, ...records].join("\r\n");
}
