import { useRef, useState } from "react";
import { MapContainer, Popup, TileLayer, Marker } from "react-leaflet";
import { osm, useGeoLocation } from "../../core";
import cities from "../../core/data.json";

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

  const markerIcon2 = new L.Icon({
    iconUrl: "/assets/icons/marker_02.svg",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -34],
  });

  const location = useGeoLocation();
  console.log("here5", location);

  return (
    <div className="containerHome">
      <p>This is a simple Leaflet React application.</p>
      <div className="bodyHomePage">
        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
          <TileLayer
            url={osm?.maptiler?.url}
            attribution={osm?.maptiler?.attribution}
          />

          {cities &&
            cities?.length > 0 &&
            cities.map((city, idx) => (
              <Marker
                key={idx}
                position={[city.lat, city.lng]}
                icon={markerIcon}
              >
                <Popup>
                  <strong>
                    {city.city} - {city.country}
                  </strong>
                </Popup>
              </Marker>
            ))}
          {location?.loaded && !location.error && (
            <Marker
              icon={markerIcon2}
              position={[location.coordinates.lat, location.coordinates.lng]}
            >
              <Popup>My location</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};
