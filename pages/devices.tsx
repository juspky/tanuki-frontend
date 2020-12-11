import YeelightCard from "../components/devices/YeelightCard";
import Layout from "./layout";

export const Devices = ({ devices }) => {
  return (
    <Layout>
      <div className="flex flex-col">
        <h2 className="text-4xl mb-4">Wohnzimmer</h2>
        <div className="flex flex-col space-y-4">
          {devices.yeelights.map((y) => (
            <YeelightCard key={y.id} yeelight={y} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

Devices.getInitialProps = async (ctx) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/devices`);
  const json = await res.json();
  return { devices: json };
};

export default Devices;
