import { useRef, useState } from "react";
import {
  MapContainer,
  Popup,
  TileLayer,
  Marker,
  FeatureGroup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { osm, useGeoLocation } from "../../core";
import cities from "../../core/data.json";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
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

  const showMyLocation = () => {
    if (location?.loaded && !location.error && mapRef.current) {
      mapRef.current.flyTo(location.coordinates, ZOOM_LEVEL, {
        animate: true,
      });
    } else {
      alert(location?.error?.message);
    }
  };

  const _created = (e) => console.log("Event:", e);

  return (
    <div className="containerHome">
      <p>This is a simple Leaflet React application.</p>
      <div className="bodyHomePage">
        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
          <FeatureGroup>
            <EditControl position="topright" onCreated={_created} />
          </FeatureGroup>
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
      <div className="boxBtn" onClick={showMyLocation}>
        <button>
          Locate me{" "}
          <img src={"/assets/images/slice_03.png"} alt="Paper aeroplane icon" />
        </button>
      </div>
    </div>
  );
};
