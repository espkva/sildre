const API_URL = "https://www.hvakosterstrommen.no/api/v1/prices/";

export enum PriceZone {
  NO1 = "NO1", // Oslo / Øst-Norge
  NO2 = "NO2", // Kristiansand / Sør-Norge
  NO3 = "NO3", // Trondheim / Midt-Norge
  NO4 = "NO4", // Tromsø / Nord-Norge
  NO5 = "NO5", // Bergen / Vest-Norge
}

export interface PriceZoneData {
  EUR_per_kWh: number;
  EXR: number;
  NOK_per_kWh: number;
  time_end: string;
  time_start: string;
}

export type PriceZoneResponse = Array<PriceZoneData>;

const fetchPriceForZone = async (priceZone = PriceZone.NO1) => {
  const date = new Date();
  const url = `${API_URL}/${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}_${priceZone}.json`;

  const response = await fetch(url);

  const data: PriceZoneResponse = await response.json();

  return data;
};

// TODO cache price for zone

export const getPriceForZone = async (priceZone = PriceZone.NO1) => {
  return fetchPriceForZone(priceZone);
};
