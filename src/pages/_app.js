import { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import "tailwindcss/tailwind.css";
import { Sidebar } from "../components/sidebar";
import "../mirage";

export default function App(props) {
  let [ready, set] = useState(false);

  useEffect(() => {
    set(true);
  }, []);

  return (
    ready && (
      <SWRConfig
        value={{
          fetcher: (url) => fetch(url).then((res) => res.json()),
        }}
      >
        <AppInner {...props} />
      </SWRConfig>
    )
  );
}

function AppInner({ Component, pageProps }) {
  return (
    <div className="flex h-screen antialiased text-zinc-100 bg-zinc-800">
      <Sidebar />
      <div className="flex w-full bg-zinc-900">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
