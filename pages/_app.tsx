import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import WalletProvider from "../src/Contexts/WalletProvider";
import SelectedValidatorsProvider from "../src/Contexts/SelectedValidatorsProvider";
import GeneralNetworkDataProvider from "../src/Contexts/GeneralNetworkDataProvider";
import SearchContextProvider from "../src/Contexts/SearchContextProvider";
import NetworkProvider from "../src/Contexts/NetworkProvider";
import theme from "../styles/Theme/theme";
import createEmotionCache from "../src/utils/createEmotionCache";
import Layout from "../src/Components/Layout/Layout";
import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <NetworkProvider>
        <WalletProvider>
          <GeneralNetworkDataProvider>
            <SearchContextProvider>
              <SelectedValidatorsProvider>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </ThemeProvider>
              </SelectedValidatorsProvider>
            </SearchContextProvider>
          </GeneralNetworkDataProvider>
        </WalletProvider>
      </NetworkProvider>
    </CacheProvider>
  );
}
