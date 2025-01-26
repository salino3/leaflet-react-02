import { useRef, useState } from "react";
import { MapContainer, Popup, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { osm } from "../../core";
import cities from "../../core/data.json";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "./second-map.styles.scss";

export const SecondMap = () => {
  const [center, setCenter] = useState([40.416775, -3.70379]);
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();

  const markerIcon = new L.Icon({
    iconUrl: "/assets/icons/marker_01.svg",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -34],
  });

  const interactionOptions = {
    zoomControl: false,
    doubleClickZoom: false,
    closePopupOnClick: false,
    dragging: false,
    zoomSnap: false,
    zoomDelta: false,
    trackResize: false,
    touchZoom: false,
    scrollWheelZoom: false,
    boxZoom: false,
    worldCopyJump: false,
    closeButton: false,
  };

  return (
    <div className="containerSecondMap">
      <p>This is a simple static map of Madrid.</p>
      <div className="bodyHomePage">
        <MapContainer
          center={center}
          zoom={ZOOM_LEVEL}
          {...interactionOptions}
          ref={mapRef}
        >
          <TileLayer
            url={osm?.maptiler?.url}
            attribution={osm?.maptiler?.attribution}
          />

          <Marker position={[40.416775, -3.70379]} icon={markerIcon}>
            <Popup>
              <strong>Madrid</strong>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};
