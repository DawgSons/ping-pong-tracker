import { TableLatLng } from "@/types/database.types";
// import { useEffect } from "react"
import { Marker, Popup } from "react-leaflet";

const MapMarkers = ({data} : {data: TableLatLng[]}) => {

  return (
    <>
      {data.map(({ lat, lng, condition }, index) => (
          <Marker key={index} position={[lat, lng]}>
            <Popup>
              {condition}
            </Popup>
          </Marker>
        ))}
    </>
  );
}

export default MapMarkers;