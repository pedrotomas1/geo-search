import type { Place } from "../api/Place";
import { search } from "../api/search";
import { useState, Fragment} from "react";

interface LocationSearchProps {
  onPlaceChange: (place: Place) => void;
}

export default function LocationSearch({ onPlaceChange }: LocationSearchProps) {
  const [term, setTerm] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const results = await search(term);
    setPlaces(results);
    console.log(results);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="font-bold" htmlFor="term">
          Search
        </label>
        <input
          type="text"
          id="term"
          className="`border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus-visible:border-red-500 px-a py-2 w-full"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>

      <h1 className="font-bold mt-6">Found Locations</h1>
      <div className="grid grid-cols-[1fr_40px] gap-2 mt-2 items-center">

      {places.map((p) => {
        return (
          <Fragment key={p.id}>
            <p className="text-sm">{p.name}</p>
            <button 
              className="bg-blue-500 text-xs text-white font-bold py-1 px-1 rounded"
              onClick={() => onPlaceChange(p)}
              >
              Go
            </button>
            <div className="border-b w-full col-span-2"/>
          </Fragment>
        );
      })}
      </div>
    </div>
  );
}
