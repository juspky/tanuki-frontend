import Head from "next/head";

export const Layout: React.FC<{ title?: string }> = ({ children, title }) => {
  return (
    <div className="bg-gray-800 text-gray-200 p-8" style={{height: "100vh"}}>
      <div className="container mx-auto">
        <Head>
          <title>Smarthome - {title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
      </div>
    </div>
  );
};

export default Layout;
