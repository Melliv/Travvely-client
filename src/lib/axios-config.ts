import axios from "axios";
import { parseISO } from "date-fns";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "api/",
});

api.interceptors.response.use((rep) => {
  handleDates(rep.data);
  return rep;
});

export default api;

const ISODateFormat =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

const isIsoDateString = (value: unknown): value is string => {
  return typeof value === "string" && ISODateFormat.test(value);
};

const handleDates = (data: unknown) => {
  if (isIsoDateString(data)) return parseISO(data);
  if (data === null || data === undefined || typeof data !== "object")
    return data;

  for (const [key, val] of Object.entries(data)) {
    // @ts-expect-error this is a hack to make the type checker happy
    if (isIsoDateString(val)) data[key] = parseISO(val);
    else if (typeof val === "object") handleDates(val);
  }

  return data;
};
