import { useRef, useState } from "react";
import { MapContainer, Popup, TileLayer, Marker } from "react-leaflet";
import { osm } from "../../core";

import "leaflet/dist/leaflet.css";
import "./home-page.styles.scss";

export const HomePage = () => {
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();

  const markerIcon = new L.Icon({
    iconUrl: "/assets/icons/marker_01.svg",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -34],
  });

  return (
    <div className="containerHome">
      <p>This is a simple Leaflet React application.</p>
      <div className="bodyHomePage">
        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
          <TileLayer
            url={osm?.maptiler?.url}
            attribution={osm?.maptiler?.attribution}
          />
          <Marker position={[13.084622, 80.248357]} icon={markerIcon}>
            <Popup>
              <strong>First Marker</strong>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};
