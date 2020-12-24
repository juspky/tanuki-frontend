import dynamic from "next/dynamic";
import YeelightCard from "../components/devices/YeelightCard";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Layout from "./layout";

export const Audio = () => {
  const AudioView = dynamic(() => import("../components/AudioView"), {
    ssr: false,
  });

  return (
    <Layout>
      <AudioView />
    </Layout>
  );
};

export default Audio;
