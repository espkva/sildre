import { prisma } from "./prisma.server";

const API_URL =
  "https://api.particle.io/v1/devices/e00fce68965f45a9404eba14/read";
const ACCESS_TOKEN = "6a411869906ef345656a0f019cd7e5aebdee3292";

export interface ParticleError {
  ok: false;
  error: string;
}

export interface SildreSensorData {
  id: string;
  name: string;
  connected: boolean;
  return_value: number;
}

interface SensorResponse {
  data: SildreSensorData;
}

type ParticleSensorResponse = SensorResponse | ParticleError;

const isError = (
  response: ParticleSensorResponse
): response is ParticleError => {
  return (response as ParticleError).ok === false;
};

const fetchSensorData = async () => {
  const url = new URL(API_URL);
  url.searchParams.append("arg", "foobar");
  url.searchParams.append("access_token", ACCESS_TOKEN);

  const response = await fetch(url.toString(), {
    method: "POST",
  });

  const data: ParticleSensorResponse = await response.json();

  if (isError(data)) {
    throw new Response(data.error, { status: 500 });
  }

  return data;
};

export const saveSildreSensorData = async (user: number) => {
  const { data } = await fetchSensorData();

  prisma.sildreSensorData.create({
    data: {
      flowrate: 0,
      temperature: data.return_value,
      UserId: user,
    },
  });
};

export const getSildreSensorData = async () => {
  return (await fetchSensorData()).data;
};
