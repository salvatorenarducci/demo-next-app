import { SearchResponse } from "@/models/SearchResponse";
import { fetchDataProvider } from "@/utils/api_provider";

export async function getCityHealthData(): Promise<SearchResponse> {
  const res = await fetchDataProvider<SearchResponse>(
    "monitoring/citta/sites/249/clc_layer/49121/49120/kpi"
  );
  return res;
}
