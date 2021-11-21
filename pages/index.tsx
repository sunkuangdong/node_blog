import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import png from "../public/1.png"
import { GetServerSideProps, NextPage } from 'next'

import { UAParser } from 'ua-parser-js'
import { useEffect, useState } from 'react'
import { createConnection, getConnection } from 'typeorm'
import { getDatabaseConnection } from 'lib/getDatabaseConnection'

type Props = {
  browser: {
    name: string
  }
}
const Home: NextPage<Props> = (props) => {
  const { browser } = props
  const [width, setWidth] = useState(0)
  useEffect(() => {
    setWidth(document.documentElement.clientWidth)
  }, [])
  return (
    <div className={styles.container}>
      {/* <main className={styles.main}>
        <h1 className={styles.title}>
          第一篇文章
          <Link href="/posts/first-posts"><a >点击这里</a></Link>
        </h1>
        <img src={png.src} alt="Logo" />
        <Image src={png} alt="Logo" width={300} height={300}/>
      </main> */}
      <h1>你的浏览器是 {browser.name} </h1>
      <h1>你的浏览器窗口大小 {width} </h1>
    </div>
  )
}
export default Home

// 不管是开发环境还是生产环境
// 都是在请求到来之后运行的
// 不像 getStaticProps 只在 build 运行一次
export const getServerSideProps: GetServerSideProps = async (context) => {
  // 初次进入页面获取
  await getDatabaseConnection()
  const ua = context.req.headers["user-agent"]
  const result = new UAParser(ua).getResult()
  return {
    props: {
      browser: result.browser
    }
  }
}