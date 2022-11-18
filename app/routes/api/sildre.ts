import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getSildreSensorData } from "~/services/sildreSensor.server";

export const loader: LoaderFunction = async () => {
  const sildreSensorData = await getSildreSensorData();

  return json({
    sildreSensorData,
  });
};
