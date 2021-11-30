import styles from 'styles/Home.module.css'
import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import { UAParser } from 'ua-parser-js'
import { getDatabaseConnection } from 'lib/getDatabaseConnection'
import { Post } from 'src/entity/Post'
import usePage from 'hooks/usePage'
const qs = require('querystring')

type Props = {
  posts: Post[];
  count: number;
  perPage: number;
  page: number;
  totalPage: number;
}
// props 为 getServerSideProps return的返回值
const PostsIndex: NextPage<Props> = (props) => {
  const { posts } = props
  const urlMaker = (page: number) => `?page=${page}`
  const usePager = usePage({ ...props, urlMaker })
  return (
    <div className={styles.container}>
      <h1>文章列表</h1>
      {posts.map((post, index) => (
        <div key={index}>
          <Link href={`/posts/${post.id}`} key={post.id}>
            <a>{post.title}</a>
          </Link>
        </div>
      ))}
      <footer>
        {usePager}
      </footer>
    </div>
  )
}
export default PostsIndex

// 不管是开发环境还是生产环境
// 都是在请求到来之后运行的
// 不像 getStaticProps 只在 build 运行一次
export const getServerSideProps: GetServerSideProps = async (context) => {
  // 获取url参数
  const ua = context.req.headers["user-agent"]
  const index = context.req.url.indexOf("?")
  const search = context.req.url.substring(index + 1)
  const query = qs.parse(search)
  const page = parseInt(query.page?.toString()) || 1
  const perPage = 10
  // 初次进入页面链接数据库
  const connection = await getDatabaseConnection()
  // 找到Post数据库, 取出对应的分页数据
  const [posts, count] = await connection.manager.findAndCount(Post,
    { skip: (page - 1) * perPage, take: perPage })
  const result = new UAParser(ua).getResult()
  return {
    props: {
      browser: result.browser,
      posts: JSON.parse(JSON.stringify(posts)),
      count,
      perPage,
      page,
      totalPage: Math.ceil(count / perPage)
    }
  }
}