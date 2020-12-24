import useWebSocket, { ReadyState } from "react-use-websocket";
import _ from "lodash";
import React from "react";
import { Bar } from "react-chartjs-2";

export const AudioView = ({}) => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WS_URL}`
  );

  let res: number[] | undefined = lastMessage && JSON.parse(lastMessage.data);
  res =
    res &&
    res
      .map((n, i) => {
        if (i % 4 !== 0) return null;
        return (n + res[i + 1] + res[i + 2] + res[i + 3]) / 4;
      })
      .filter((n) => n !== null)
      .map((n, i) => {
        if (i % 2 !== 0) return null;
        return (n + res[i + 1]) / 2;
      })
      .filter((n) => n !== null);

  const data = res && {
    labels: res.map((r: any, i) => "" + i),
    datasets: [
      {
        label: "Magnitude",
        data: res.map((r: any) => r && r),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",

        borderWidth: 1,
      },
    ],
  };

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
