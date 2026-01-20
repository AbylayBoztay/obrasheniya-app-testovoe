import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./MapView.css";

export default function MapView({
  appeals = [],
  center = [51.1694, 71.4491], // Астанинские координаты
  zoom = 12,
  onMarkerClick,
}) {
  return (
    <div className="mapCard">
      <div className="mapHeader">
        <h2 className="mapTitle">Карта обращений</h2>
        <div className="mapMeta">Маркеров: {appeals.length}</div>
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="map"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {appeals
          .filter(
            (a) =>
              isFiniteNumber(a.latitude) && isFiniteNumber(a.longitude)
          )
          .map((a) => (
            <Marker
              key={a.id}
              position={[a.latitude, a.longitude]}
              eventHandlers={{
                click: () => {
                  onMarkerClick?.(a);
                },
              }}
            >
              <Popup>
                <div style={{ minWidth: 220 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>
                    #{a.id} • {a.category}
                  </div>

                  <div style={{ marginBottom: 6 }}>{a.address}</div>

                  <div style={{ fontSize: 13, opacity: 0.85 }}>
                    Статус: <b>{a.status}</b>
                    <br />
                    Дата: <b>{a.created_at}</b>
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 12,
                      opacity: 0.7,
                    }}
                  >
                    (клик по маркеру — открыть карточку)
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

function isFiniteNumber(n) {
  return typeof n === "number" && Number.isFinite(n);
}
