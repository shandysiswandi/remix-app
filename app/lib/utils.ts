import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * A utility function to create a JSON Response with a default `Content-Type` of `application/json`.
 * @param data The data to be stringified.
 * @param init Optional response init settings (e.g., status, headers).
 */
export function json<Data>(data: Data, init?: number | ResponseInit): Response {
  const responseInit: ResponseInit = typeof init === "number" ? { status: init } : { ...init };

  const headers = new Headers(responseInit.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  responseInit.headers = headers;

  return new Response(JSON.stringify(data), responseInit);
}
