import { useEffect, useMemo, useState } from "react";
import "./App.css";

import AppealsTable from "./components/AppealsTable/AppealsTable";
import Filters from "./components/Filters/Filters";
import AppealModal from "./components/AppealModal/AppealModal";
import MapView from "./components/MapView/MapView";

export default function App() {
  const [appeals, setAppeals] = useState([]);

  // фильтры
  const [status, setStatus] = useState("ALL");
  const [query, setQuery] = useState("");

  // модалка
  const [selectedAppeal, setSelectedAppeal] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setAppeals(data))
      .catch((err) => console.error("Ошибка загрузки данных:", err));
  }, []);

  // отфильтрованные данные (ОДИН источник правды)
  const filteredAppeals = useMemo(() => {
    const q = query.trim().toLowerCase();

    return appeals.filter((a) => {
      const okStatus = status === "ALL" ? true : a.status === status;

      const hay = `${a.category ?? ""} ${a.address ?? ""}`.toLowerCase();
      const okQuery = q.length === 0 ? true : hay.includes(q);

      return okStatus && okQuery;
    });
  }, [appeals, status, query]);

  return (
    <div className="app">
      <h1>Обращения граждан</h1>

      <Filters
        status={status}
        query={query}
        onStatusChange={setStatus}
        onQueryChange={setQuery}
        onReset={() => {
          setStatus("ALL");
          setQuery("");
        }}
      />

      <AppealsTable
        appeals={filteredAppeals}
        pageSize={10}
        onRowClick={(item) => setSelectedAppeal(item)}
      />

      {/* Карта получает ТЕ ЖЕ отфильтрованные данные */}
      <MapView
        appeals={filteredAppeals}
        onMarkerClick={(item) => setSelectedAppeal(item)}
      />


      <AppealModal
        appeal={selectedAppeal}
        onClose={() => setSelectedAppeal(null)}
      />
    </div>
  );
}
