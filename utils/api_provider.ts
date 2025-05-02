import { HTTPValidationError } from "@/models/errors";

export async function fetchDataProvider<T = unknown>(
  path: string,
  signal?: AbortSignal
): Promise<T> {
  try {
    const res = await fetch(
      `https://xl6720lqti.execute-api.eu-central-1.amazonaws.com/production/v1/${path}`,
      {
        signal,
      }
    );

    if (res.ok) {
      return res.json();
    }

    if (res.status === 404) {
      throw new Error("Not Found");
    }

    if (res.status === 422) {
      const errorBody = await res.json();
      throw new HTTPValidationError(errorBody.detail || []);
    }

    throw new Error("Unexpected server error");
  } catch (error) {
    throw error;
  }
}
