import { useMemo, useState } from "react";
import "./AppealsTable.css";

export default function AppealsTable({ appeals, pageSize = 10, onRowClick }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(appeals.length / pageSize));

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return appeals.slice(start, start + pageSize);
  }, [appeals, page, pageSize]);

  // Если данных стало меньше и текущая страница "вылетела", тоь вернемся назад
  if (page > totalPages) setPage(totalPages);

  return (
    <div className="tableCard">
      <div className="tableHeader">
        <h2>Список обращений</h2>
        <div className="tableMeta">
          Показано: {appeals.length} • Страница: {page}/{totalPages}
        </div>
      </div>

      <div className="tableWrap">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 90 }}>ID</th>
              <th>Категория</th>
              <th>Адрес</th>
              <th style={{ width: 140 }}>Статус</th>
              <th style={{ width: 160 }}>Дата регистрации</th>
            </tr>
          </thead>

          <tbody>
            {pageData.map((a) => (
              <tr
                key={a.id}
                className="row"
                onClick={() => onRowClick?.(a)}
                title="Открыть карточку"
              >
                <td>{a.id}</td>
                <td>{a.category}</td>
                <td>{a.address}</td>
                <td>
                  <span className={`badge badge--${badgeKind(a.status)}`}>
                    {a.status}
                  </span>
                </td>
                <td>{a.created_at}</td>
              </tr>
            ))}

            {pageData.length === 0 && (
              <tr>
                <td colSpan={5} className="empty">
                  Ничего не найдено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pager">
        <button
          className="btn"
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          « В начало
        </button>

        <button
          className="btn"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          ‹ Назад
        </button>

        <span className="pageInfo">Страница {page}</span>

        <button
          className="btn"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Вперёд ›
        </button>

        <button
          className="btn"
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          В конец »
        </button>
      </div>
    </div>
  );
}

function badgeKind(status) {
  const s = String(status || "").toLowerCase();
  if (s.includes("реш")) return "success";
  if (s.includes("откл")) return "danger";
  return "warning"; 
}
