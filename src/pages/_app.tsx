import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { MainNav } from "~/components/MainNav";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <div className="flex">
        <div className="flex-2">
          <MainNav />
        </div>
        <div className="flex-1">
          <Component {...pageProps} />
        </div>
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
