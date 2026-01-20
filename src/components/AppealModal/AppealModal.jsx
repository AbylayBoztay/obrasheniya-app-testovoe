import "./AppealModal.css";

export default function AppealModal({ appeal, onClose }) {
  if (!appeal) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h2>Обращение №{appeal.id}</h2>
          <button className="closeBtn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modalBody">
          <Info label="Категория" value={appeal.category} />
          <Info label="Адрес" value={appeal.address} />
          <Info label="Статус" value={appeal.status} />
          <Info label="Дата регистрации" value={appeal.created_at} />
          <Info label="Описание" value={appeal.description} />
          <Info
            label="Координаты"
            value={`${appeal.latitude}, ${appeal.longitude}`}
          />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="infoRow">
      <div className="infoLabel">{label}</div>
      <div className="infoValue">{value || "—"}</div>
    </div>
  );
}
