import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

export const osm = {
  maptiler: {
    url: `https://api.maptiler.com/maps/aquarelle/256/{z}/{x}/{y}.png?key=${
      import.meta.env.VITE_MAPTILER_KEY
    }`,
    attribution: `&copy; <a href="https://www.maptiler.com/" target="_blank" rel="noopener noreferrer">MapTiler</a>, &copy; <a href="http://osm.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors`,
  },
};

export const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation((state) => ({
      ...state,
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    }));
  };

  const onError = (error) => {
    setLocation((state) => ({
      ...state,
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    }));
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not available",
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  return location;
};

export const AddPrintControl = () => {
  const map = useMap();

  useEffect(() => {
    // Control para imprimir el mapa
    const printControl = L.easyPrint({
      title: "Print Map",
      position: "topleft",
      sizeModes: ["Current", "A4Portrait", "A4Landscape"],
      filename: "map",
      exportOnly: false, // Permite imprimir
    });

    // Control para exportar el mapa como imagen
    const exportControl = L.easyPrint({
      title: "Download Map",
      position: "topleft",
      sizeModes: ["Current", "A4Portrait", "A4Landscape"],
      filename: "map",
      exportOnly: true, // Solo descarga como imagen
    });

    // Agregar los controles al mapa
    map.addControl(printControl);
    map.addControl(exportControl);

    return () => {
      map.removeControl(printControl);
      map.removeControl(exportControl);
    };
  }, [map]);

  return null;
};
