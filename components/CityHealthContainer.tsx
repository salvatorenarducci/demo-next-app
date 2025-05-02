"use client";
import { SearchResponse } from "@/models/SearchResponse";
import { fetchDataProvider } from "@/utils/api_provider";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const CityHealthWidget = dynamic(
  () => import("city-health").then((mod) => mod.CityHealthWidget),
  {
    ssr: false,
  }
);

interface Props {
  initialResponse: SearchResponse;
  initialCity: string;
}

export default function CityHealthContainer(props: Props) {
  const [city, setCity] = useState(props.initialCity);
  const [results, setResults] = useState<SearchResponse>(props.initialResponse);
  const [loading, setLoading] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetchDataProvider<SearchResponse>(
          "monitoring/citta/sites/249/clc_layer/49121/49120/kpi"
        );

        setResults(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [city]);

  return (
    <div className="bg-white">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <CityHealthWidget
          autocompletePanel={<></>}
          city={city}
          onChange={(val) => {
            setCity(val);
          }}
          searchResponse={results}
          value=""
        />
      )}
    </div>
  );
}
