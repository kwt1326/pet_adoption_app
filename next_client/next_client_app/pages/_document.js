import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="With Pet Application" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1, user-scalable=0" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}