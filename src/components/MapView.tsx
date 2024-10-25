import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";


export default function MapViewComponent() {
  const currentPosition: GeolocationCoordinates = JSON.parse(localStorage.getItem('position'));
  const [center, setCenter] = useState<LatLngTuple>([currentPosition.latitude, currentPosition.longitude]);
  const [zoom, setZoom] = useState(13);

  return (
    <div className="map-container" style={{display: "flex", height: "100%", position: "relative", bottom: "2.5rem", top: 0}}>
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
        <MapMarkers />
      </MapContainer>
    </div>
  );
}
