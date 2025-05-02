"use client";
import { SearchResponse } from "@/models/SearchResponse";
import { fetchDataProvider } from "@/utils/api_provider";
import { CityHealthWidget } from "city-health";
import { useEffect, useState, useTransition } from "react";

interface Props {
  initialResponse: SearchResponse;
  initialCity: string;
}

export default function CityHealthContainer(props: Props) {
  const [city, setCity] = useState("");
  // const [suggestions, setSuggestions] = useState();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (city.trim().length > 0) {
      const controller = new AbortController();
      const delayDebounceFn = setTimeout(() => {
        startTransition(async () => {
          try {
            const res = await fetchDataProvider(
              "monitoring/citta/sites/autocomplete?query=brescia&page_size=23",
              controller.signal
            );

            console.log(res);
          } catch (err) {
            console.error(err);
          }
        });
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [city]);

  console.log("ciao");

  return (
    <div className="bg-white">
      <CityHealthWidget
        autocompletePanel={
          isPending ? <div className="absolute">Loading...</div> : <></>
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
