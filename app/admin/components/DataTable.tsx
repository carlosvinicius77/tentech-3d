"use client";

import { useState } from "react";

export interface Column<T> {
  key: string;
  label: string;
  width?: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  rowsPerPageOptions?: number[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  actions?: (row: T) => React.ReactNode;
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowsPerPageOptions = [10, 25, 50],
  onEdit,
  onDelete,
  actions,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(rowsPerPageOptions[0]);

  const totalPages = Math.ceil(data.length / perPage);
  const start = (page - 1) * perPage;
  const rows = data.slice(start, start + perPage);

  const goTo = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  const pageNumbers = () => {
    const pages: (number | "…")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("…");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("…");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div>
      <div className="a-table-wrap">
        <table className="a-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={col.width ? { width: col.width } : undefined}>
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete || actions) && (
                <th style={{ width: "100px" }}>Ações</th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete || actions ? 1 : 0)}
                  style={{ textAlign: "center", color: "var(--a-muted)", padding: "32px" }}
                >
                  Nenhum registro encontrado
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row) : String(row[col.key] ?? "")}
                    </td>
                  ))}
                  {(onEdit || onDelete || actions) && (
                    <td>
                      {actions ? (
                        actions(row)
                      ) : (
                        <div style={{ display: "flex", gap: "6px" }}>
                          {onEdit && (
                            <button
                              className="a-btn a-btn-ghost a-btn-sm"
                              onClick={() => onEdit(row)}
                              title="Editar"
                            >
                              ✏️
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="a-btn a-btn-ghost a-btn-sm a-btn-danger"
                              onClick={() => onDelete(row)}
                              title="Excluir"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="a-pagination">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="a-pagination-info">
            {start + 1}–{Math.min(start + perPage, data.length)} de {data.length}
          </span>
          <select
            className="a-select"
            style={{ width: "auto", padding: "4px 8px", fontSize: "12px" }}
            value={perPage}
            onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
          >
            {rowsPerPageOptions.map((n) => (
              <option key={n} value={n}>{n} por página</option>
            ))}
          </select>
        </div>

        <div className="a-pagination-btns">
          <button className="a-page-btn" onClick={() => goTo(page - 1)} disabled={page === 1}>‹</button>
          {pageNumbers().map((p, i) =>
            p === "…" ? (
              <span key={`ellipsis-${i}`} style={{ padding: "0 4px", color: "var(--a-muted)" }}>…</span>
            ) : (
              <button
                key={p}
                className={`a-page-btn${page === p ? " active" : ""}`}
                onClick={() => goTo(p as number)}
              >
                {p}
              </button>
            )
          )}
          <button className="a-page-btn" onClick={() => goTo(page + 1)} disabled={page === totalPages}>›</button>
        </div>
      </div>
    </div>
  );
}
