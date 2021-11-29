import styles from 'styles/Home.module.css'
import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import { UAParser } from 'ua-parser-js'
import { getDatabaseConnection } from 'lib/getDatabaseConnection'
import { Post } from 'src/entity/Post'
const qs = require('querystring')

type Props = {
  posts: Post[];
  count: number;
  perPage: number;
  page: number;
}
// props 为 getServerSideProps return的返回值
const PostsIndex: NextPage<Props> = (props) => {
  const { posts, count, perPage, page } = props
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
        共{count}篇文章：每页{perPage}篇文章：当前第{page}页 
        <Link href={`?page=${page - 1}`}>
          <a>上一页</a>
        </Link>
        |
        <Link href={`?page=${page + 1}`}>
          <a>下一页</a>
        </Link>
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
  const page = parseInt(query.page.toString()) || 1
  const perPage = 2
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
    }
  }
}