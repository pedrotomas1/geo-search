import { Place } from "./Place";

interface SearchResponse {
  features: {
    properties: {
      place_id: number;
      display_name: string;
    };
    geometry: {
      coordinates: [number, number];
    };
  }[];

}

const url = 'https://nominatim.openstreetmap.org/search';
const params = '&format=geojson&addressdetails=1&layer=address&limit=5';


export const search = async (term: string): Promise<Place[]> => {
  const response = await fetch(`${url}?q=${term}${params}`);
  const data: SearchResponse = await response.json();
  
  return data.features.map((f: any) => ({
    id: f.properties.place_id,
    name: f.properties.display_name,
    longitude: f.geometry.coordinates[0],
    latitude: f.geometry.coordinates[1]
  }));
}