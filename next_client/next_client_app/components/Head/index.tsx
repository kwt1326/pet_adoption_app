import Head from "next/head"

const startWith = process.env.NODE_ENV === 'development' ? 'Local ' : '';

const HeadComponent = (props: {
  title: string
}) => (
  <Head>
    <title>{`${startWith}${props.title}`}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
)

export default HeadComponent
