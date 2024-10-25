import { TableService } from "@/services/tableService";
import { useEffect } from "react"

export default function MapMarkers() {
  const currentPosition: GeolocationCoordinates = JSON.parse(localStorage.getItem('position'));
  useEffect(() => {
    TableService.getNearbyTables(currentPosition.latitude, currentPosition.longitude, 5000)
    .then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      <h1>MapMarkers</h1>
    </div>
  )
}