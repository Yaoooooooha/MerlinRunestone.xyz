import PreLoader from "@/src/layout/PreLoader";
import "@/styles/globals.css";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import niceSelect from "react-nice-select";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  okxWallet,
  coinbaseWallet,
  bitgetWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { merlinChain, merlinChainTestnet } from "@/src/config/chains";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    setTimeout(() => {
      niceSelect();
    }, 500);
  });

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
  }, []);

  const [connectors, setConnectors] = useState(null);

  // 用來決定顯示那些 Wallet (需要放在 useEffect 裡面，因為要在瀏覽器的環境上才能夠確定用戶有沒有安裝特定的錢包)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 預設有支援的錢包
      let wallets = [
        metaMaskWallet,
        coinbaseWallet,
        okxWallet,
        bitgetWallet,
        injectedWallet,
      ];

      let installedWallets = [];
      if (window.ethereum) {
        // 檢查是否支援 Metamask
        if (window.ethereum.isMetaMask) installedWallets.push(metaMaskWallet);
        // 檢查是否支援 Coinbase Wallet 和 OKX Wallet
        if (typeof window.coinbaseWallet !== "undefined")
          installedWallets.push(coinbaseWallet);
        if (typeof window.okxwallet !== "undefined")
          installedWallets.push(okxWallet);
      }

      const walletGroups = [];

      if (installedWallets.length > 0) {
        walletGroups.push({
          groupName: "Installed",
          wallets: installedWallets,
        });
      }

      walletGroups.push({
        groupName: "Populor",
        wallets: wallets,
      });

      const connectorConfig = connectorsForWallets(walletGroups, {
        appName: "MerlinERA",
        projectId: "dbe4b41c2ff694a2c782c8f9efc5347f",
      });

      setConnectors(connectorConfig);
    }
  }, []);

  const config = getDefaultConfig({
    appName: "MerlinERA",
    projectId: "dbe4b41c2ff694a2c782c8f9efc5347f",
    chains: [merlinChain, merlinChainTestnet],
    connectors,
    ssr: true, // If your dApp uses server side rendering (SSR)
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <Fragment>
            <Head>
              <meta charSet="utf-8" />
              <meta name="description" content />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
              {/* Title */}
              <title>Merlin RUNESTONE</title>
              {/* Favicon Icon */}
              <link
                rel="shortcut icon"
                href="assets/images/favicon.png"
                type="image/x-icon"
              />
              {/* Google Fonts */}
              <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
              />
              {/* Flaticon */}
              <link rel="stylesheet" href="assets/css/flaticon.min.css" />
              {/* Font Awesome */}

              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
              />
              <link
                rel="stylesheet"
                href="assets/css/fontawesome-5.14.0.min.css"
              />
              {/* Bootstrap */}
              <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
              {/* Magnific Popup */}
              <link rel="stylesheet" href="assets/css/magnific-popup.min.css" />
              {/* Nice Select */}
              <link rel="stylesheet" href="assets/css/nice-select.min.css" />
              {/* Animate */}
              <link rel="stylesheet" href="assets/css/animate.min.css" />
              {/* Slick */}
              <link rel="stylesheet" href="assets/css/slick.min.css" />
              {/* 星空 */}
              <link rel="stylesheet" href="assets/css/ParticlesComponent.css" />
              {/* Main Style */}
              <link rel="stylesheet" href="assets/css/style.css" />
              {/* 星空背景 */}
              {/* <script src="http://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script> */}
              <script src="https://threejs.org/examples/js/libs/stats.min.js"></script>
            </Head>
            {!loaded && <PreLoader />}
            {loaded && <Component {...pageProps} />}
          </Fragment>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
