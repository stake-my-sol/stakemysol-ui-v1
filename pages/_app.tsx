import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import WalletProvider from "../Contexts/WalletProvider";
import SelectedValidatorsProvider from "../Contexts/SelectedValidatorsProvider";
import GeneralNetworkDataProvider from "../Contexts/GeneralNetworkDataProvider";
import SearchContextProvider from "../Contexts/SearchContextProvider";
import NetworkProvider from "../Contexts/NetworkProvider";
import theme from "../styles/Theme/theme";
import createEmotionCache from "../Components/createEmotionCache";
import Layout from "../Components/Layout/Layout";
import "../styles/globals.css";
import { SWRConfig } from "swr";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <SWRConfig value={{ refreshInterval: 300000 }}>
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
    </SWRConfig>
  );
}
