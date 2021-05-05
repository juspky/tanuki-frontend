import useWebSocket, { ReadyState } from "react-use-websocket";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { WebsocketData } from "../types/WebsocketData";

export const AudioView = ({}) => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WS_URL}`
  );

  const [data, setData] = useState<any>();

  useEffect(() => {
    const wsData: WebsocketData | undefined =
      lastMessage && JSON.parse(lastMessage.data);
    if (
      !wsData ||
      wsData.command !== "audio_in_frequencies" ||
      !Array.isArray(wsData.data)
    )
      return;

    const frequencies: number[] = wsData.data;
    const averagedFrequencies: number[] = frequencies
      .map((n, i, arr) => {
        if (i % 4 !== 0) return null;
        return (n + arr[i + 1] + arr[i + 2] + arr[i + 3]) / 4;
      })
      .filter((n) => n !== null);

    setData({
      labels: averagedFrequencies.map((f, i) => "" + i),
      datasets: [
        {
          label: "DB",
          data: averagedFrequencies,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",

          borderWidth: 1,
        },
      ],
    });
  }, [lastMessage]);

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
      ],
    },
  };

  return (
    <div
      style={{
        width: "400px",
        height: "300px",
      }}
    >
      {readyState === ReadyState.CONNECTING && <div>Connecting</div>}
      {readyState === ReadyState.OPEN && (
        <div>
          Connected
          {data && <Bar data={data} options={options} />}
        </div>
      )}
    </div>
  );
};

export default AudioView;
