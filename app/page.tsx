import CityHealthContainer from "@/components/CityHealthContainer";
import { getCityHealthData } from "@/hook/search";
import { HTTPValidationError } from "@/models/errors";
import "city-health/dist/esm/index.css";
import { notFound } from "next/navigation";

export default async function Home() {
  try {
    const results = await getCityHealthData();

    return (
      <div className="bg-white h-screen px-16">
        <CityHealthContainer initialCity="Milano" initialResponse={results} />
      </div>
    );
  } catch (error) {
    if (error instanceof HTTPValidationError) {
      return (
        <div className="bg-red-100 text-red-800 p-4 m-4 rounded">
          Errore di validazione: {error.message}
        </div>
      );
    }

    if (error instanceof Error && error.message === "Not Found") {
      notFound();
    }

    return (
      <div className="bg-red-100 text-primaryRed p-4 m-4 rounded">
        Errore imprevisto:{" "}
        {error instanceof Error ? error.message : "Errore sconosciuto"}
      </div>
    );
  }
}
