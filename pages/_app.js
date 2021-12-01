import '../styles/globals.scss'
import "github-markdown-css"
import Head from 'next/head'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>我的博客</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
