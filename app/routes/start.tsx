import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  getPriceForZone,
  PriceZone,
} from "../services/hvakosterstrommen.server";
import { Timer } from "../components/Timer";
import styles from "../styles/start.css";
import React, { useEffect, useState } from "react";
import { Message } from "../components/Message";
import { WudderDrop } from "../components/WudderDrop";
import {
  ErrorMessageBox,
  InfoMessageBox,
  SuccessMessageBox,
  WarningMessageBox,
} from "@fremtind/jkl-message-box-react";
import { useTimer } from "../common/useTimer";
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export async function loader() {
  const prices = await getPriceForZone(PriceZone.NO1);

  const currentPrice =
    prices.find((price) => {
      const timeStart = new Date(price.time_start).getTime();
      const timeEnd = new Date(price.time_end).getTime();

      return timeStart < Date.now() && timeEnd > Date.now();
    })?.NOK_per_kWh ?? 0;

  const data: LoaderData = {
    price: currentPrice,
  };

  return json(data);
}

interface LoaderData {
  price: number;
}

interface TextSchema {
  liters: number;
  Text: React.FC;
  color: string;
  scale: number;
}

const textSchema: TextSchema[] = [
  {
    liters: 60,
    Text: () => {
      return (
        <InfoMessageBox>
          Klarer du å dusje raskere enn Pappa Trond?{" "}
          <b>3 minutter og 48 sekunder.</b>
        </InfoMessageBox>
      );
    },
    color: "D9DDFF",
    scale: 0.5,
  },
  {
    liters: 100,
    Text: () => {
      return (
        <SuccessMessageBox>
          Du har nå brukt like mye vann som en <b>normal dusj</b>.
        </SuccessMessageBox>
      );
    },
    color: "C8ECD2",
    scale: 0.75,
  },
  {
    liters: 300,
    Text: () => {
      return (
        <WarningMessageBox>
          Du har nå brukt like mye vann som en <b>bilvask</b>.
        </WarningMessageBox>
      );
    },
    color: "FDEAB9",
    scale: 0.9,
  },
  {
    liters: 1000,
    Text: () => {
      return (
        <ErrorMessageBox>
          Du har nå brukt like mye vann som en <b>danske bruker på 3 dager</b>.
        </ErrorMessageBox>
      );
    },
    color: "FFC9B2",
    scale: 1,
  },
  {
    liters: 1000000,
    Text: () => {
      return <ErrorMessageBox>Nå gir du deg, hilsen pappa.</ErrorMessageBox>;
    },
    color: "FFC9B2",
    scale: 1,
  },
];

export default function Start() {
  const data = useLoaderData<LoaderData>();
  const [temp, setTemp] = useState(0);
  const [waterUsage, setWaterUsage] = useState(0);

  useEffect(() => {
    const sse = new EventSource(
      "https://api.particle.io/v1/devices/events?access_token=27e26d630a97ef80cb4e6a51b0d4763c0e90b20f"
    );

    sse.addEventListener("millis", (e) => {
      const data = JSON.parse(e.data);
      setWaterUsage(Number(data.data / 1000) * 150);
    });

    sse.addEventListener("temp", (e) => {
      const data = JSON.parse(e.data);
      setTemp(data.data);
    });

    sse.onerror = () => {
      sse.close();
    };

    return () => {
      sse.close();
    };
  }, []);

  const currentTextSchema = textSchema.find((s) => waterUsage < s.liters);

  return (
    <>
      <header>
        <Timer active />
        <ul className="sensordata-list">
          <li className="sensordata-list__item">
            {waterUsage.toFixed(1)} liter
          </li>
          <li className="sensordata-list__item">
            {(data.price * 0.035 * waterUsage).toFixed(2)} kr
          </li>
          <li className="sensordata-list__item">{Number(temp).toFixed(1)}°</li>
        </ul>
        {currentTextSchema && (
          <WudderDrop
            progress={(waterUsage / currentTextSchema.liters) * 100}
            color={currentTextSchema.color}
            scale={currentTextSchema.scale}
          />
        )}
      </header>
      {currentTextSchema && (
        <AnimateSharedLayout>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={currentTextSchema.liters}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 100 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3 }}
            >
              <currentTextSchema.Text />
            </motion.div>
          </AnimatePresence>
        </AnimateSharedLayout>
      )}
    </>
  );
}
