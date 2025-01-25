export const osm = {
  maptiler: {
    url: `https://api.maptiler.com/maps/aquarelle/256/{z}/{x}/{y}.png?key=${
      import.meta.env.VITE_MAPTILER_KEY
    }`,
    attribution: `&copy; <a href="https://www.maptiler.com/" target="_blank" rel="noopener noreferrer">MapTiler</a>, &copy; <a href="http://osm.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors`,
  },
};
