export const attribution = 
  '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors &copy; <a href="https://openskimap.org/">OpenSkiMap.org</a>'

export const tileUrl = 
  'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';

export const defaultMapState = {
  lat: 39.8283,
  lng: -98.5795,
  zoom: 4,
  minZoom: 2,
  activeResort: null,
}

export function getMarkerColor(m) {
  if (m.isEpic) {
    return "#F78D1E";
  } else if (m.isIkon) {
    return "#F7CB14";
  } else {
    return "white";
  }
}
