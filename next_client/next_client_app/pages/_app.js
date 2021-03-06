import { ApolloProvider } from "@apollo/client";
import client from '../apollo/client';
import "../styles/globals.scss";
import "../styles/normalize.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp;
