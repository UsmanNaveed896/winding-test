// Storyblok
import { storyblokInit, apiPlugin } from "@storyblok/react";

// Shopify
import { StoreProvider } from "components/Shopify/Misc/store-context"

// Styles
import 'styles/Global.scss'

// Initialize Storyblok
storyblokInit({
  accessToken: process.env.NEXT_STORYBLOK_ACCESS_TOKEN,
  apiOptions: {
    region: "us",
  },
  use: [apiPlugin]
});


function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
