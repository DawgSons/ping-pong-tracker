import { MapContainer, TileLayer } from "react-leaflet";

export function MapViewComponent() {
  return (
    <MapContainer
      center={[50.992707, 7.12652]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Add markers here, somehow... */}
    </MapContainer>
  );
}
