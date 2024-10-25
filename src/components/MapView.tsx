import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import MapMarkers from "./MapMarkers";
import { TableService } from "@/services/tableService";
import { Table, TableLatLng } from "@/types/database.types";


export default function MapViewComponent() {
  const storedPosition = localStorage.getItem('position');
  const currentPosition: GeolocationCoordinates = storedPosition ? JSON.parse(storedPosition) : { latitude: 0, longitude: 0, accuracy: 0, altitude: null, altitudeAccuracy: null, heading: null, speed: null };
  const [center, setCenter] = useState<LatLngTuple>([currentPosition.latitude, currentPosition.longitude]);
  const [zoom, setZoom] = useState(13);
  const [markerData, setMarkerData] = useState<TableLatLng[]>([]);

  useEffect(() => {
    TableService.getTablesLatLng()
    .then((data) => {
      setMarkerData(data);
    }).catch((error) => {
      console.error("Error fetching tables:", error);
    });
    // TableService.getTables()
    //   .then((data) => {
    //     setMarkerData(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching tables:", error);
    //   });
    }, []);

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
        <MapMarkers data={markerData}/>
      </MapContainer>
    </div>
  );
}
