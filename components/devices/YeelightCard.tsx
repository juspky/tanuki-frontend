import React, { ChangeEvent, FC, useCallback, useState } from "react";
import { hexToRgb, RGBToHex } from "../../utils/color";
import Card from "../Card";
import _ from "lodash";

type Yeelight = {
  id: string;
  name?: string;
  type: string;
  power: boolean;
  connected: boolean;
  music: boolean;
  brightness: number;
  rgbR: number;
  rgbG: number;
  rgbB: number;
  hsbH: number;
  hsbS: number;
  hsbB: number;
  createdAt: Date;
  updatedAt: Date;
};

const YeelightCard: FC<{ yeelight: Yeelight }> = ({ yeelight }) => {
  const [yeelightState, setYeelightState] = useState(yeelight);

  const sendRGB = useCallback(
    _.debounce((r, g, b) => {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/devices/yeelight/${yeelightState.id}/rgb?r=${r}&g=${g}&b=${b}`
      );
    }, 250),
    [yeelightState.id]
  );

  const handleChangeRGB = async (e: ChangeEvent<HTMLInputElement>) => {
    const [r, g, b] = hexToRgb(e.target.value);
    setYeelightState({ ...yeelightState, rgbR: r, rgbG: g, rgbB: b });
    sendRGB(r, g, b);
  };

  const handleTogglePower = async () => {
    const newPower = !yeelightState.power;
    setYeelightState({ ...yeelightState, power: newPower });
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/devices/yeelight/${yeelightState.id}/power?state=${newPower}`
    );
  };

  const handleToggleMusicMode = async () => {
    const newMusic = !yeelightState.music;
    setYeelightState({ ...yeelightState, music: newMusic });
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/devices/yeelight/${yeelightState.id}/musicMode?state=${newMusic}`
    );
  };

  return (
    <Card className="flex h-32">
      <div className="flex items-center border-r pr-3 mr-6 opacity-25">
        <i className={`ri-lightbulb-flash-line ri-6x`} />
      </div>
      <div className="flex flex-col py-3">
        <h3 className="opacity-25">Yeelight</h3>
        <div className="flex flex-col">
          <h3 className="text-3xl">{yeelightState.name || "Unnamed"}</h3>
        </div>
      </div>
      <div className="flex flex-grow justify-end items-center">
        <div className="overflow-hidden rounded-xl h-24 w-24 border-2 relative border-gray-600 mr-4">
          <div className="cursor-pointer absolute -left-1 -right-1 -top-1 -bottom-1">
            <input
              type="color"
              className="cursor-pointer w-full h-full"
              onChange={handleChangeRGB}
              //value={RGBToHex(
              //  yeelightState.rgbR,
              //  yeelightState.rgbG,
              //  yeelightState.rgbB
              //)}
            />
          </div>
        </div>
        <i
          onClick={handleToggleMusicMode}
          className={`ri-music-line ri-6x cursor-pointer power-glow ${
            yeelightState.music ? " active" : "opacity-30"
          }`}
        />
        <i
          onClick={handleTogglePower}
          className={`ri-shut-down-line ri-6x cursor-pointer power-glow ${
            yeelightState.power ? " active" : "opacity-30"
          }`}
        />
      </div>
    </Card>
  );
};

export default YeelightCard;
