import styles from 'styles/Home.module.css'
import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import { UAParser } from 'ua-parser-js'
import { getDatabaseConnection } from 'lib/getDatabaseConnection'
import { Post } from 'src/entity/Post'

type Props = {
  posts: Post[]
}
// props 为 getServerSideProps return的返回值
const PostsIndex: NextPage<Props> = (props) => {
  const { posts } = props
  return (
    <div className={styles.container}>
      <h1>文章列表</h1>
      {posts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <a>{post.title}</a>
        </Link>
      ))}
    </div>
  )
}
export default PostsIndex

// 不管是开发环境还是生产环境
// 都是在请求到来之后运行的
// 不像 getStaticProps 只在 build 运行一次
export const getServerSideProps: GetServerSideProps = async (context) => {
  // 初次进入页面链接数据库
  const connection = await getDatabaseConnection()
  // 找到Post数据库
  const posts = await connection.manager.find(Post)
  const ua = context.req.headers["user-agent"]
  const result = new UAParser(ua).getResult()
  return {
    props: {
      browser: result.browser,
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}