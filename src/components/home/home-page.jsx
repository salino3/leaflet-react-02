import { useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { osm } from "../../core";

import "leaflet/dist/leaflet.css";
import "./home-page.styles.scss";

export const HomePage = () => {
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();

  return (
    <div className="containerHome">
      <p>This is a simple Leaflet React application.</p>
      <div className="bodyHomePage">
        <MapContainer
          center={center}
          zoom={ZOOM_LEVEL}
          style={{ minHeight: "90vh", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            url={osm?.maptiler?.url}
            attribution={osm?.maptiler?.attribution}
          />
        </MapContainer>
      </div>
    </div>
  );
};
