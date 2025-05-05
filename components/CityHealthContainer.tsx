"use client";
import { SearchResponse } from "@/models/searchResponse";
import { CitySuggestion } from "@/models/suggestionResponse";
import { fetchDataProvider, getErrorMessage } from "@/utils/api_provider";
import { CityHealthWidget } from "city-health";
import { useEffect, useState, useTransition } from "react";

interface Props {
  initialResponse: SearchResponse;
  initialCity: string;
}

export default function CityHealthContainer(props: Props) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  useEffect(() => {
    setError(undefined);
    if (city.trim().length > 0) {
      const controller = new AbortController();
      const delayDebounceFn = setTimeout(() => {
        startTransition(async () => {
          try {
            const res = await fetchDataProvider<CitySuggestion[]>(
              `monitoring/citta/sites/autocomplete?query=${city}&page_size=23`,
              controller.signal
            );

            setSuggestions(res);
          } catch (err) {
            console.log(err);
            setError(getErrorMessage(err));
          }
        });
      }, 500);

      return () => {
        clearTimeout(delayDebounceFn);
        controller.abort();
      };
    }
  }, [city]);

  return (
    <div className="bg-white">
      <CityHealthWidget
        autocompletePanel={
          isPending || suggestions.length > 0 || error ? (
            <>
              <div className="absolute z-10 bg-white border mt-2 w-full">
                {isPending && (
                  <div className="p-2 text-sm text-gray-500">
                    Caricamento...
                  </div>
                )}
                {!isPending && suggestions.length > 0 && (
                  <ul>
                    {suggestions.map((item) => (
                      <li
                        key={item.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setCity(item.name);
                          setSuggestions([]);
                        }}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
                {!isPending && suggestions.length === 0 && !error && (
                  <div className="p-2 text-sm text-gray-500">
                    Nessun risultato trovato
                  </div>
                )}
                {error && (
                  <div className="p-2 text-sm text-red-500">{error}</div>
                )}
              </div>
            </>
          ) : undefined
        }
        city={props.initialCity}
        onChange={(val) => {
          setCity(val);
        }}
        searchResponse={props.initialResponse}
        value={city}
      />
    </div>
  );
}
