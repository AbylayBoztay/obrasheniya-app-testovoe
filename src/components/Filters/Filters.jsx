import "./Filters.css";

export default function Filters({
  status,
  query,
  onStatusChange,
  onQueryChange,
  onReset,
}) {
  return (
    <div className="filtersCard">
      <div className="filtersRow">
        <div className="field">
          <label className="label">Статус</label>
          <select
            className="select"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="ALL">Все</option>
            <option value="В работе">В работе</option>
            <option value="Решено">Решено</option>
            <option value="Отклонено">Отклонено</option>
          </select>
        </div>

        <div className="field field--grow">
          <label className="label">Поиск (категория или адрес)</label>
          <input
            className="input"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Например: мусор, Абая, освещение..."
          />
        </div>

        <div className="field field--btn">
          <label className="label" style={{ opacity: 0 }}>
            _
          </label>
          <button className="btn" onClick={onReset}>
            Сброс
          </button>
        </div>
      </div>
    </div>
  );
}
