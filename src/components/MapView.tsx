import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";


export default function MapViewComponent() {
  const [center, setCenter] = useState<LatLngTuple>([50.992707, 7.12652]);
  const [zoom, setZoom] = useState(13);

  return (
    <div className="map-container" style={{display: "flex", height: "100%", position: "relative", bottom: "2.5rem"}}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        id="map"
        style={{flex: 1, width: "100%"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
